import React, { useEffect, useState } from 'react';

const EyeTracking = () => {
    const [gazePosition, setGazePosition] = useState({ x: 0, y: 0 });
    const centerX = 550; 
    const centerY = 115;
    const movementThreshold = 50; 
    const [direction, setDirection] = useState('');

    useEffect(() => {
        const webgazer = window.webgazer;
        webgazer.setGazeListener((data, clock)=>{
        console.log(data, clock);
        setGazePosition({x:data.x, y:data.y})
        if (data.x < centerX - movementThreshold) {
            setDirection('Eyes moved left');
        } else if (data.x > centerX + movementThreshold) {
            setDirection('Eyes moved right');
        }
        
        // Check for vertical movement
        if (data.y < centerY - movementThreshold) {
            setDirection('Eyes moved up');
        } else if (data.y > centerY + movementThreshold) {
           setDirection('Eyes moved down');
        }
        }).begin()
        }, [])

    return (
        <div>
            <h1>Eye Tracking with WebGazer.js</h1>
            <div>
                <div id="gaze-indicator"></div>
            </div>
            <div>
                <h2>Gaze Position</h2>
                <p>X: {gazePosition.x.toFixed(2)}</p>
                <p>Y: {gazePosition.y.toFixed(2)}</p>
                <h2>Direction</h2>
                <p>{direction || 'Looking straight ahead'}</p>
            </div>
        </div>
    );
};

export default EyeTracking;