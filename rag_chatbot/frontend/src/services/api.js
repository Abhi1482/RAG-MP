const API_URL = 'http://127.0.0.1:8000';

/**
 * Sends a message to the backend RAG chatbot.
 * @param {string} message - The user's query.
 * @param {Array} history - The chat history (optional).
 * @returns {Promise<Object>} The API response containing the answer and sources.
 */
export const sendChatMessage = async (message, history = []) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        history: history,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
