import express from "express";
import notificationRouter from './routes/notification.router.js';
const app = express();
import connectToMongoDB from './database/connection.js';
import { swaggerUi, swaggerDocs } from './docsconfig/swaggerConfig.js';

connectToMongoDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());  

app.use("/", notificationRouter);


app.listen(3004, () => {
  console.log(`Server is running at http://localhost:3004`);
});
export default app;
