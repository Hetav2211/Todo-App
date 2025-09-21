import { MdCheckCircle } from "react-icons/md";

function AddTodo() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full">
          <MdCheckCircle className="text-3xl text-white" />
        </div>
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                     bg-clip-text text-transparent"
        >
          TodoMaster
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Organize your life, one task at a time
      </p>
    </div>
  );
}
export default AddTodo;
