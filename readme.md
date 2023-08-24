# Sistema de Gestión de Incidencias - Documentación

El Sistema de Gestión de Incidencias es una aplicación que permite registrar y gestionar informes de incidencias relacionadas con hardware y software. Proporciona una API para interactuar con las funciones principales, incluida la autenticación, la creación de informes y el acceso a los informes existentes.

## Características

- **Autenticación basada en tokens:** Se utiliza JSON Web Tokens (JWT) para autenticar usuarios y permitir el acceso seguro a las rutas protegidas.

- **Limitación de solicitudes:** Se ha implementado un mecanismo de límite de solicitudes para prevenir el abuso del sistema y mantener la integridad del servicio.

- **Endpoints para Camper y Trainer:** Se han establecido rutas específicas para Camper y Trainer, cada uno con diferentes acciones y permisos.

- **Gestión de informes:** Los usuarios pueden reportar incidencias, y los informes se almacenan en una base de datos MongoDB siguiendo esquemas definidos.

## Instalación

1. Clona el repositorio a tu sistema local: `git clone <URL_DEL_REPOSITORIO>`
2. Navega al directorio raíz del proyecto: `cd <NOMBRE_DEL_DIRECTORIO>`
3. Instala las dependencias: `npm install`

## Obtener Tokens de Acceso

Antes de realizar cualquier solicitud a las rutas protegidas, necesitas obtener un token de acceso válido. Sigue estos pasos:

1. Utiliza el endpoint `/crear` con un método **POST** y proporciona el rol adecuado en el cuerpo de la solicitud (`admin`, `camper` o `trainer`).
2. El servidor generará un token JWT válido con una duración de 1 hora.
3. Utiliza este token en la cabecera de autorización de tus solicitudes futuras.

## Acceso a las Rutas Protegidas

Una vez que tengas un token de acceso, puedes acceder a las rutas protegidas de la API. Asegúrate de incluir el token en la cabecera de autorización de la siguiente manera:

```
Authorization: Bearer <TU_TOKEN>
```

### Rutas para Camper

- **Reportar Incidencia:** Envía una solicitud POST a `/reportar` con los detalles de la incidencia en el cuerpo de la solicitud.

### Rutas para Trainer

- **Reportar Incidencia:** Envía una solicitud GET a `/reportar` para acceder a los informes de incidencias reportadas por los Trainers.

- **Crear Trainer:** Envía una solicitud POST a `/crear` con los detalles del nuevo Trainer en el cuerpo de la solicitud.

### Rutas para Admin

- **Obtener Todos los Informes:** Envía una solicitud GET a `/reportsAll` para acceder a todos los informes de incidencias almacenados.

## Cuerpo de las Consultas

### Crear Informe de Incidencia (Camper)

```json
{
  "categoria": "leve",
  "tipo_De_Insidencia": "Hardware",
  "fechaReporte": "2023-08-23T10:00:00Z",
  "Area": "corvus",
  "Lugar": "Sala 101",
  "reportante": "nombre_del_reportante"
}
```

### Crear Informe de Incidencia (Trainer)

```json
{
  "categoria": "moderada",
  "tipo_De_Insidencia": "Software",
  "fechaReporte": "2023-08-23T12:00:00Z",
  "Area": "endor",
  "Lugar": "Oficina 202",
  "reportante": "nombre_del_reportante"
}
```

### Crear Nuevo Trainer

```json
{
  "nombre": "Nombre del Trainer",
  "emailPersonal": "correo_personal@example.com",
  "emailCorporativo": "correo_corporativo@example.com",
  "TelefonoMovil": 123456789,
  "TelefonoResidencia": 987654321,
  "TelefonoEmpresa": 555555555,
  "TelefonoMovilEmpresa": 999999999
}
```

## Versiones de API

La aplicación utiliza diferentes versiones de la API para agrupar las funciones específicas de cada rol. Asegúrate de incluir la versión adecuada en las URL de las solicitudes.

- **Camper API:** `/v1/campers`
- **Trainer API:** `/v1/trainers`
- **Admin API:** `/v1/admin`

## Notas Finales

Esta documentación proporciona una visión general de las características clave y el uso de la aplicación de Gestión de Incidencias. Asegúrate de revisar el código fuente y las rutas específicas para obtener una comprensión más profunda de las funcionalidades implementadas.

Por supuesto, aquí tienes un README actualizado que enfatiza la instalación, cómo solicitar tokens y cómo realizar consultas en tu aplicación utilizando el archivo `.env` que proporcionaste:

---

## Guía de Uso - Sistema de Reportes de Incidencias

Este es un sistema de reportes de incidencias que utiliza autenticación y autorización basadas en roles mediante JSON Web Tokens (JWT). Los usuarios pueden acceder a rutas específicas según sus roles: "admin", "camper" y "trainer". Aquí, te proporcionamos una guía completa para configurar y utilizar el sistema.

## Instalación

1. Clona este repositorio a tu máquina local.

```bash
git clone <URL_DEL_REPOSITORIO>
cd nombre-del-repositorio
```

2. Instala las dependencias necesarias utilizando npm.

```bash
npm install
```

3. Crea y modifica el archivo `.env` en la raíz del proyecto con la siguiente información:

```plaintext
ATLAS_STRCONNECT="mongodb+srv://<USUARIO>:<CONTRASEÑA>@cluster0.xvxpcpw.mongodb.net/insidencias-pruebas"
JWT_SECRET="<TU_CLAVE_SECRETA>"
```

Asegúrate de reemplazar `<USUARIO>`, `<CONTRASEÑA>` y `<TU_CLAVE_SECRETA>` con la información adecuada.

## Uso

1. Inicia el servidor:

