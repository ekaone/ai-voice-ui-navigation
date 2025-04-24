export interface UIState {
  componentSchedule: boolean;
  componentRequirement: boolean;
}

export type UIAction = {
  component: keyof UIState;
  action: 'open' | 'close';
};

export type ControlUITool = (action: UIAction) => void;

export interface VoiceResponse {
  type: string;
  text?: string;
  name?: string;
  parameters?: {
    component?: keyof UIState;
    action?: 'open' | 'close';
  };
}