import React, { useRef, useState, useEffect } from 'react'

export default function FlashCard({ question }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [height, setHeight] = useState('initial');


    const frontElem = useRef()
    const backElem = useRef()
    function setMaxHeight() {
        const frontHeight = frontElem.current.getBoundingClientRect().height;
        const backHeight = backElem.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
    }

    useEffect(setMaxHeight, [])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => {
            window.removeEventListener('resize', setMaxHeight);
        }
    }, [])

    function htmlDecoder(str) {
        let elem = document.createElement('textarea');
        elem.innerHTML = str;
        return elem.value;
    }
    return (
        <div style={{ height: `${height}px` }} onClick={() => setIsFlipped(!isFlipped)} className={`flashCard ${isFlipped ? "goBackSide" : ""}`}>
            <div className="front" ref={frontElem}>
                <div>{htmlDecoder(question.question)}</div>
                <div className='flashCard-options'>{question.options.map(item => <div className='flashCard-option' key={item}>{htmlDecoder(item)}</div>)}</div>
            </div>
            <div className="back" ref={backElem}>
                {htmlDecoder(question.answer)}
            </div>

        </div>
    )
}

