import React, { useEffect, useState } from "react";
import { IoClose, IoCalendarOutline } from "react-icons/io5";
import { handleTasks, fetchTasksList } from "../redux/slices/taskSlice";
import { useDispatch } from "react-redux";

const AddTasks = ({ closeModal, selectedCard }) => {

    const dispatch = useDispatch();
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        details: '',
        date: '',
        priority: 'Low',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!taskDetails.title) newErrors.title = "Task Name is required";
        if (!taskDetails.date) newErrors.date = "Date is required";
        if (!taskDetails.priority) newErrors.priority = "Priority is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const payload = {
                id: selectedCard?._id,
                ...taskDetails
            };
            await dispatch(handleTasks(payload));
            await dispatch(fetchTasksList());
            setTaskDetails({
                title: '',
                details: '',
                date: '',
                priority: 'Medium',
            });
            closeModal();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (Object.keys(selectedCard).length) {
            const dateString = selectedCard.date;
            let formattedDate = '';

            if (dateString) {
                const dateObject = new Date(dateString);
                formattedDate = dateObject.toISOString().split('T')[0];
            }

            setTaskDetails({
                title: selectedCard.title,
                details: selectedCard.details,
                date: formattedDate,
                priority: selectedCard.priority,
            });
        }
    }, [selectedCard]);

    return (
        <div className='flex justify-center items-center fixed w-full h-full top-0 left-0 bg-[#ffffffa3] z-30 backdrop-blur-0 text-[#464255]'>
            <div className='absolute w-[90%] h-auto bg-white shadow rounded-md p-7 overflow-y-auto'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg text-[#0000009c]'>{Object.keys(selectedCard).length ? "Update" : "Create"} Task</h2>
                    <button onClick={closeModal}><IoClose className='text-lg' /></button>
                </div>
                <div className='mt-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block text-lg font-medium mb-1 text-sky-500'>
                                Task Name <sup className="text-red-500">*</sup>
                            </label>
                            <input
                                type='text'
                                name='title'
                                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                                value={taskDetails.title}
                                onChange={handleChange}
                                required
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div className='mb-4'>
                            <label className='block text-lg font-medium mb-1 text-sky-500'>Details</label>
                            <textarea
                                name='details'
                                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none min-h-[140px] md:min-h-[190px] max-h-[190px]'
                                rows='4'
                                value={taskDetails.details}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className='mb-4 flex space-x-4'>
                            <div className='flex-1'>
                                <label className='block text-lg font-medium mb-1 text-sky-500'>
                                    Date <sup className="text-red-500">*</sup>
                                </label>
                                <div className='relative'>
                                    <input
                                        type='date'
                                        name='date'
                                        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                                        value={taskDetails.date}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className='hidden absolute inset-y-0 right-0 pr-3 md:flex items-center pointer-events-none'>
                                        <IoCalendarOutline className='text-gray-400 bg-white' />
                                    </div>
                                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                                </div>
                            </div>

                            <div className='flex-1'>
                                <label className='block text-lg font-medium mb-1 text-sky-500'>
                                    Priority <sup className="text-red-500">*</sup>
                                </label>
                                <select
                                    name='priority'
                                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                                    value={taskDetails.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value='Low'>Low</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='High'>High</option>
                                </select>
                                {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
                            </div>
                        </div>

                        <br /><hr />
                        <div className='flex justify-end space-x-3 mt-6'>
                            <button type='submit' className='px-4 py-2 bg-[#00BFA1] text-white md:min-w-[120px] rounded-md'>
                                Submit
                            </button>
                            <button type='button' className='px-4 py-2 bg-[#FF807A] text-white md:min-w-[120px] rounded-md' onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTasks;
