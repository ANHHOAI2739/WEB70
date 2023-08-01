import express from "express";
import { Router } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
