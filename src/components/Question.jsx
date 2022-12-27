import React from 'react'

export default function Question(props) {

    const randomArray = randomizeAnswers()

    // Randomizes the order of the
    function randomizeAnswers(){

        let values = [...props.incorrect, props.answer]
        let index = 4;
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

    return (
        <div className="question">
            <h3 className="question--prompt">{props.question}</h3>
            <div className="question--options">
                <button className="question--op1">{randomArray[0]}</button>
                <button className="question--op2">{randomArray[1]}</button>
                <button className="question--op3">{randomArray[2]}</button>
                <button className="question--op4">{randomArray[3]}</button>
            </div>
            <hr></hr>
        </div>
    )
}
