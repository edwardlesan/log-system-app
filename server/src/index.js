import express from "express";
import cors from "cors";
import logsRoutes from "./routes/logsRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN 
    : 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", logsRoutes);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
