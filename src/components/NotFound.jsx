import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-sky-500">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
                <p className="mt-2 text-gray-500">Sorry, we can't find the page you're looking for.</p>
                <button onClick={() => window.history.back()} className="mt-6 px-6 py-3 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-500-700 transition-colors" >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
