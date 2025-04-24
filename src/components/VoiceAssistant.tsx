import { useState, useCallback } from "react";
import { useConversation } from "@11labs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
// component
import { getSignedUrl } from "../lib/get-signed-url";
import { useUI } from "../context/UIContext";
import { UIAction } from "../types";
import { ResponseBanner } from "./ResponseBanner"; // Import ResponseBanner

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    console.error("Microphone permission denied");
    return false;
  }
}

export function VoiceAssistant() {
  const { controlUI } = useUI();
  const [response, setResponse] = useState("");
  const [speak, setSpeak] = useState(false);

  const conversation = useConversation({
    onMessage: ({ message }: { message: any }) => {
      if (message.type === "client_tool_call" && message.name === "controlUI") {
        const component = message.parameters?.component;
        const action = message.parameters?.action;

        if (component && action) {
          controlUI({ component, action } as UIAction);
        }
      }

      if (message) {
        setResponse(message);
      }
    },
    onConnect: () => {
      console.log("Connected");
      setSpeak(true);
    },
    onDisconnect: () => {
      console.log("Disconnected");
      setSpeak(false);
    },
    onError: () => {
      console.error("Conversation error:");
      alert("An error occurred during the conversation.");
    },
  });

  // Toggle conversation state
  const toggleStartConversation = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      alert("No permission");
      return;
    }

    const signedUrl = await getSignedUrl();
    await conversation.startSession({
      signedUrl,
      clientTools: {
        controlUI: async ({ component, action }) => {
          if (component === "componentSchedule" && action === "open") {
            controlUI({ component, action } as UIAction);
          } else if (component === "componentSchedule" && action === "close") {
            controlUI({ component, action } as UIAction);
          } else if (
            component === "componentRequirement" &&
            action === "open"
          ) {
            controlUI({ component, action } as UIAction);
          } else if (
            component === "componentRequirement" &&
            action === "close"
          ) {
            controlUI({ component, action } as UIAction);
          }
        },
      },
    });
  };

  const toggleEndConversation = useCallback(async () => {
    await conversation.endSession();
    setSpeak(false);
  }, [conversation]);

  const triggerConversation = (speak: boolean) => {
    if (speak) {
      toggleStartConversation()
        .then(() => setSpeak(true))
        .catch((error) => {
          console.error("Error starting conversation:", error);
          setSpeak(false);
        });
    } else {
      toggleEndConversation()
        .then(() => setSpeak(false))
        .catch((error) => {
          console.error("Error ending conversation:", error);
          setSpeak(true);
        });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ResponseBanner response={response} />
      <div className="fixed bottom-16 right-6 z-30 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!speak ? (
            <motion.button
              key="loading"
              onClick={() => triggerConversation(true)}
              className="z-30 items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white hover:shadow-lg"
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ scale: { repeat: Infinity, duration: 1.5 } }}
              title="Start Conversation"
              aria-label="Start Conversation"
            >
              <Mic className="mx-auto block" size={24} />
            </motion.button>
          ) : (
            <motion.button
              key="mic-off"
              onClick={() => triggerConversation(false)}
              className="z-30 items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white hover:shadow-lg"
              whileTap={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ scale: { repeat: 0, duration: 1.5 } }}
              title="End Conversation"
              aria-label="End Conversation"
            >
              <MicOff className="mx-auto block" size={24} />
            </motion.button>
          )}
        </AnimatePresence>
        <p className="text-gray-300 mt-3">
          {conversation.status === "connected"
            ? "Listening..."
            : "Press to speak"}
        </p>
      </div>
    </div>
  );
}
