import express from "express";
import routes from "./routes";
import { startWorker } from "./worker";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", routes);

startWorker();

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});