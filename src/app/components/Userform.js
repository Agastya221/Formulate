"use client"
import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setFormData, setSubmitting, setSubmitError, resetFormState } from "@/lib/features/slice/formSlice"
import axios from 'axios'
import toast from 'react-hot-toast';
import { toggleModal } from "@/lib/features/slice/modalSlice";
import { updateUsers } from '@/lib/features/slice/updateuserSlice';

export default function Userform() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const isSubmitting = useSelector((state) => state.form.isSubmitting);
  const submitError = useSelector((state) => state.form.submitError);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users/adduser", {
        cache: "no-store"
      });
      return response.data
    } catch (error) {
      console.log("Error fetching users:", error);
      // Return empty array on error
    }
  };
  const onSubmit = async (data) => {
    try {
      dispatch(setFormData(data));
      dispatch(setSubmitting(true));
      const response = await axios.post("/api/users/adduser", data);
      console.log("User added successfully:", response.data);
      const updatedUsers = await getUsers();
      dispatch(updateUsers(updatedUsers.users));
      dispatch(resetFormState());
      dispatch(toggleModal()); 
      toast.success('User added successfully');

    } catch (error) {
      toast.error('Failed to add user');
      dispatch(setSubmitError(error.message));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isModalOpen ? '' : 'hidden'}`}>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New User
            </h3>
            <button type="button" onClick={() => dispatch(toggleModal())} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" {...register("name")} placeholder="Type your name" required="" />
              </div>
              <div className="col-span-2">
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" {...register("email")} placeholder="Email" required="" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input type="Number" name="PhoneNumber" id="phone" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" {...register("PhoneNumber")} pattern="[0-9]{9}" maxLength={10} title="Please enter valid phone number" placeholder="(723)-(4567)-(890)" required />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="hobbies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hobbies</label>
                <input type="text" name="Hobbies" id="hobbies" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" {...register("Hobbies")} placeholder="Hobbies" required="" />
              </div>
            </div>
            {submitError && <p className="text-red-500">{submitError}</p>} {/* Display submit error if exists */}
            <button type="submit" disabled={isSubmitting } className={`${isSubmitting  ? 'cursor-not-allowed opacity-50' : ''} text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} >
  {isSubmitting  ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5"></path>
      </svg>
      Adding User...
    </>
  ) : (
    <>
      <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
      Add User
    </>
  )}
</button>

          </form>
        </div>
      </div>
    </div>
  )
}
