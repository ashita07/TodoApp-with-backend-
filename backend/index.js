const  express = require("express")
const app = express();
const {createTodo}=require("./types")
const { updateTodos } = require("./types");
const{todo}=require("./db")

app.use(express.json());
app.post("/addTodo",async (req,res)=>{
const createPayload = req.body;
const parsedPayload = createTodo.safeParse(createPayload);

if(!parsedPayload.success){
    res.status(411).json({
        mag:"you send the wrong inputs"
    })
}

await todo.create({
    title:parsedPayload.title,
    description:parsedPayload.description,
    completed: false
})
res.json({
    msg:"Todo created"
})
})

app.get("/getTodos",async (req,res)=>{
 const todos = await todo.find({})
 res.json({
    todos:todos
 })
})

app.put("/status",async function(req,res){
const updatePayload = req.body;
const updateParsedPayload=updateTodos.safeParse(updatePayload);
if(!updateParsedPayload.success){
    res.status(411).send({
msg:"sent wrong update"
    })

  await todo.update({
    _id:req.body.id
  },{
    completed:true
  })
  res.json({
    mdg:"todo marked as completed"
  })
}
})