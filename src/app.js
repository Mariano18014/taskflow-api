import express from "express";
import cors from "cors";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./router/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(notFound);
app.use(errorHandler);
app.use("/api", routes);

export default app;