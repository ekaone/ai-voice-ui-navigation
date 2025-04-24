import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UIState, UIAction } from '../types';

// Initial state with all components closed
const initialState: UIState = {
  componentSchedule: false,
  componentRequirement: false,
};

// Reducer to handle UI state changes
function uiReducer(state: UIState, action: UIAction): UIState {
  const { component, action: actionType } = action;
  
  // If opening a component, close all others first
  if (actionType === 'open') {
    // Create a new state with all components closed
    const newState = Object.keys(state).reduce((acc, key) => {
      return { ...acc, [key]: false };
    }, {} as UIState);
    
    // Then open the requested component
    return { ...newState, [component]: true };
  }
  
  // If closing, just close the specified component
  if (actionType === 'close') {
    return { ...state, [component]: false };
  }
  
  return state;
}

// Create context
interface UIContextType {
  state: UIState;
  controlUI: (action: UIAction) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

// Provider component
export function UIProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  
  const controlUI = (action: UIAction) => {
    dispatch(action);
  };
  
  return (
    <UIContext.Provider value={{ state, controlUI }}>
      {children}
    </UIContext.Provider>
  );
}

// Custom hook to use the UI context
export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}