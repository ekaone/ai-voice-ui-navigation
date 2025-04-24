import { motion } from "framer-motion";

interface ResponseBannerProps {
  response: string | null;
}

export function ResponseBanner({ response }: ResponseBannerProps) {
  return (
    <motion.div
      className="w-full bg-white/10 backdrop-blur-md p-5 mb-6 text-center absolute top-0"
      animate={{ opacity: response ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-white text-lg">
        {response || (
          <>
            Try saying: <span className="font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-rose-400 bg-clip-text text-transparent">"Show me the event schedule"</span> or <span className="font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">"What are the requirements?"</span>
          </>
        )}
      </p>
    </motion.div>
  );
}
