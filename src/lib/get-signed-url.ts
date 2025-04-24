import { ElevenLabsClient } from "elevenlabs";

export async function getSignedUrl() {
  const client = new ElevenLabsClient({
    apiKey: import.meta.env.VITE_ELEVEN_LABS_API_KEY,
  });
  const response = await client.conversationalAi.getSignedUrl({
    agent_id: import.meta.env.VITE_ELEVEN_LABS_AGENT_ID,
  });
  return response.signed_url;
}
