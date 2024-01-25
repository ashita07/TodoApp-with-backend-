const  express = require("express")
const app = express();
const {createTodo}=require("../types")
const { updateTodos } = require("../types");


app.use(express.json());
app.post("/addTodo",(req,res)=>{
const createPayload = req.body;
const parsedPayload = createTodo.safeParse(createPayload);

if(!parsedPayload.success){
    res.status(411).json({
        mag:"you send the wrong inputs"
    })
}

})

app.get("/getTodos",(req,res)=>{

})

app.put("/status",function(req,res){
const updatePayload = req.body;
const updateParsedPayload=updateTodos.safeParse(updatePayload);
if(!updateParsedPayload.success){
    res.status(411).send({
msg:"sent wrong update"
    })
}
})