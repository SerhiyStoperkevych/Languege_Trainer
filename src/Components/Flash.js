import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { press, clear } from '../features/slice';
import { useSelector } from 'react-redux';
import { remove } from '../features/slice';

const Flash = () => {

    const [flippedStates, setFlippedStates] = useState({});
    const languages = useSelector((state) => state.languages.language);

    useEffect(() => {
        const initialState = {};
        languages.forEach((language) => {
            initialState[language.id] = false;
        });
        setFlippedStates(initialState);
    }, [languages]);

    const toggleFlip = (id) => {
        setFlippedStates((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id],
        }));
    };

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(press({ id: Date.now(), front, back }));
        setFront('');
        setBack('');
    };

    const handleClear = () => {
        dispatch(clear());
        setFront('');
        setBack('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Make Your FlashCards:</h1>
                <input 
                    name="front"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    placeholder="Frontside"
                />
                <input 
                    name="back"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    placeholder="Backside"
                />
                <button type="submit">Add</button>
                <button type="button" onClick={handleClear}>Clear</button>
            </form>
            <ul>
            {languages.map((language) => (
                <li key={language.id}>
                    <h1>Your Card:</h1>
                    {flippedStates[language.id] ? (
                        <>
                            <h2>{language.back}</h2>
                            <button onClick={() => toggleFlip(language.id)}>Front</button>
                        </>
                    ) : (
                        <>
                            <h2>{language.front}</h2>
                            <button onClick={() => toggleFlip(language.id)}>Back</button>
                        </>
                    )}
                    <button onClick={() => dispatch(remove(language.id))}>Remove</button>
                </li>
            ))}
        </ul>
        </>
    );
};

export default Flash;
