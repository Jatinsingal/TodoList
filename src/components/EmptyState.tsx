import React from 'react';
import { ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="p-6 rounded-full mb-4 bg-zinc-800 border border-zinc-700 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
      >
        <ClipboardList className="h-12 w-12 text-emerald-500" />
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl font-semibold mb-2 text-gray-200"
      >
        No tasks yet
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-sm text-gray-400"
      >
        Add your first task using the form above and start being productive today!
      </motion.p>
    </motion.div>
  );
};

export default EmptyState;