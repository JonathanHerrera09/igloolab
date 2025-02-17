# igloolab - appIgloolab

Prueba tecnica

Este proyecto es una aplicación móvil desarrollada en React Native que permite a los usuarios gestionar productos, iniciar sesión y registrarse. Incluye un backend en Node.js y una base de datos en mysql

# Requisitos - appIgloolab

Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (v21 o superior)

npm

expo

React Native CLI

# Instalación - appIgloolab

    cd / appIgloolab
    npm install

# Ejecución - appIgloolab

Asegúrate de ejecutar

    cd / appIgloolab

    npx expo start -c

# Observaciones - appIgloolab

Si usted usa la aplicacion en dispositivo externo debe de abrir un tunel
para que le funcione la peticion al back en mi caso use ngrok

comando ngrok: ngrok http 3000

cambiar lo por la url que le de respuesta

# igloolab - backend

Este proyecto es un back en React Native Node.js con TypeScript y express que permite a los usuarios gestionar productos, iniciar sesión y registrarse,

# Requisitos - backend

Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (21 o superior)

npm

# Ejecución - backend

Asegúrate de ejecutar

cd / backend

npx ts-node src/app.ts o npm run dev

# Observaciones - backend

Debe de tener la base de datos creada en su defecto la subire en el git
las tablas se crearan a la hora de ejecutar el programa

ademas crear un archivo .env JWT_SECRET=clave_super_secreta

# igloolab - frontend

Este proyecto es un frontend en React TypeScript que permite a los usuarios gestionar productos, iniciar sesión y registrarse, maneja estados de forma Context API

# Requisitos - frontend

Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (21 o superior)

npm

# Ejecución - frontend

Asegúrate de ejecutar

cd / frontend

npm start

# Observaciones - frontend

Recuerde que puede generar su propio usuario
