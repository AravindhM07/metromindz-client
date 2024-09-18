import React, { useState, useEffect } from 'react';

function CircularLoader({ percentage, message }) {
    const [currentPercentage, setCurrentPercentage] = useState(0);

    useEffect(() => {
        setCurrentPercentage(percentage ? percentage : 0);
    }, [percentage]);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (currentPercentage / 100) * circumference;

    return (
        <div className="fixed z-10 w-full h-full flex items-center justify-center">
            <div className="relative bg-gray-100 p-4 rounded-md min-w-72 flex justify-center flex-col items-center border">
                <svg
                    className="w-32 h-32 transform rotate-[-90deg]"
                    viewBox="0 0 120 120"
                >
                    <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className="text-btn-cblue"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                </svg>
                <div className="absolute w-full h-full text-xl font-bold flex items-center -mt-7 justify-center">
                    {currentPercentage}%
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default CircularLoader;
