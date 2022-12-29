import React from 'react'

export default function Question(props) {

    const randomArray = props.options

    function select(selected) {
        props.selectOption(props.question, selected)
    }

    const styles = {
        selected: {
            backgroundColor: "#D6DBF5",
            border: "1px solid #D6DBF5"
        },
        notSelected: {
            backgroundColor: "transparent"
        },
        finished: {
            opacity: "50%"
        },
        incorrect: {
            backgroundColor: "#F8BCBC",
            border: "1px solid #F8BCBC",
            opacity: "50%"
        },
        correct: {
            backgroundColor: "#94D7A2",
            border: "1px solid #94D7A2"
        }
    }

    // Chooses the style for each button, based on the current state of the quiz
    function chooseStyle(index) {
        if (randomArray[index] === props.answer) {
            if (props.submitted) {
                return styles.correct
            } else {
                if (props.selected === randomArray[index]) {
                    return styles.selected
                } else {
                    return styles.notSelected
                }
            }
        } else {
            if (props.submitted) {
                if (props.selected === randomArray[index]) {
                    return styles.incorrect
                } else {
                    return styles.finished
                }
            } else {
                if (props.selected === randomArray[index]) {
                    return styles.selected
                } else {
                    return styles.notSelected
                }
            }
        }
    }

    return (
        <div className="question">
            <h3 className="question--prompt">{props.question}</h3>
            {randomArray.length != 2 ? 
                <div className="question--options">
                    <button
                        style={chooseStyle(0)}
                        onClick={() => select(randomArray[0])}
                        disabled={props.submitted}
                    >
                        {randomArray[0]}
                    </button>
                    <button
                        style={chooseStyle(1)}
                        onClick={() => select(randomArray[1])}
                        disabled={props.submitted}
                    >
                        {randomArray[1]}
                    </button>
                    <button
                        style={chooseStyle(2)}
                        onClick={() => select(randomArray[2])}
                        disabled={props.submitted}
                    >
                        {randomArray[2]}
                    </button>
                    <button
                        style={chooseStyle(3)}
                        onClick={() => select(randomArray[3])}
                        disabled={props.submitted}
                    >
                        {randomArray[3]}
                    </button>
                </div> :
                <div className="question--options">
                    <button
                        style={chooseStyle(0)}
                        onClick={() => select(randomArray[0])}
                        disabled={props.submitted}
                    >
                        {randomArray[0]}
                    </button>
                    <button
                        style={chooseStyle(1)}
                        onClick={() => select(randomArray[1])}
                        disabled={props.submitted}
                    >
                        {randomArray[1]}
                    </button>
                </div>
            }
            <hr question--divider></hr>
        </div>
    )
}
