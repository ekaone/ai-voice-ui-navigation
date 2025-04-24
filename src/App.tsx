import React from 'react';
import { VoiceAssistant } from './components/VoiceAssistant';
import { ScheduleComponent } from './components/ScheduleComponent';
import { RequirementComponent } from './components/RequirementComponent';
import { UIProvider } from './context/UIContext';
import { AnimatedBackground } from './components/AnimatedBackground';

function App() {
  return (
    <UIProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-4xl px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Voice Assistant Demo
            </h1>
            <p className="text-gray-300 text-lg">
              Ask about the event schedule or requirements
            </p>
          </header>
          
          <div className="relative w-full min-h-[400px] mb-8">
            <ScheduleComponent />
            <RequirementComponent />
          </div>
          
          <VoiceAssistant />
        </div>
      </div>
    </UIProvider>
  );
}

export default App;