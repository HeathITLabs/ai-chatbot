import { Configuration, OpenAIApi } from 'openai';
import redisClient from '../../lib/redis';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'Message and userId are required' });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 150,
    });
    const reply = response.data.choices[0].text;

    try {
      await redisClient.rpush(`user:${userId}:chats`, JSON.stringify({ message, reply }));
    } catch (redisError) {
      return res.status(500).json({ error: 'Error saving chat to Redis', details: redisError.message });
    }

    res.status(200).json({ response: reply });
  } catch (openaiError) {
    res.status(500).json({ error: 'Error generating response from OpenAI', details: openaiError.message });
  }
}