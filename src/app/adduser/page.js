"use client"
import  React, {useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from "@/lib/features/slice/modalSlice"
import { updateUsers } from '@/lib/features/slice/updateuserSlice';
import { toggleEditModal, setUserId } from '@/lib/features/slice/editmodalSlice';
import { toggleDeleteModal } from '@/lib/features/slice/DeletemodalSlice';
import axios from 'axios'
import Navbar from '../components/Navbar'
import deleteicon from '../../../public/icons8-delete.svg'
import Image from 'next/image'
import toast,  { Toaster } from "react-hot-toast"
import Userform from '../components/Userform';
import Editform from '../components/Editform'
import DeleteModal from '../components/DeleteModal';
import editsvg from "../../../public/edit-svgrepo-com.svg"
import { setSubmitting } from "@/lib/features/slice/formSlice"
export default function page() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSending,setisSending] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const isEditModalOpen = useSelector((state) => state.editModal.isEditModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const updateuser = useSelector((state) => state.updateuser.users);
  const isDeleteOpen = useSelector((state) => state.deletemodal.isDeleteOpen);

  const handleToggleModal = async() => {
    dispatch(toggleModal());
  };

  const handleEditToggleModal = async (userId) => {
    dispatch(setUserId(userId));
    dispatch(toggleEditModal());
  };

  const handleDeleteToggleModal = async(userId) => {
    dispatch(toggleDeleteModal());
    dispatch(setUserId(userId));
  }

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((user) => user !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  }

  const handleSendData = async () => {
    try {
      setisSending(true)
      // Fetching  complete user data based on selected user IDs
      const selectedUserData = selectedUsers.map(userId => {
        return updateuser.find(user => user._id === userId);
      });
      // Sending selectedUsers data to the API
      await toast.promise(
        axios.post("/api/users/send-selected-users", { selectedUsers: selectedUserData }),
        {
          loading: 'Sending data...',
          success: 'Data sent successfully',
          error: 'Failed to send data'
        }
      );
      console.log("Selected users data sent successfully:", response.data);
      dispatch(setSubmitting(false));
      
    } catch (error) {
      console.error("Error sending selected users data:", error);
      dispatch(setSubmitting(false));
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        dispatch(updateUsers(response.users));
        setIsLoading(false); // Set loading state to false when data fetching is done
      } catch (error) {
        setIsLoading(false); // Set loading state to false on error
        console.log("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users/adduser"); 
      return response.data;
    } catch (error) {
      console.log("Error fetching users:", error);
      // Return empty array on error
      return [];
    }
  };

  return (
      <div >
        <Toaster/>
        <Navbar />
        {isLoading ?( <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>) : (
        <div className="flex flex-col p-4 h-screen ">
          
          <div className={` bg-opacity-20 ${isModalOpen || isEditModalOpen || isDeleteOpen ? 'blur-sm' : ''} relative overflow-x-auto shadow-md sm:rounded-lg`}>
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">Search</label>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4"></th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">id</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Phone Number</th>
                  <th scope="col" className="px-6 py-3">Hobbies</th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {updateuser.map((user) => (
                  <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input 
                          id={`checkbox-table-search-${user._id}`} 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={() => handleCheckboxChange(user._id)}
                        />
                        <label htmlFor={`checkbox-table-search-${user._id}`} className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.PhoneNumber}</td>
                    <td className="px-6 py-4">{user.Hobbies}</td>
                    <td className="px-2 py-2">
                      <button 
                        data-modal-target="authenticationEdit-modal" 
                        data-modal-toggle="authenticationEdit-modal" 
                        className="block m-2 p-2  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center " 
                        onClick={() => handleEditToggleModal(user._id)} 
                        type="button"
                      >
                        <Image className="w-5 h-5" src={editsvg} alt='edit' />
                      </button>
                    </td>
                    <td className="px-2 py-2">
                      <button 
                        id="deleteButton" 
                        data-modal-target="deleteModal" 
                        data-modal-toggle="deleteModal" 
                        className=" hover:cursor-pointer " 
                        type="button" 
                        onClick={() => handleDeleteToggleModal(user._id)}
                      >
                        <Image className="w-5 h-5" src={deleteicon} alt='delete' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
          </div>
         
          <div className='flex justify-end'>
          <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block m-2 p-2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleToggleModal} type="button">Add Data</button>
            <button 
              className={`${selectedUsers.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'} rounded m-2 p-2 px-4`} 
              onClick={handleSendData} 
              disabled={selectedUsers.length === 0}
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
          {isModalOpen && <Userform />}
          {isEditModalOpen && <Editform />}
          {isDeleteOpen && <DeleteModal/>}
        </div>
         )}
        
      </div>
  )
}
