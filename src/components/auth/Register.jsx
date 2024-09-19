import React, { useEffect, useState, useCallback } from "react";
import Profile from "../../assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { createUser, fetchCurrentUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const dispatch = useDispatch();
    const { status: apiStatus, error: apiError, currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: Profile,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleProfileUpdate = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (formData.image === Profile) newErrors.image = "Profile image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setMessage("");

        try {
            await dispatch(createUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                image: formData.image,
            }));
            await dispatch(fetchCurrentUser());
            navigate("/");
        } catch (error) {
            setErrors({ api: error.response?.data?.message || "An error occurred" });
        } finally {
            setLoading(false);
        }
    }, [dispatch, formData, navigate, validateForm]);

    useEffect(() => {
        if (apiStatus === "auth_failed") {
            setErrors({ api: apiError?.message });
        }
    }, [apiStatus, apiError]);

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
                        <div><h1 className="text-2xl font-semibold md:-ml-1">Register</h1></div>
                        {message && <p className="text-green-500">{message}</p>}
                        {errors.api && <p className="text-red-500">{errors.api}</p>}
                        {errors.image && <p className="text-red-500">{errors.image}</p>}
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit} className="py-5 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative flex justify-center items-center">
                                    <div className="relative h-24 w-24 rounded-full">
                                        <img src={formData.image} id="profile" alt="profile" className="w-full h-full object-fill -ml-10 md:-ml-1 rounded-md border border-solid" />
                                        <input type="file" accept="image/*" className="absolute top-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleProfileUpdate} />
                                    </div>
                                    <div className="relative">
                                        <InputField
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            handleInputChange={handleInputChange}
                                            error={errors.name}
                                            extraClasses="md:ml-4"
                                        />
                                    </div>
                                </div>
                                <InputField
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    handleInputChange={handleInputChange}
                                    error={errors.email}
                                />
                                <InputField
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    handleInputChange={handleInputChange}
                                    error={errors.password}
                                />
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
                    <div className="w-full flex justify-center">
                        <p className="w-full">Already have an account <Link to="/login" onClick={() => setErrors({})} className="text-sky-500 font-semibold">Login</Link> </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const InputField = ({ id, name, type, placeholder, value, handleInputChange, error, extraClasses }) => (
    <div className={`relative ${extraClasses}`}>
        <input
            autoComplete="off"
            id={id}
            name={name}
            type={type}
            className={`peer text-sm placeholder-transparent h-10 w-full border-b-2 ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:border-sky-500`}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            required
        />
        <label
            htmlFor={id}
            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
            {placeholder}
        </label>
        {error && <p className="text-red-500">{error}</p>}
    </div>
);

export default React.memo(Register);
