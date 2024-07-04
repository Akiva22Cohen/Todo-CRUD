import React from 'react';

function WindowPosFix({ mainText, buttonText, mainAction, closeWidoFun, buttonRef }) {
    const windowPosition = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const left = buttonRect.right - 200;
        const top = buttonRect.top + 30;
        return { left, top };
    };

    const position = windowPosition();

    return (
        <div
            style={{
                zIndex: '4',
                position: 'absolute',
                top: position.top,
                left: position.left
            }}
            className='bg-body rounded shadow border text-center p-1'
        >
            <button onClick={() => closeWidoFun(false)} className='btn btn-close float-start' />
            <br />
            <p className=''>{mainText}</p>
            <button onClick={mainAction} className='border rounded-circle'>{buttonText}</button>
        </div>
    )
}

export default WindowPosFix