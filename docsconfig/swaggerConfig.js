
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
                url: "https://gateway-9pxx.onrender.com",
            },
        ],
    },
    apis: ["./routes/*.js"],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
