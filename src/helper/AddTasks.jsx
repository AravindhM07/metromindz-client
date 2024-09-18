import React from "react";
import { IoClose } from "react-icons/io5";

const AddTasks = ({ closeModal }) => {
    return (
        <div className='fixed w-full h-full top-0 left-0 bg-[#ffffff4f] z-10 backdrop-blur-0 text-[#464255]'>
            <div className='absolute w-[90%] h-[90%] top-[5%] left-[5%] bg-white shadow rounded-md p-7 overflow-y-auto'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg text-[#0000009c]'>Create Task</h2>
                    <button onClick={closeModal}><IoClose className='text-lg' /></button>
                </div>
                <div className='mt-5'>
                    <form>
                        <div className='mb-4'>
                            <label className='block text-lg font-medium mb-1 text-sky-500'>Task Name <sup className="text-red-500">*</sup> </label>
                            <input
                                type='text'
                                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                                required
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-lg font-medium mb-1 text-sky-500'>Details</label>
                            <textarea
                                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none min-h-[140px] md:min-h-[190px] max-h-[190px]'
                                rows='4'
                            ></textarea>
                        </div>

                        <div className='mb-4 flex space-x-4'>
                            <div className='flex-1'>
                                <label className='block text-lg font-medium mb-1 text-sky-500'>Date <sup className="text-red-500">*</sup></label>
                                <div className='relative'>
                                    <input
                                        type='date'
                                        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex-1'>
                                <label className='block text-lg font-medium mb-1 text-sky-500'>Priority <sup className="text-red-500">*</sup> </label>
                                <select
                                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500' required
                                >
                                    <option value='Low'>Low</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='High'>High</option>
                                </select>
                            </div>
                        </div>
                        <br /><hr />
                        <div className='flex justify-end space-x-3 mt-6'>
                            <button type='submit' className='px-4 py-2 bg-green-400 text-white md:min-w-[120px] rounded-md hover:bg-green-500' >
                                Submit
                            </button>
                            <button type='button' className='px-4 py-2 bg-pink-600 text-white md:min-w-[120px] rounded-md hover:bg-pink-700' onClick={closeModal} >
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
