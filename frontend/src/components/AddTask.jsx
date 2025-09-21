import { useState, useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";

function AddTask({ onNewItem }) {
  const todoNameEle = useRef();
  const dueDateEle = useRef();

  const handleAddButtonClicked = (event) => {
    event.preventDefault();
    const todoName = todoNameEle.current.value;
    const dueDate = dueDateEle.current.value;

    if (!todoName.trim()) {
      alert("Please enter a task name");
      return;
    }

    todoNameEle.current.value = "";
    dueDateEle.current.value = "";
    onNewItem(todoName, dueDate);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg">
      <form
        onSubmit={handleAddButtonClicked}
        className="flex flex-col sm:flex-row gap-4 items-end"
      >
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-white mb-2">
            Task Name
          </label>
          <input
            type="text"
            ref={todoNameEle}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 rounded-xl border-0 bg-white/90 backdrop-blur-sm 
                     placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 
                     focus:ring-white/50 focus:bg-white transition-all duration-200
                     shadow-inner text-base"
          />
        </div>
        <div className="sm:w-48">
          <label className="block text-sm font-medium text-white mb-2">
            Due Date
          </label>
          <input
            type="date"
            ref={dueDateEle}
            className="w-full px-4 py-3 rounded-xl border-0 bg-white/90 backdrop-blur-sm 
                     text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 
                     focus:bg-white transition-all duration-200 shadow-inner"
          />
        </div>
        <button
          type="submit"
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl 
                   transition-all duration-200 hover:scale-105 active:scale-95
                   backdrop-blur-sm border border-white/20 hover:border-white/40
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <IoIosAddCircle className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
export default AddTask;
