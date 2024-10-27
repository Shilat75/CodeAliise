import express from 'express';
import Question from '../models/Questions.js';

const router = express.Router();

router.post('/chatgpt/:questionId', async (req, res) => {
  console.log(req.params);
  const { questionId } = req.params;
 
  try {
    
    const question = await Question.findById(questionId);
    if (!question) {
      console.error('Question not found');
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error fetching answer from OpenAI:', error);
    res.status(500).json({ error: 'Error fetching answer from OpenAI', details: error.message });
  }
});

export default router;
