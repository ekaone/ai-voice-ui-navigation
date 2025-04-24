import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, AlertCircle, Shirt } from 'lucide-react';
import { useUI } from '../context/UIContext';

// Sample requirements data
const requirementsData = [
  {
    id: 1,
    title: "Registration Confirmation",
    description: "Bring your event confirmation email or QR code for quick check-in",
    icon: Info,
    category: "essential"
  },
  {
    id: 2,
    title: "Photo ID",
    description: "Valid government-issued photo identification is required for all attendees",
    icon: AlertCircle,
    category: "essential"
  },
  {
    id: 3,
    title: "Dress Code",
    description: "Business casual attire is recommended for all sessions and events",
    icon: Shirt,
    category: "recommended"
  },
  {
    id: 4,
    title: "Devices",
    description: "Laptops or tablets for interactive workshops (fully charged)",
    icon: Info,
    category: "recommended"
  },
  {
    id: 5,
    title: "Business Cards",
    description: "Bring business cards for networking opportunities",
    icon: Check,
    category: "optional"
  }
];

export function RequirementComponent() {
  const { state } = useUI();
  const isVisible = state.componentRequirement;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential': return 'text-red-400';
      case 'recommended': return 'text-yellow-400';
      case 'optional': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute top-0 left-0 w-full bg-white/10 backdrop-blur-md text-white rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <header className="bg-purple-600 p-4">
            <div className="flex items-center space-x-2">
              <Info className="text-white" size={24} />
              <h2 className="text-xl font-bold">Event Requirements</h2>
            </div>
            <p className="text-purple-100 mt-1">What you need to bring to the event</p>
          </header>
          
          <div className="p-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {requirementsData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <IconComponent className={getCategoryColor(item.category)} size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-300 mt-1">{item.description}</p>
                        <div className={`text-sm mt-2 font-medium ${getCategoryColor(item.category)}`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}