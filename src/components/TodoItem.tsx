import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TodoItemProps {
  id: string;
  todo: string;
  isCompleted: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  todo,
  isCompleted,
  onEdit,
  onDelete,
  onToggleComplete,
  index
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ 
        scale: 1.01, 
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        borderColor: "rgba(16,185,129,0.3)"
      }}
      className="todo flex items-center justify-between p-4 rounded-xl transition-all duration-300 bg-zinc-800 border border-zinc-700 group"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(id)}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-zinc-600 transition-colors checked:border-emerald-500 checked:bg-emerald-500"
          />
          <svg
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span
          className={`text-base transition-all duration-300 ${
            isCompleted 
              ? 'line-through text-gray-500' 
              : 'text-gray-200'
          }`}
        >
          {todo}
        </span>
      </div>
      <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onEdit(id)}
          className="p-2 rounded-lg transition-colors duration-200 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/30"
          aria-label="Edit todo"
        >
          <Edit2 size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(id)}
          className="p-2 rounded-lg transition-colors duration-200 text-red-400 hover:text-red-300 hover:bg-red-900/30"
          aria-label="Delete todo"
        >
          <Trash2 size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TodoItem;