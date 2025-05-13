import express from "express";
import type { Request, Response} from "express";
import { PrismaClient } from "./generated/prisma"; 

const app = express();
const PORT = 8080;

const prisma = new PrismaClient();

app.get("/alltodos", async(req:Request,res:Response)  => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
})
app.listen(PORT,()=> console.log("server is running"));