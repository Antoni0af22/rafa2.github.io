import { onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { auth, db } from "./init.js";
const provider = new firebase.auth.GoogleAuthProvider();


// Función para iniciar sesión

provider.setCustomParameters({ prompt: "select_account" });
      /* Recibe una función que se invoca cada que hay un cambio en la
       * autenticación y recibe el modelo con las características del usuario.*/
      auth.onAuthStateChanged(
        /** Recibe las características del usuario o null si no ha iniciado
         * sesión. */
        usuarioAuth => {
          if (usuarioAuth && usuarioAuth.email) {
            // Usuario aceptado.
            // @ts-ignore Muestra el email registrado en Google.
            email.value = usuarioAuth.email;
            // @ts-ignore Muestra el nombre registrado en Google.
            nombre.value = usuarioAuth.displayName;
            // @ts-ignore Muestra el avatar registrado en Google.
            avatar.src = usuarioAuth.photoURL;
          } else {
            // No ha iniciado sesión. Pide datos para iniciar sesión.
            auth.signInWithRedirect(provider);
          }
        }
      );

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
    

// Función para mostrar el formulario de agregar modelo
function showAddModelForm() {
    document.getElementById('modelsList').style.display = 'none';
    document.getElementById('addModelForm').style.display = 'block';
}
