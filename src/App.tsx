import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Save, X, Moon, Sun, CheckCircle2 } from "lucide-react";

import Navbar from "./components/Navbar";
import TodoItem from "./components/TodoItem";
import EmptyState from "./components/EmptyState";

interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to dark mode

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Todo[];
    setTodos(storedTodos);
    
    // Always use dark mode for black aesthetic
    document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    
    // Always keep dark mode for black aesthetic
    document.documentElement.classList.add("dark");
  };

  const saveToLs = (updatedTodos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEdit = (id: string) => {
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setEditId(id);
    }
  };

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    let updatedTodos;
    if (editId) {
      updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      setEditId(null);
    } else {
      updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    }

    setTodos(updatedTodos);
    setTodo("");
    saveToLs(updatedTodos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id: string) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  const handleCancel = () => {
    setTodo("");
    setEditId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const filteredTodos = todos.filter((item) => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.isCompleted).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden backdrop-blur-sm bg-zinc-900/90 border border-zinc-800 shadow-[0_0_25px_rgba(0,0,0,0.3)]"
        >
          <div className="p-6 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white relative overflow-hidden border-b border-zinc-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(64,64,64,0.1),transparent_70%)]"></div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl font-bold mb-2 flex items-center"
            >
              <CheckCircle2 className="mr-2 text-emerald-500" size={28} />
              TaskFlow
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-400"
            >
              Organize your tasks with style
            </motion.p>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={todo}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none bg-zinc-800 border-zinc-700 text-white placeholder-gray-500"
                  />
                  {editId && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCancel}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                    className="px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    {editId ? (
                      <>
                        <Save size={18} />
                        Update
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Add Task
                      </>
                    )}
                  </motion.button>
                  {editId && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="px-6 py-3 font-medium rounded-lg transition-colors duration-200 sm:hidden bg-zinc-700 hover:bg-zinc-600 text-gray-200"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-between items-center mb-6"
              >
                <div className="text-sm text-gray-400">
                  {activeTodosCount} {activeTodosCount === 1 ? 'task' : 'tasks'} remaining
                </div>
                <div className="flex rounded-lg p-1 bg-zinc-800 border border-zinc-700">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 text-sm rounded-md transition-all duration-300 ${
                      filter === "all"
                        ? "bg-zinc-700 text-emerald-400 shadow-sm" 
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter("active")}
                    className={`px-3 py-1 text-sm rounded-md transition-all duration-300 ${
                      filter === "active"
                        ? "bg-zinc-700 text-emerald-400 shadow-sm" 
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Active
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter("completed")}
                    className={`px-3 py-1 text-sm rounded-md transition-all duration-300 ${
                      filter === "completed"
                        ? "bg-zinc-700 text-emerald-400 shadow-sm" 
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Completed
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <AnimatePresence mode="wait">
                {filteredTodos.length === 0 ? (
                  <EmptyState />
                ) : (
                  filteredTodos.map((item, index) => (
                    <TodoItem
                      key={item.id}
                      id={item.id}
                      todo={item.todo}
                      isCompleted={item.isCompleted}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleComplete={handleCheckbox}
                      index={index}
                    />
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>TaskFlow &copy; {new Date().getFullYear()} - Your productivity companion</p>
      </footer>
    </div>
  );
}

export default App;