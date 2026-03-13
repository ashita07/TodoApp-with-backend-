const express = require("express");
const app = express();

const { createTodo } = require("./types");
const { updateTodo } = require("./types");
const { todo } = require("./db");

const cors = require("cors");

app.use(cors());
app.use(express.json());


// CREATE TODO
app.post("/addTodo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "you sent wrong inputs"
    });
  }

  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  });

  res.json({
    msg: "Todo created"
  });
});


// GET ALL TODOS
app.get("/getTodos", async (req, res) => {
  const todos = await todo.find({});

  res.json({
    todos: todos
  });
});


// UPDATE TODO STATUS
app.put("/status1", async (req, res) => {
  const updatePayload = req.body;

  const updateParsedPayload = updateTodo.safeParse(updatePayload);

  if (!updateParsedPayload.success) {
    return res.status(411).json({
      msg: "sent wrong update"
    });
  }

  try {
    await todo.updateOne(
      { _id: updatePayload.id },
      {
        $set: { completed: true }
      }
    );

    res.json({
      msg: "todo marked as completed"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error"
    });
  }
});


// DELETE TODO
app.delete("/deleteTodo", async (req, res) => {
  const id = req.body.id;

  try {
    const result = await todo.deleteOne({
      _id: id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        msg: "Todo not found"
      });
    }

    res.json({
      msg: "Todo deleted successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error deleting todo"
    });
  }
});


app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
