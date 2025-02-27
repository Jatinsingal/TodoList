import React from 'react';
import { CheckCircle2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <nav className="border-b border-zinc-800 bg-black relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_70%)]"></div>
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center"
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-emerald-500"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="ml-3 text-2xl font-bold text-white"
            >
              TaskFlow
            </motion.span>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="px-3 py-2 text-sm font-medium text-white hover:text-emerald-400 transition-colors duration-300 relative group"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="px-3 py-2 text-sm font-medium text-white hover:text-emerald-400 transition-colors duration-300 relative group"
              >
                Projects
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                className="px-3 py-2 text-sm font-medium text-white hover:text-emerald-400 transition-colors duration-300 relative group"
              >
                Calendar
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            </div>
          </div>
          
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.1)]"
            >
              JS
            </motion.div>
            
            <div className="md:hidden ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden mt-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 backdrop-blur-sm shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)]"
            >
              <motion.a
                variants={itemVariants}
                href="#"
                className="block px-4 py-3 text-white hover:bg-zinc-800 transition-colors border-l-2 border-transparent hover:border-emerald-500"
              >
                Dashboard
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="#"
                className="block px-4 py-3 text-white hover:bg-zinc-800 transition-colors border-l-2 border-transparent hover:border-emerald-500"
              >
                Projects
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="#"
                className="block px-4 py-3 text-white hover:bg-zinc-800 transition-colors border-l-2 border-transparent hover:border-emerald-500"
              >
                Calendar
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;