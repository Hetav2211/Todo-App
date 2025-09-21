const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const { task, Date } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const todoItem = new TodoItem({ task, Date });
    const savedItem = await todoItem.save();
    console.log("Item saved successfully:", savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating todo item:", error);
    res
      .status(500)
      .json({ error: "Failed to create todo item", details: error.message });
  }
};

exports.getTodoItems = async (req, res, next) => {
  const todoItems = await TodoItem.find();
  res.json(todoItems);
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log("Attempting to delete todo item with ID:", id);
    const deletedItem = await TodoItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    console.log("Todo item deleted successfully:", deletedItem);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo item:", error);
    res
      .status(500)
      .json({ error: "Failed to delete todo item", details: error.message });
  }
};

exports.updateTodoItem = async (req, res, next) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updatedItem = await TodoItem.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating todo item:", error);
    res
      .status(500)
      .json({ error: "Failed to update todo item", details: error.message });
  }
};
