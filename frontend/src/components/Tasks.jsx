import React from "react";
import Task from "./Task";

const Tasks = ({ total_tasks, onDeleteClick, onCompleteClick }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {total_tasks.length} {total_tasks.length === 1 ? "task" : "tasks"}
        </div>
      </div>
      <div className="space-y-3">
        {total_tasks.map((item) => (
          <Task
            key={item.id}
            id={item.id}
            tododate={item.dueDate}
            todoname={item.name}
            completed={item.completed}
            onDeleteClick={onDeleteClick}
            onCompleteClick={onCompleteClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
