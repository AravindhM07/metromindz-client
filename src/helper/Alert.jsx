import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../redux/slices/userSlices';

const Alert = ({ data, reset }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const closeAlert = () => {
        setIsVisible(false);
        reset();
        if (data?.type === "success" && !data?.isUpload) {
            dispatch(fetchCurrentUser());
            navigate("/");
        } else if (data?.type === "signin") {
            navigate("/auth");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="relative bg-white rounded-md shadow-2xl p-8 max-w-md w-full mx-4 md:mx-0">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{data?.title}</h2>
                    <button className="text-gray-500 hover:text-gray-800 transition duration-200" onClick={() => closeAlert()} >
                        <IoClose className="h-6 w-6" />
                    </button>
                </div> <hr /> <br />
                <p className="text-gray-700 text-sm leading-relaxed">{data?.message}</p>
                <div className="mt-6">
                    <button onClick={() => closeAlert()} className={`w-full py-2 px-4 ${data?.type === "error" || data?.type === "signin" ? "bg-gray-700" : "bg-indigo-600"} text-white rounded-lg font-medium shadow-md ${data?.type === "error" || data?.type === "signin" ? "hover:bg-gray-800" : "hover:bg-indigo-700"} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200`} >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Alert);
