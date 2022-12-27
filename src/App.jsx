import { useState, useEffect } from 'react'
import Question from "./components/Question"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'

export default function App() {

  const [started, setStarted] = useState(false)
  const [triviaData, setTriviaData] = useState([])

  // Starts the quiz
  function startQuiz() {
    setStarted(true)
  }

  useEffect(function() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setTriviaData(data.results))
  }, [])

  const questionElements = triviaData.map(data => {
    return (
      <Question 
        key={nanoid()}
        question={decode(data.question)} 
        answer={decode(data.correct_answer)} 
        incorrect={decode(data.incorrect_answers)}
      />
    )
  })

  return (

    <main className="main">
      {!started ?
        <div className="home">
          <h2 className="home--title">Quizzical</h2>
          <h4 className="home--description">A true test of knowledge.</h4>
          <button className="home--button" onClick={startQuiz}>Start quiz</button>
        </div> :
        <div className="quiz">
          {questionElements}
          <div>
            <h4 className="quiz--score">You scored ___ correct answers</h4>
            <button className="quiz--button">Play again</button>
          </div>
        </div>
      }
    </main>
  )
}
