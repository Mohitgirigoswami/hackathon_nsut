import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";
import cors from "cors";
import { db } from "@/db";
import { villageRouter, beneficiariesRouter, driveRouter, vaccineRouter } from "@/routes";

const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

// Routes
app.use('/api/villages', villageRouter);
app.use('/api/beneficiaries', beneficiariesRouter);
app.use('/api/drives', driveRouter);
app.use('/api/vaccine', vaccineRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
