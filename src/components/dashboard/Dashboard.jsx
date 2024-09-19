import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import AddTasks from '../../helper/AddTasks';
import images from '../../helper/ImageHelper';
import { fetchTasksList, deleteRequest } from '../../redux/slices/taskSlice';
import { logoutCurrentUser } from '../../redux/slices/userSlice';

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(state => state.user.status);
    const currentUser = useSelector(state => state.user.currentUser);
    const tasksList = useSelector(state => state.task.tasksList);
    const [activePage, setActivePage] = useState('dashboard');
    const [isCreateActive, setIsCreateActive] = useState(true);
    const [selectedCard, setSelectedCard] = useState({});
    const [isTaskModalOpened, setIsTaskModalOpened] = useState(false);

    const handleSideBarPreview = () => {
        if (window.innerWidth < 767) {
            const sidebar = document.getElementById('aside-navContainer');
            sidebar.classList.toggle('active');
        }
    };

    const Profile = ({ currentUser }) => {

        const [isOpen, setIsOpen] = React.useState(false);
        let closeTimeout;

        const handleMouseEnter = () => {
            if (closeTimeout) {
                clearTimeout(closeTimeout);
            }
            setIsOpen(true);
        };

        const handleMouseLeave = () => {
            closeTimeout = setTimeout(() => {
                setIsOpen(false);
            }, 300);
        };

        return (
            <div className={`${currentUser ? 'block' : 'hidden'} relative`}>
                <span className='inline-block w-11 h-11 rounded-xl bg-gray-100 cursor-pointer' onClick={() => setIsOpen(!isOpen)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <img src={currentUser?.profile} alt="profile" className='aspect-square object-contain rounded-xl' />
                </span>
                {isOpen && (
                    <ul className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-700" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}                >
                        <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer" onClick={async () => { await dispatch(logoutCurrentUser()); navigate("/login") }}>Logout</li>
                    </ul>
                )}
            </div>
        );
    };

    const CardOptions = ({ taskData }) => {

        const [isOpen, setIsOpen] = React.useState(false);
        let closeTimeout;

        const handleMouseEnter = () => {
            if (closeTimeout) {
                clearTimeout(closeTimeout);
            }
            setIsOpen(true);
        };

        const handleMouseLeave = () => {
            closeTimeout = setTimeout(() => {
                setIsOpen(false);
            }, 300);
        };

        return (
            <div className={`${currentUser ? 'block' : 'hidden'} relative`}>
                <span className='w-5 h-5 flex items-center justify-center text-4xl -mt-3 cursor-pointer text-[rgba(0,0,0,0.5)]' onClick={() => setIsOpen(!isOpen)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>...</span>
                {isOpen && (
                    <ul className="absolute right-0 mt-2 w-[100px] bg-white border border-gray-200 rounded-lg shadow-lg text-gray-700" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                        <li className="hover:bg-gray-100 py-1 px-3 cursor-pointer text-[12px]" onClick={() => { setSelectedCard(taskData); setIsTaskModalOpened(true) }}>Edit</li>
                        <li className="hover:bg-gray-100 py-1 px-3 cursor-pointer text-[12px]" onClick={async () => { await dispatch(deleteRequest(taskData?._id)); dispatch(fetchTasksList()) }}>Delete</li>
                    </ul>
                )}
            </div>
        );
    };

    const handleTaskModal = () => {
        setSelectedCard({});
        setIsTaskModalOpened(!isTaskModalOpened);
    };

    useEffect(() => {
        if (status === "logout_succeeded") {
            navigate("/login");
        }
    }, [status, navigate]);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchTasksList());
        }
    }, [currentUser]);

    return (
        <React.Fragment>
            <div className='relative w-full min-h-screen flex text-[#464255]'>
                <aside className='fixed w-[0%] md:w-[15%] h-full shadow-xl bg-white overflow-hidden z-10' id='aside-navContainer'>
                    <ul className='w-full h-full flex justify-start items-center flex-col gap-5'>
                        <motion.li className='min-h-[75px] flex justify-start items-center w-[70%] mx-[15%]' initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} >
                            <Link to="/dashboard" className='font-[500] text-2xl'>logo</Link>
                        </motion.li>
                        <motion.li className='min-h-10 flex justify-start items-center w-[70%] mx-[15%] mt-3' whileTap={{ scale: 0.9 }} onClick={() => handleSideBarPreview()} >
                            <span className={`cursor-pointer flex gap-2 ${activePage === 'dashboard' && 'text-sky-400'}`} onClick={() => setActivePage('dashboard')} >
                                <img src={activePage === 'dashboard' ? images.HomeActiveIcon : images.HomeIcon} alt="home-icon" className='aspect-square w-6' /> Dashboard
                            </span>
                        </motion.li>
                        <motion.li className='min-h-10 flex justify-start items-center w-[70%] mx-[15%]' whileTap={{ scale: 0.9 }} onClick={() => handleSideBarPreview()} >
                            <span className={`cursor-pointer flex gap-2 ${activePage === 'tasks' && 'text-sky-400'}`} onClick={() => setActivePage('tasks')} >
                                <img src={activePage === 'tasks' ? images.TaskActiveIcon : images.TaskIcon} alt="home-icon" className='aspect-square w-6' /> Tasks
                            </span>
                        </motion.li>
                    </ul>
                </aside>
                <div className='w-[100%] md:ml-[15%] md:w-[85%] bg-gray-100'>
                    <header className='sticky top-0 w-[100%] md:w-[99%] min-h-[75px] shadow-xl md:ml-[1%] bg-white flex justify-between items-center px-4 md:px-8 z-20'>
                        <motion.div className='leading-5 md:leading-7' initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} >
                            <h3 className='text-lg font-bold md:text-xl'>Welcome !</h3>
                            <p className='text-[12px] text-wrap'>{currentUser?.name}</p>
                        </motion.div>
                        <motion.div className='flex gap-2 md:gap-6 items-center' initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} >
                            <span className='inline-block w-11 h-11 cursor-pointer' >
                                <img src={images.MessageIcon} alt="message-icon" className='aspect-square object-cover' />
                            </span>
                            <span className='inline-block w-11 h-11 rounded-lg cursor-pointer' >
                                <img src={images.BellIcon} alt="bell-icon" className='aspect-square object-cover' />
                            </span>
                            <Profile currentUser={currentUser} />
                            <span className='flex md:hidden justify-center items-center w-11 h-11 md:w-14 md:h-14 rounded-lg cursor-pointer bg-gray-100' onClick={() => handleSideBarPreview()} >
                                <FaBars className='text-xl' />
                            </span>
                        </motion.div>
                    </header>
                    <div className='flex justify-between items-center py-8'>
                        {activePage === 'dashboard' ? (
                            <motion.div className='w-full md:px-3' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
                                <div className="flex gap-5 flex-wrap justify-center md:justify-start">
                                    <motion.div className="bg-white w-[90%] md:w-[300px] py-2 px-5 rounded-md flex justify-between items-center min-h-[120px] cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out" whileHover={{ scale: 1.05 }} >
                                        <div>
                                            <p>Total Tasks</p>
                                            <h2 className='font-bold text-2xl'>{tasksList?.length || 0}</h2>
                                        </div>
                                        <img src={images.LeaderBoardIcon} alt="leaderboard-icon" className='aspect-square object-contain min-w-10 min-h-10' />
                                    </motion.div>
                                    <motion.div className="bg-white w-[90%] md:w-[300px] py-2 px-5 rounded-md flex justify-between items-center min-h-[120px] cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out" whileHover={{ scale: 1.05 }} >
                                        <div>
                                            <p>Completed</p>
                                            <h2 className='font-bold text-2xl'>{tasksList?.length && (tasksList.filter(tasks => tasks.isCompleted)?.length || 0)}</h2>
                                        </div>
                                        <img src={images.HandshakeIcon} alt="handshake-icon" className='aspect-square object-contain w-10 h-10' />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ) : <div className='w-full px-3'>
                            <div className='px-2 md:px-7'>
                                <h1 className='font-[500] text-lg'>Manage Task</h1>
                                <p className='text-[12px] text-[#A3A3A3]'>Check Your daily Tasks and Schedule</p>
                            </div>
                            <div className='relative mt-7 w-full bg-white rounded-md flex justify-between items-start'>
                                <div className='p-3 leading-5 md:leading-10 py-5'>
                                    <h1 className='font-[500] text-lg'>Today's Task</h1>
                                    <p className='text-[12px] text-[#A3A3A3]'>Check Your daily Tasks and Schedule</p>
                                    <button className='mt-2 min-h-[40px] bg-[#59B2E8] hover:bg-sky-400 transition duration-300 ease-in-out min-w-[120px] rounded-md text-white flex gap-4 justify-center items-center' onClick={() => handleTaskModal()}>Add New <img src={images.AddBox} alt="add-box" className='w-4' /> </button>
                                </div>
                                <div className='p-2'>
                                    <img src={images.UserTemplate} alt="user-template" className='w-[300px] h-[150px] cursor-pointer hover:border transition duration-200' />
                                </div>
                            </div>
                            <div className='relative mt-7 w-full'>
                                <ul className='h-full min-h-10 flex gap-5 items-center bg-[#59B2E8] text-white px-6 rounded-md'>
                                    <li className={`cursor-pointer ${!isCreateActive && "text-gray-200"}`} onClick={() => setIsCreateActive(true)}>Created ({tasksList?.length && (tasksList.filter(tasks => !tasks.isCompleted)?.length || 0)})</li>
                                    <li className={`cursor-pointer ${isCreateActive && "text-gray-200"}`} onClick={() => setIsCreateActive(false)}>Completed ({tasksList?.length && (tasksList.filter(tasks => tasks.isCompleted)?.length || 0)})</li>
                                </ul>
                                <div className="w-full md:w-[99%] min-h-[75px] py-8 leading-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {isCreateActive ?
                                            <React.Fragment>
                                                {tasksList?.length && tasksList.filter(tasks => !tasks.isCompleted)?.length ? tasksList.filter(tasks => !tasks.isCompleted)?.map((item, index) => {
                                                    return (
                                                        <div className="bg-white shadow-md rounded-md p-4" key={index}>
                                                            <div className='flex justify-between items-center'>
                                                                <h1 className='text-[#004490] font-[500]'>{item?.title}</h1>
                                                                <CardOptions taskData={item} />
                                                            </div>
                                                            <p className='text-[12px] text-[#A3A3A3]'>Details: {item?.details}</p>
                                                            <p className="flex gap-3 items-center mt-2 text-[13px] text-gray-400 font-[500]">
                                                                <img src={images.EventNote} alt="event-note" className="w-3 h-3" />
                                                                <span className='-mt-[2px]'>
                                                                    {new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(item.date))}
                                                                </span>
                                                            </p>
                                                            <div className='flex justify-between items-center mt-3'>
                                                                <div className='flex gap-3 items-center text-[14px] text-gray-400 font-[500]'>
                                                                    <img src={currentUser?.profile} alt="user-profile" className='w-10 h-10 rounded-full' />
                                                                    By {currentUser?.name}
                                                                </div>
                                                                <div className='flex gap-3'>
                                                                    <button className='bg-transparent text-[14px] text-blue-600 font-[500]'>Priority</button>
                                                                    <button className={`bg-transparent text-[14px] text-white p-1 rounded-md min-w-[80px] max-h-[25px] flex items-center justify-center mt-1 font-[500]`} style={{ background: `${item?.priority === "Low" ? "#00BFA1" : item?.priority === "Medium" ? "#EBAF00" : "#FF807A"}` }}>{item?.priority}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : <p className='text-[15px] text-gray-500 font-[500] px-3'>No tasks have been created yet.</p>}
                                            </React.Fragment>
                                            : <React.Fragment>
                                                {tasksList?.length && tasksList.filter(tasks => tasks.isCompleted)?.length ? tasksList.filter(tasks => tasks.isCompleted)?.map((item, index) => {
                                                    return (
                                                        <div className="bg-white shadow-md rounded-md p-4" key={index}>
                                                            <div className='flex justify-start items-center'>
                                                                <h1 className='text-[#004490] font-[500]'>{item?.title}</h1>
                                                            </div>
                                                            <p className='text-[12px] text-[#A3A3A3]'>Details: {item?.details}</p>
                                                            <p className="flex gap-3 items-center mt-2 text-[13px] text-gray-400 font-[500]">
                                                                <img src={images.EventNote} alt="event-note" className="w-3 h-3" />
                                                                <span className='-mt-[2px]'>
                                                                    {new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(item.date))}
                                                                </span>
                                                            </p>
                                                            <div className='flex justify-between items-center mt-3'>
                                                                <div className='flex gap-3 items-center text-[14px] text-gray-400 font-[500]'>
                                                                    <img src={currentUser?.profile} alt="user-profile" className='w-10 h-10 rounded-full' />
                                                                    By {currentUser?.name}
                                                                </div>
                                                                <div className='flex gap-3'>
                                                                    <button className='bg-transparent text-[14px] text-blue-600 font-[500]'>Priority</button>
                                                                    <button className={`bg-transparent text-[14px] text-white p-1 rounded-md min-w-[80px] max-h-[25px] flex items-center justify-center mt-1 font-[500]`} style={{ background: `${item?.priority === "Low" ? "#00BFA1" : item?.priority === "Medium" ? "#EBAF00" : "#FF807A"}` }}>{item?.priority}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : <p className='text-[15px] text-gray-500 font-[500] px-3'>No tasks have been completed yet.</p>}
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            {isTaskModalOpened && <AddTasks closeModal={handleTaskModal} selectedCard={selectedCard} />}
        </React.Fragment>
    )
};

export default React.memo(Dashboard);