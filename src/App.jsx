import { useState, useEffect } from 'react'
import Question from "./components/Question"
import { decode } from 'html-entities'
import Blob from "./assets/blobs.png"
import Blob2 from "./assets/blobs2.png"
import Blob3 from "./assets/blobs3.png"
import Blob4 from "./assets/blobs4.png"

export default function App() {

  const [isHome, setIsHome] = useState(true)
  const [triviaData, setTriviaData] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [reset, setReset] = useState(false)

  // Starts the quiz
  function startQuiz() {
    setIsHome(false)
  }

  useEffect(function() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        setTriviaData(data.results.map(item => {
          const incorrect = decode(item.incorrect_answers)
          return {
            question: decode(item.question),
            answer: decode(item.correct_answer),
            options: randomizeAnswers([...incorrect, decode(item.correct_answer)]),
            selected: ""
          }
        }))
      })
  }, [reset])

  // 5 questions in the quiz
  const questionElements = triviaData.map((data, index) => {
    return (
      <Question
        key={index}
        question={data.question}
        answer={data.answer}
        options={data.options}
        selected={data.selected}
        selectOption={selectOption}
        submitted={isSubmitted}
      />
    )
  })

  // Randomizes the order of the options, except for true and false
  function randomizeAnswers(values){

    if ((values[0] == "True" && values[1] == "False") || 
        (values[0] == "False" && values[1] == "True")) {
        if (values[0] == "True") {
            return values
        } else {
            return [values[1], values[0]]
        }
    }

    let index = values.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (index != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * index);
        index--;
    
        // And swap it with the current element.
        [values[index], values[randomIndex]] = [
        values[randomIndex], values[index]];
    }
    return values;
  }

  // Updates array based on the selected option
  function selectOption(question, selected) {
    setTriviaData(prevTriviaData => prevTriviaData.map(item => {
      return item.question === question ? 
        {...item, selected: selected} :
        item
    }))
  }

  function checkQuiz() {
    triviaData.map(item => {
      if (item.selected === item.answer) {
        setScore(prevCount => prevCount + 1)
      }
    })
    setIsSubmitted(true)
  }

  function resetQuiz() {
    setScore(0)
    setIsSubmitted(false)
    setReset(prevReset => !prevReset)
  }

  // Changes the background depending on whether the quiz has started
  // TODO: fix this
  const backgroundStyles = {
    home: {
      backgroundImage: `url(${Blob}), url(${Blob2})`,
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: "right 0%, left 100%"
    },
    quiz: {
      backgroundImage: `url(${Blob3}), url(${Blob4})`,
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: "right 0%, left 100%"
    }
  }

  return (
    <main className="main" style={isHome ? backgroundStyles.home : backgroundStyles.quiz}>
      {isHome ?
        <div className="home">
          <h2 className="home--title">Quizzical</h2>
          <h4 className="home--description">A true test of knowledge.</h4>
          <button className="home--button" onClick={startQuiz}>Start quiz</button>
        </div> :
        <div className="quiz">
          {questionElements}
          {isSubmitted ? 
            <div className="quiz--summary">
              <h4 className="quiz--score">You scored {score}/5 correct answers</h4>
              <button className="quiz--reset" onClick={resetQuiz}>Play again</button>
            </div> : 
            <button className="quiz--submit" onClick={checkQuiz}>Check Answers</button>
          }
        </div>
      }
    </main>
  )
}
