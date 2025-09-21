import React, { useState, useEffect } from "react";
import {
  MdDelete,
  MdCalendarToday,
  MdCheckCircle,
  MdRadioButtonUnchecked,
} from "react-icons/md";

const Task = ({
  id,
  todoname,
  tododate,
  completed,
  onDeleteClick,
  onCompleteClick,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed || false);
  const [isHovered, setIsHovered] = useState(false);

  // Update local state when completed prop changes
  useEffect(() => {
    setIsCompleted(completed || false);
  }, [completed]);

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const dueDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const toggleComplete = async () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);

    if (onCompleteClick) {
      try {
        await onCompleteClick(id, newCompletedState);
      } catch (error) {
        // Revert the state if the API call fails
        setIsCompleted(isCompleted);
        console.error("Failed to update completion status:", error);
      }
    }
  };

  const overdue = isOverdue(tododate);

  return (
    <div
      className={`group bg-white rounded-xl shadow-sm border border-gray-200 
                 hover:shadow-md transition-all duration-200 hover:border-gray-300
                 ${isCompleted ? "opacity-75 bg-gray-50" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={toggleComplete}
          className={`flex-shrink-0 transition-colors duration-200 text-xl
                     ${
                       isCompleted
                         ? "text-green-500"
                         : "text-gray-400 hover:text-green-500"
                     }`}
        >
          {isCompleted ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-gray-900 break-words
                         ${isCompleted ? "line-through text-gray-500" : ""}`}
          >
            {todoname}
          </h3>

          {tododate && (
            <div
              className={`flex items-center gap-1 mt-1 text-sm
                           ${
                             overdue && !isCompleted
                               ? "text-red-500"
                               : "text-gray-500"
                           }`}
            >
              <MdCalendarToday className="text-xs" />
              <span className={overdue && !isCompleted ? "font-medium" : ""}>
                {formatDate(tododate)}
                {overdue && !isCompleted && " (Overdue)"}
              </span>
            </div>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDeleteClick(id)}
          className={`flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-500 
                     hover:bg-red-50 transition-all duration-200
                     ${
                       isHovered
                         ? "opacity-100"
                         : "opacity-0 group-hover:opacity-100"
                     }`}
        >
          <MdDelete className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Task;
