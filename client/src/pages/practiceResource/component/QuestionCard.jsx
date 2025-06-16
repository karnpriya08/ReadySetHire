import React, { useState } from 'react';

const QuestionCard = ({ question, index }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  // handle accordian 
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <>
    {/* card for question */}
      <main  key={index} className='bg-white rounded border border-lime-300 p-3 shadow w-full'>

        <button className='bg-cyan-400 text-left w-full font-medium text-lg'
          onClick={()=>handleToggle(index)}> {question.question}
        </button>
        
        {openIndex === index && (
          <div className='mt-2 text-cyan-800 p-2 rounded-md shadow' >
            {question.answer}
          </div>
        )}
      </main>
    </>
  )
}

export default QuestionCard;