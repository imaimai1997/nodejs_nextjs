import express from "express";
import type { Request, Response} from "express";
import { PrismaClient } from "./generated/prisma"; 

const app = express();
const PORT = 8080;
app.use(express.json());
const prisma = new PrismaClient();

app.get("/alltodos", async(req:Request,res:Response)  => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
})

app.post("/createtodo", async(req:Request,res:Response)  => {
  try{
  const {title, isCompleted} = req.body;
  const createTodo = await prisma.todo.create({
    data:{
      title,
      isCompleted,
    },
  });
  return res.json(createTodo);
} catch (e){
  return e;
}
});
app.listen(PORT,()=> console.log("server is running"));