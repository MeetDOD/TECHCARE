import React, { useEffect } from 'react';

const SpeakableElement = ({
    tag: Tag = 'div',
    text,
    speakOnClick = false,
    children,
    isVoiceEnabled,
    ...props
}) => {
    let speechSynthesisUtterance;

    const stopSpeech = () => {
        if (speechSynthesisUtterance) {
            window.speechSynthesis.cancel();
        }
    };

    const speak = (textToSpeak) => {
        if (isVoiceEnabled) {
            stopSpeech();
            speechSynthesisUtterance = new SpeechSynthesisUtterance(textToSpeak);
            window.speechSynthesis.speak(speechSynthesisUtterance);
        }
    };

    const handleFocus = () => {
        if (text) {
            speak(text);
        }
    };

    const handleClick = () => {
        if (speakOnClick && text) {
            speak(text);
        }
    };

    useEffect(() => {
        return () => {
            stopSpeech();
        };
    }, []);

    return (
        <Tag
            tabIndex="0"
            onFocus={handleFocus}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default SpeakableElement;
