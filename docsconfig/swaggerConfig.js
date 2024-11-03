// swaggerConfig.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Notification API",
            version: "1.0.0",
            description: "API for Notification",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"], // Adjust path if needed
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