```bash
npm run dev
```

2. **Obteniendo un Token**

   Antes de realizar cualquier consulta, debes obtener un token válido. Utiliza la ruta `/token` para generar un token.

   ```http
   POST http://localhost:3000/token

   Body:
   {
     "role": "admin"
   }
   ```

   Cambia el valor de `"role"` según el rol que quieras utilizar ("admin", "camper" o "trainer"). El token será proporcionado en la respuesta.

3. **Consultas a las Rutas Protegidas**

   Utiliza los tokens obtenidos para acceder a las rutas protegidas correspondientes a cada rol:

   - **Admin:**

     ```http
     GET http://localhost:3000/admin/reportsAll
     ```

   - **Camper:**

     ```http
     GET http://localhost:3000/camper/reportar
     ```

   - **Trainer:**

     ```http
     GET http://localhost:3000/trainer/reportar
     POST http://localhost:3000/trainer/crear
     ```

4. **Realizando un Reporte**

   Para realizar un reporte de incidencia, realiza una solicitud POST a la ruta correspondiente:

   ```http
   POST http://localhost:3000/trainer/reportar

   Body:
   {
     "categoria": "leve",
     "tipo_De_Insidencia": "Hardware",
     "fechaReporte": "2023-08-23T12:00:00Z",
     "Area": "corvus",
     "Lugar": "Oficina 101",
     "reportante": "NombreDelReportante"
   }
   ```

   Asegúrate de ajustar los valores en el cuerpo de la solicitud según tus necesidades.


# **Version Divertida & Explicita**

# ⚙️ Sistema de Gestión de Incidencias - Documentación 🛠️

El Sistema de Gestión de Incidencias es como un superhéroe para tus problemas técnicos. ¡Aprende a usarlo como un profesional!

![Incidencias](url_de_la_imagen)

## 🚀 Características

- **Autenticación a prueba de balas:** Utiliza tokens mágicos (JSON Web Tokens) para entrar al mundo de la resolución de incidencias.
- **¡Detén el abuso!:** Controla el tráfico con un escudo anti-spam para que todos sean felices.
- **Rutas para todos:** Camper, Trainer o Admin, hay algo para cada héroe.
- **Gestiona, reporta, conquista:** Registra tus proezas y desafíos para dominar el reino de las incidencias.

## 🛠️ Instalación

1. 📥 Clona este repo: `git clone <URL_DEL_REPOSITORIO>`
2. 🚀 Navega hasta el directorio: `cd <NOMBRE_DEL_DIRECTORIO>`
3. 🧙‍♂️ Lanza un hechizo: `npm install`

## 🎟️ Obtener Tokens de Acceso

¡Consigue tu pase mágico antes de aventurarte!

1. ✨ Dirígete al sendero `/crear` con un hechizo **POST**, proporciona tu rol (`admin`, `camper` o `trainer`).
2. 🔮 ¡Un token mágico aparecerá! Validez de 1 hora.
3. 🗝️ Lleva este token contigo en la cabecera `Authorization`.

## ⚔️ Acceso a las Rutas Protegidas

Con tu token mágico en mano, ¡explora los reinos protegidos!

1. 🧙‍♂️ Añade el token en la cabecera:
```
Authorization: Bearer <TU_TOKEN>
```

### Rutas para Camper 🏕️

- **Reporta tu hazaña:** Envía un mensaje en una botella con un hechizo **POST** a `/reportar`.

### Rutas para Trainer 🏋️‍♀️

- **Reporta tu hazaña:** Usa el hechizo **GET** en `/reportar` para ver los informes.

- **Crea nuevos héroes:** Con un hechizo **POST** en `/crear`, invoca a un nuevo Trainer.

### Rutas para Admin 🧙

- **¡Ver todos los informes!** Con un hechizo **GET** en `/reportsAll`, observa todos los informes almacenados.

## ✉️ Cuerpo de las Consultas

### Crea tu Reporte Épico (Camper) 📋

```json
{
  "categoria": "leve",
  "tipo_De_Insidencia": "Hardware",
  "fechaReporte": "2023-08-23T10:00:00Z",
  "Area": "corvus",
  "Lugar": "Sala 101",
  "reportante": "nombre_del_reportante"
}
```

### Crea tu Reporte Épico (Trainer) 🏋️‍♀️

```json
{
  "categoria": "moderada",
  "tipo_De_Insidencia": "Software",
  "fechaReporte": "2023-08-23T12:00:00Z",
  "Area": "endor",
  "Lugar": "Oficina 202",
  "reportante": "nombre_del_reportante"
}
```

### Crea un Nuevo Héroe/Trainer 🌟

```json
{
  "nombre": "Nombre del Trainer",
  "emailPersonal": "correo_personal@example.com",
  "emailCorporativo": "correo_corporativo@example.com",
  "TelefonoMovil": 123456789,
  "TelefonoResidencia": 987654321,
  "TelefonoEmpresa": 555555555,
  "TelefonoMovilEmpresa": 999999999
}

```

## 🗺️ Versiones de API

La aplicación tiene diferentes versiones de API, como niveles en un juego. Usa el encantamiento "Accept-Version" en tus headers con estos valores: "1.0.0", "2.0.0" y "3.0.0" para las versiones v1, v2 y v3.

Usa el header "Accept-Version" en tus solicitudes para abrir la puerta a diferentes funciones:

- **Camper API:** `/camper`
- **Trainer API:** `/trainer`
- **Admin API:** `/admin`

## 🧙‍♂️ Notas Finales

¡Este libro de hechizos te ha proporcionado un mapa para dominar la Gestión de Incidencias! ¡No dudes en explorar más a fondo y convertirte en el maestro de las incidencias!
