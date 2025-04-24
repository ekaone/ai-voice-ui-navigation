import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useUI } from '../context/UIContext';

// Sample schedule data
const scheduleData = [
  {
    id: 1,
    title: "Registration & Welcome",
    time: "9:00 AM - 10:00 AM",
    location: "Main Lobby"
  },
  {
    id: 2,
    title: "Keynote Presentation",
    time: "10:15 AM - 11:30 AM",
    location: "Grand Ballroom"
  },
  {
    id: 3,
    title: "Networking Lunch",
    time: "12:00 PM - 1:30 PM",
    location: "Garden Terrace"
  },
  {
    id: 4,
    title: "Workshop Sessions",
    time: "2:00 PM - 4:00 PM",
    location: "Conference Rooms A-D"
  },
  {
    id: 5,
    title: "Closing Remarks & Reception",
    time: "4:30 PM - 6:00 PM",
    location: "Grand Ballroom"
  }
];

export function ScheduleComponent() {
  const { state } = useUI();
  const isVisible = state.componentSchedule;
  
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
          <header className="bg-blue-600 p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-white" size={24} />
              <h2 className="text-xl font-bold">Event Schedule</h2>
            </div>
            <p className="text-blue-100 mt-1">Full agenda for the upcoming event</p>
          </header>
          
          <div className="p-4">
            <div className="space-y-4">
              {scheduleData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <div className="flex items-center text-blue-300 mt-2">
                    <Clock size={16} className="mr-2" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center text-blue-300 mt-1">
                    <MapPin size={16} className="mr-2" />
                    <span>{item.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}