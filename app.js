import express from "express";
import notificationRouter from './routes/notification.router.js';
const app = express();
import connectToMongoDB from './database/connection.js';
connectToMongoDB();
app.use(express.json());
// Set default route for '/'

app.use("/", notificationRouter);


app.listen(3004, () => {
  console.log(`Server is running at http://localhost:3004`);
});

// Export the app instance
export default app;
