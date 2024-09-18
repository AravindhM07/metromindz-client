import React, { useState } from "react";
import { IoClose, IoCalendarOutline } from "react-icons/io5";

const AddTasks = ({ closeModal }) => {
    const [taskDetails, setTaskDetails] = useState({
        taskName: '',
        details: '',
        date: '',
        priority: 'Medium',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!taskDetails.taskName) newErrors.taskName = "Task Name is required";
        if (!taskDetails.date) newErrors.date = "Date is required";
        if (!taskDetails.priority) newErrors.priority = "Priority is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            console.log('taskData -->', taskDetails);
            setTaskDetails({
                taskName: '',
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

    return (
        <div className='flex justify-center items-center fixed w-full h-full top-0 left-0 bg-[#ffffff4f] z-10 backdrop-blur-0 text-[#464255]'>
            <div className='absolute w-[90%] h-auto bg-white shadow rounded-md p-7 overflow-y-auto'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg text-[#0000009c]'>Create Task</h2>
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
                                name='taskName'
                                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                                value={taskDetails.taskName}
                                onChange={handleChange}
                                required
                            />
                            {errors.taskName && <p className="text-red-500 text-sm">{errors.taskName}</p>}
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
                                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
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
                            <button type='submit' className='px-4 py-2 bg-green-400 text-white md:min-w-[120px] rounded-md hover:bg-green-500'>
                                Submit
                            </button>
                            <button type='button' className='px-4 py-2 bg-pink-600 text-white md:min-w-[120px] rounded-md hover:bg-pink-700' onClick={closeModal}>
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
