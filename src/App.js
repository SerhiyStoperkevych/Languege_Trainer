import React, { useState } from 'react';
import Flash from './components/Flash';
import QuestionForm from './components/QuestionForm.js'
import './App.css';

const App = () => {
    const [currentComponent, setCurrentComponent] = useState(null);


    const handleFlash = () => {
        setCurrentComponent(<Flash />);
    };

    const handleQuiz = () => {
        setCurrentComponent(<QuestionForm />);
    };

    return (
        <div>
            <h1>What language game would you like to take?</h1>
            <button onClick={handleFlash}>Flashcards</button>
            <button onClick={handleQuiz} >Quiz</button>
            {currentComponent}
        </div>
    );
};

export default App;
