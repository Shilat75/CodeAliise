// src/components/ChatGPTAnswer/ChatGPTAnswer.jsx
import React, { useState, useEffect } from 'react';
import { chatgptReq } from '../../api';
import Markdown from 'markdown-to-jsx'

const ChatGPTAnswer = ({ questionId }) => {
  const [answer, setAnswer] = useState(['','']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await  chatgptReq(questionId);
        console.log(response.data);
        setAnswer(response.data.answerAi);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching answer from ChatGPT:', error);
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [questionId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="chatgpt-answer">
      <h3>Refined Question</h3>
     
      <Markdown>{answer[0]}</Markdown>
    
      <h3>Answer from ChatGPT:</h3>
      <Markdown>{answer[1]}</Markdown>
    </div>
  );
};

export default ChatGPTAnswer;
