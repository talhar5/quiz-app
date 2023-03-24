import React from 'react'
import FlashCard from './FlashCard.js';
export default function FlashcardsList({ questions }) {
  let sophisticatedQuestions = questions.results.map((item, index) => {
    return {
      id: index + Date.now(),
      question: item.question,
      options: shuffle([...item.incorrect_answers, item.correct_answer]),
      answer: item.correct_answer
    }
  });

  function shuffle(arr) {
    let array = [...arr];
    let i = array.length;
    while (--i) {
      let temp = Math.floor(Math.random() * (i + 1));
      [array[temp], array[i]] = [array[i], array[temp]];
    }
    return array;
  }

  return (
    <div className='flashCard-grid'>
      {sophisticatedQuestions.map((question) => {
        return <FlashCard key={question.id} question={question} />
      })}
    </div>
  )
}
