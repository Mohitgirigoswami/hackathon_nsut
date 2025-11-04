import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
