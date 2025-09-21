const express = require("express");
const todoitemsRouter = express.Router();

const todoitemsController = require("../controllers/todoitemsController");

todoitemsRouter.post("/", todoitemsController.createTodoItem);
todoitemsRouter.get("/", todoitemsController.getTodoItems);
todoitemsRouter.delete("/:id", todoitemsController.deleteTodoItem);
todoitemsRouter.put("/:id/completed", todoitemsController.updateTodoItem);



module.exports = todoitemsRouter;
