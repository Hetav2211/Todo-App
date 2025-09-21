import AddTodo from "./components/AddTodo";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import "./App.css";
import { useEffect, useState } from "react";
import Welcomemsg from "./components/Welcomemsg";
import {
  addItemToServer,
  getItemsFromServer,
  deleteItemFromServer,
  markItemAsCompleted,
} from "./services/itemsService";
function App() {
  const [total_tasks, setTotalTasks] = useState([]);

  useEffect(() => {
    getItemsFromServer()
      .then((fetchedItems) => setTotalTasks(fetchedItems))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItemFromServer(itemId);
      const newTodoItems = total_tasks.filter((item) => item.id !== itemId);
      setTotalTasks(newTodoItems);
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const handleNewItem = async (itemName, itemDueDate) => {
    try {
      const serverItem = await addItemToServer(itemName, itemDueDate);
      const newTodoItems = [...total_tasks, serverItem];
      setTotalTasks(newTodoItems);
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const handleCompleteItem = async (itemId, completed) => {
    try {
      await markItemAsCompleted(itemId, completed);
      const updatedTasks = total_tasks.map((task) =>
        task.id === itemId ? { ...task, completed } : task
      );
      setTotalTasks(updatedTasks);
      console.log("Item completion status updated successfully");
    } catch (error) {
      console.error("Failed to update item completion:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <AddTodo />
          <div className="mt-8">
            <AddTask onNewItem={handleNewItem} />
          </div>
          <div className="mt-8">
            {total_tasks.length === 0 && <Welcomemsg />}
            <Tasks
              total_tasks={total_tasks}
              onDeleteClick={handleDeleteItem}
              onCompleteClick={handleCompleteItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
