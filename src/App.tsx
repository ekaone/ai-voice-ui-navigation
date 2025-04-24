import { VoiceAssistant } from "./components/VoiceAssistant";
import { ScheduleComponent } from "./components/ScheduleComponent";
import { RequirementComponent } from "./components/RequirementComponent";
import { UIProvider } from "./context/UIContext";
import { AnimatedBackground } from "./components/AnimatedBackground";

function App() {
  return (
    <UIProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="z-10 w-full max-w-4xl px-4 py-8">
          <header className="text-center mb-8 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center gap-6">
              <img
                src="/images/boltnew.svg"
                alt="Bolt AI-Voice Assistant Logo"
                className="mb-2"
                style={{
                  height: "64px",
                  width: "auto",
                  filter:
                    "invert(81%) sepia(23%) saturate(324%) hue-rotate(345deg) brightness(93%) contrast(89%)",
                }}
              />

              <img
                src="/images/elevenlabs.svg"
                alt="ElevenLabs Logo"
                className="mb-2"
                style={{
                  height: "64px",
                  width: "auto",
                  filter:
                    "invert(81%) sepia(23%) saturate(324%) hue-rotate(345deg) brightness(93%) contrast(89%)",
                }}
              />
            </div>
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
