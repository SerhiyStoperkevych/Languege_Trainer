import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, addOption, removeQuestion, removeOption } from '../features/questionsSlice';

const QuestionForm = () => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newOption, setNewOption] = useState('');
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const questions = useSelector((state) => state.questions.questions);
    const dispatch = useDispatch();

    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            dispatch(addQuestion(newQuestion));
            setNewQuestion('');
        }
    };

    const handleAddOption = () => {
        if (selectedQuestionId && newOption.trim()) {
            dispatch(addOption({ questionId: selectedQuestionId, option: newOption }));
            setNewOption('');
        }
    };

    return (
        <div>
            <h1>Make Your Questions and Options:</h1>
            <div>
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Add a question"
                />
                <button onClick={handleAddQuestion}>Add Question</button>
            </div>
            <div>
                <select onChange={(e) => setSelectedQuestionId(e.target.value)} defaultValue="">
                    <option value="" disabled>Select a question to add options</option>
                    {questions.map((question) => (
                        <option key={question.id} value={question.id}>{question.question}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add an option"
                />
                <button onClick={handleAddOption}>Add Option</button>
            </div>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <h2>{question.question}</h2>
                        <button onClick={() => dispatch(removeQuestion(question.id))}>Remove Question</button>
                        <ul>
                            {question.options.map((option) => (
                                <li key={option.id}>
                                    <h3>{option.text}</h3>
                                    <button onClick={() => dispatch(removeOption({ questionId: question.id, optionId: option.id }))}>Remove Option</button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionForm;
