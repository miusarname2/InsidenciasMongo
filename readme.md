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

La aplicación utiliza diferentes versiones de la API para agrupar las funciones específicas de cada rol. Las versiones se manejan a través de los headers de las solicitudes, utilizando el header "Accept-Version" con los siguientes valores: "1.0.0", "2.0.0" y "3.0.0", correspondientes a las versiones v1, v2 y v3 respectivamente.

Asegúrate de incluir el header "Accept-Version" con el valor adecuado en las solicitudes para acceder a las funcionalidades específicas de cada versión.

- **Camper API:** `/camper`
- **Trainer API:** `/trainer`
- **Admin API:** `/admin`


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

