import express from "express";
import type { Request, Response} from "express";

const app = express();
const PORT = 8000;

app.get("/apptodos", (req:Request,res:Response)  => {
  return res.send("todos");
})
app.listen(PORT,()=> console.log("server is running"));