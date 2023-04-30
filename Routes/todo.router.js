const express = require("express");
const { TodoModel } = require("../models/todo.model");
const todoRouter = express.Router();

//Creating New Todo
todoRouter.post("/create", async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();
    res.status(200).json({ msg: "New Todo Added Successfully" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//getting All Todo
todoRouter.get("/getall", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).send(todos);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//get only the login users todo

todoRouter.get("/", async (req, res) => {
  const name = req.body.userName;
  try {
    const todos = await TodoModel.find({ userName: name });
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

// Patch Or Update The todos

todoRouter.patch("/edite/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await TodoModel.findOne({ _id: id });
  try {
    if (todo.userId == req.body.userId) {
      await TodoModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ msg: "Status Updated Successfully" });
    } else {
      res.status(400).send({ err: "Sorry Its Not yours Todo" });
    }
  } catch (err) {
    res.status(40).send({ err: err.message });
  }
});


//delete todo 

todoRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    const todo = await TodoModel.findOne({_id:id})
    try{
        if(todo.userId == req.body.userId){
            await TodoModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Todo Deleted Successfully"})
        }else{
            res.status(400).json({"err":"You Can't Delete This Todo"})
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

module.exports = {
  todoRouter,
};
