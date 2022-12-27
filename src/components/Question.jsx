import React from 'react'

export default function Question(props) {

    const randomArray = randomizeAnswers()

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
            <div>
                <button>{randomArray[0]}</button>
                <button>{randomArray[1]}</button>
                <button>{randomArray[2]}</button>
                <button>{randomArray[3]}</button>
            </div>
        </div>
    )
}
