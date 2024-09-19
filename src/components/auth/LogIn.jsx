import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, fetchCurrentUser, resetState } from "../../redux/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status: apiStatus, error: apiError, currentUser } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }
        if (!formData.password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleApiErrors = useCallback(() => {
        if (apiStatus === "auth_failed") {
            setErrors({ api: apiError?.message || "An error occurred" });
        }
    }, [apiStatus, apiError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setMessage("");

        try {
            await dispatch(signInUser(formData));
        } catch (error) {
            setErrors({ api: error.response?.data?.message || "An error occurred" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (apiStatus === "signin_succeeded") {
            dispatch(fetchCurrentUser());
            navigate("/");
        } else {
            handleApiErrors();
        }
    }, [apiStatus, handleApiErrors, dispatch, navigate]);

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <h1 className="absolute md:hidden -top-20 text-center w-full font-bold text-2xl text-[#464255]">Task Management Hub</h1>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 mx-2 md:mx-0 rounded-md">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">Login</h1>
                        {message && <p className="text-green-500">{message}</p>}
                        {errors.api && <p className="text-red-500">{errors.api}</p>}
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="email"
                                        name="email"
                                        type="text"
                                        className={`peer text-sm placeholder-transparent h-10 w-full border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:border-sky-500`}
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Email Address
                                    </label>
                                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type="password"
                                        className={`peer text-sm placeholder-transparent h-10 w-full border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:border-sky-500`}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Password
                                    </label>
                                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                                </div>
                                <div className="relative">
                                    <button
                                        type="submit"
                                        className="bg-sky-500 hover:bg-sky-400 text-white rounded-md px-2 py-1 font-semibold min-w-28 flex gap-3 justify-center items-center min-h-[38px]"
                                        disabled={loading}
                                    >
                                        {loading ? "Submitting..." : "Submit"} <FaCheckCircle />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full flex justify-start">
                        <p>Don't have an account <Link to="/register" onClick={() => { setErrors({}); dispatch(resetState()); }} className="text-sky-500 font-semibold">Register</Link></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default React.memo(Login);
