import React, { useEffect, useState } from "react";
import { useConversation } from "@11labs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader } from "lucide-react";
// component
import { getSignedUrl } from "../lib/get-signed-url";
import { useUI } from "../context/UIContext";
import { UIAction, VoiceResponse } from "../types";

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
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
    onError: () => {
      console.error("Conversation error:");
      alert("An error occurred during the conversation.");
    },
  });

  // Toggle recording state
  const toggleRecording = async () => {
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

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-full bg-white/10 backdrop-blur-md rounded-xl p-5 mb-6 text-center"
        animate={{ opacity: response ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white text-lg">
          {response ||
            'Try saying: "Show me the event schedule" or "What are the requirements?"'}
        </p>
      </motion.div>

      <motion.button
        onClick={toggleRecording}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full ${
          conversation.status === "connected" ? "bg-red-500" : "bg-blue-500"
        } text-white hover:shadow-lg`}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: conversation.status === "connected" ? [1, 1.1, 1] : 1,
        }}
        transition={{
          scale: {
            repeat: conversation.status === "connected" ? Infinity : 0,
            duration: 1.5,
          },
        }}
      >
        <AnimatePresence mode="wait">
          {conversation.status === "connected" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Mic size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="mic-off"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <MicOff size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-gray-300 mt-3">
        {conversation.status === "connected"
          ? "Listening..."
          : "Press to speak"}
      </p>
    </div>
  );
}
