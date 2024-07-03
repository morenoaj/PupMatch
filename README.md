# PupMatch

PupMatch es una aplicación web diseñada para ayudar a los dueños de mascotas a encontrar parejas adecuadas para sus perros. Los usuarios pueden crear perfiles para sus mascotas, agregar fotos y buscar coincidencias con otros perros en la plataforma.

## Funcionalidades

- **Inicio de Sesión y Registro**: Los usuarios pueden registrarse e iniciar sesión utilizando Google.
- **Configuración de Perfil**: Los usuarios pueden configurar el perfil de sus mascotas incluyendo nombre, edad, sexo, tamaño, ubicación y una descripción breve.
- **Carga de Fotos**: Los usuarios pueden agregar y eliminar fotos de sus mascotas.
- **Deslizar para Coincidir**: Los usuarios pueden deslizar entre perfiles de otras mascotas para encontrar coincidencias.
- **Pantalla de Configuración**: Los usuarios pueden ajustar la configuración de su cuenta.

## Tecnologías Utilizadas

- **Frontend**: React, Material-UI, CSS
- **Backend**: Firebase Authentication, Firestore (para almacenamiento de datos), Firebase Storage (para almacenamiento de imágenes)
- **Enrutamiento**: React Router

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/pupmatch.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd pupmatch
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Configura Firebase:
    - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
    - Agrega la configuración de Firebase en un archivo `firebaseConfig.js` en el directorio `src`:
        ```javascript
        import { initializeApp } from 'firebase/app';
        import { getFirestore } from 'firebase/firestore';
        import { getAuth, GoogleAuthProvider } from 'firebase/auth';
        import { getStorage } from 'firebase/storage';

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth(app);
        const googleProvider = new GoogleAuthProvider();
        const storage = getStorage(app);

        export { db, auth, googleProvider, storage };
        ```
5. Inicia la aplicación:
    ```bash
    npm start
    ```


## Contribuciones

No tenemos contribuciones 🤣


