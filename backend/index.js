const  express = require("express")
const app = express();
const {createTodo}=require("./types")
const { updateTodo } = require("./types");
const{todo}=require("./db")
const cors = require("cors");
app.use(cors());

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
    title:createPayload.title,
    description:createPayload.description,
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

app.put("/status1",async function(req,res){
const updatePayload = req.body;

const updateParsedPayload=updateTodo.safeParse(updatePayload);
console.log(updatePayload.id);
if(!updateParsedPayload.success){
    res.status(411).json({
msg:"sent wrong update"
    })
   
try{
  await todo.updateOne(
   {id:updatePayload.id}
  ,{
   $set:{completed:true}
  })
  res.json({
    msg:"todo marked as completed"
  })
}catch(err){
console.log(err)
}
}

})

app.listen(3000,()=>{
    console.log(`app is listening on port 3000`)
})