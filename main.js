import { onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { auth, db } from "./init.js";

// Función para iniciar sesión
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById('#signup-email').value;
    const password = document.getElementById('#signup-password').value;

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential)
    }catch(error){
        console.log(error)
    }
});


// Variable para referencia a la colección de modelos
 const modelsCollection = firebase.firestore().collection('models');

 // Función para mostrar la lista de modelos después del inicio de sesión
 function showModelsList() {
     document.getElementById('loginForm').style.display = 'none';
     document.getElementById('modelsList').style.display = 'block';

     // Obtener y mostrar modelos desde Firestore
     modelsCollection.get().then((querySnapshot) => {
         document.getElementById('modelsTable').innerHTML = '<tr><th>Nombre del Modelo</th><th>Marca</th><th>Año</th><th>Precio</th><th>Fecha de Lanzamiento</th></tr>';
         querySnapshot.forEach((doc) => {
             const model = doc.data();
             const row = `<tr><td>${model.modelName}</td><td>${model.brand}</td><td>${model.year}</td><td>${model.price}</td><td>${model.releaseDate}</td></tr>`;
             document.getElementById('modelsTable').innerHTML += row;
         });
     });
 }

 // Función para agregar un nuevo modelo
 function addModel() {
     const modelName = document.getElementById('modelName').value;
     const brand = document.getElementById('brand').value;
     const year = parseInt(document.getElementById('year').value);
     const price = parseFloat(document.getElementById('price').value);
     const releaseDate = document.getElementById('releaseDate').value;

// Validación simple
if (!modelName || !brand || isNaN(year) || isNaN(price) || !releaseDate) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
}

// Agregar el modelo a Firestore
modelsCollection.add({
    modelName: modelName,
    brand: brand,
    year: year,
    price: price,
    releaseDate: releaseDate
}).then(() => {
    showModelsList(); // Mostrar la lista actualizada después de agregar un modelo
}).catch((error) => {
    alert("Error al agregar el modelo: " + error.message);
});
}


    

// Función para mostrar el formulario de agregar modelo
function showAddModelForm() {
    document.getElementById('modelsList').style.display = 'none';
    document.getElementById('addModelForm').style.display = 'block';
}
