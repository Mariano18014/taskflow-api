import swaggerJSDoc from "swagger-jsdoc";
import "dotenv/config";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TaskFlow API",
            version: "1.0.0",
            description: "API documentation for TaskFlow project",
        },
        servers: [
        {
            url: `http://localhost:${process.env.PORT}/api`,
        },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;