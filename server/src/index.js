import express from "express";
import cors from "cors";
import logsRoutes from "./routes/logsRoute.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", logsRoutes);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
