import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Boletería API')
  .setDescription(`
    ## API para Sistema de Boletería y Gestión de Eventos
    
    Esta API permite gestionar un sistema completo de boletería que incluye:
    
    ### Funcionalidades principales:
    - 🔐 **Autenticación y autorización** de usuarios
    - 👥 **Gestión de usuarios** y roles
    - 🎫 **Gestión de eventos** y categorías
    - 🎟️ **Emisión y gestión de tickets**
    - 💳 **Procesamiento de transacciones**
    - 📊 **Reporting y analytics**
    
    ### Arquitectura:
    - Construida con **NestJS** y **TypeScript**
    - Base de datos **PostgreSQL** con **PostGIS**
    - Autenticación **JWT**
    - Validación automática de datos
    - Documentación automática con **Swagger/OpenAPI**
    
    ### Uso de la API:
    1. Regístrate o inicia sesión para obtener un token JWT
    2. Incluye el token en el header \`Authorization: Bearer <token>\`
    3. Consulta los endpoints disponibles en cada sección
    
    ### Códigos de respuesta HTTP:
    - **200**: Operación exitosa
    - **201**: Recurso creado exitosamente
    - **400**: Datos de entrada inválidos
    - **401**: No autorizado (token inválido o ausente)
    - **403**: Acceso prohibido (sin permisos)
    - **404**: Recurso no encontrado
    - **409**: Conflicto (recurso ya existe)
    - **500**: Error interno del servidor
  `)
  .setVersion('1.0.0')
  .setContact(
    'Equipo de Desarrollo',
    'https://tu-empresa.com',
    'dev@tu-empresa.com'
  )
  .setLicense(
    'MIT',
    'https://opensource.org/licenses/MIT'
  )
  .addServer('http://localhost:3000', 'Servidor de Desarrollo')
  .addServer('https://api-boleteria.tu-dominio.com', 'Servidor de Producción')
  .addTag('🔐 Autenticación', 'Autenticación y autorización de usuarios')
  .addTag('👤 Usuarios', 'Gestión de usuarios del sistema')
  .addTag('🔐 Roles', 'Gestión de roles y permisos')
  .addTag('🏷️ Gestión de Categorías', 'Gestión de categorías de eventos')
  .addTag('📂 Categorías de Eventos', 'Gestión de categorías de eventos')
  .addTag('🎭 Eventos', 'Gestión de eventos y entidades relacionadas')
  .addTag('🎫 Categorías de Tickets', 'Gestión de categorías de tickets')
  .addTag('🎟️ Tickets', 'Gestión de tickets individuales')
  .addTag('💳 Transacciones', 'Procesamiento y gestión de transacciones')
  .addTag('🎫💳 Solicitudes de Tickets en Transacciones', 'Solicitudes de tickets dentro de transacciones')
  .addTag('👥 Asignación de Roles', 'Asignación de roles a usuarios')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Ingresa tu token JWT obtenido del endpoint de login',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();

// Opciones de personalización para Swagger UI
export const swaggerOptions = {
  customSiteTitle: 'Boletería API - Documentación',
  customfavIcon: '/favicon.ico',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  ],
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 50px 0 }
    .swagger-ui .info .title { color: #3b82f6 }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 15px; border-radius: 8px }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  },
};
