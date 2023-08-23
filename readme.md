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