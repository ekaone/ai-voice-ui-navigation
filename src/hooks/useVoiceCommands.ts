import { useCallback } from 'react';
import { UIAction } from '../types';

interface UseVoiceCommandsProps {
  controlUI: (action: UIAction) => void;
}

export function useVoiceCommands({ controlUI }: UseVoiceCommandsProps) {
  const processCommand = useCallback((command: string): string => {
    // Convert to lowercase for case-insensitive matching
    const normalizedCommand = command.toLowerCase();
    
    // Schedule commands
    const scheduleCommands = [
      'show me the event schedule',
      'what\'s coming up',
      'tell me when it starts',
      'i want to check the schedule',
      'schedule'
    ];
    
    // Requirements commands
    const requirementCommands = [
      'what are the requirements',
      'what do i need to attend',
      'any rules or dress code',
      'show me the event requirements',
      'requirements'
    ];
    
    // Check for schedule commands
    if (scheduleCommands.some(cmd => normalizedCommand.includes(cmd))) {
      // First close any open components
      controlUI({
        component: 'componentRequirement',
        action: 'close'
      });
      
      // Then open the schedule component
      controlUI({
        component: 'componentSchedule',
        action: 'open'
      });
      
      return "Here's the event schedule.";
    }
    
    // Check for requirement commands
    if (requirementCommands.some(cmd => normalizedCommand.includes(cmd))) {
      // First close any open components
      controlUI({
        component: 'componentSchedule',
        action: 'close'
      });
      
      // Then open the requirements component
      controlUI({
        component: 'componentRequirement',
        action: 'open'
      });
      
      return "Here are the event requirements.";
    }
    
    // If no command matched
    return "I'm not sure what you're asking for. You can ask about the event schedule or requirements.";
  }, [controlUI]);
  
  return { processCommand };
}