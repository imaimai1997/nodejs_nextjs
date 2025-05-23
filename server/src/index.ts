import express from "express";
import type { Request, Response} from "express";
import { PrismaClient } from "./generated/prisma"; 
import cors from "cors";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());
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
    return res.status(400).json(e);
}
});

app.put("/edittodo/:id", async(req:Request,res:Response)  => {
  try{
  const id = Number(req.params.id);
  const {title, isCompleted} = req.body;
  const editTodo = await prisma.todo.update({
    where:{id},
    data:{
      title,
      isCompleted,
    },
  });
  return res.json(editTodo);
} catch (e){
  return res.status(400).json(e);
}
});

app.delete("/deletetodo/:id", async(req:Request,res:Response)  => {
  try{
  const id = Number(req.params.id);
  const deleteTodo = await prisma.todo.delete({
    where:{id},
    
  });
  return res.json(deleteTodo);
} catch (e){
  return res.status(400).json(e);
}
});


app.listen(PORT,()=> console.log("server is running"));