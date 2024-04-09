// store.js

import { configureStore } from '@reduxjs/toolkit';
import modalReducer  from '@/lib/features/slice/modalSlice';
import editModalReducer  from '@/lib/features/slice/editmodalSlice';
import formReducer  from '@/lib/features/slice/formSlice';
import updateuserReducer  from '@/lib/features/slice/updateuserSlice';
import deleteuserReducer  from '@/lib/features/slice/DeletemodalSlice';
// Import the formSlice reducer
// console.log(formSlice); 
// console.log(modalSlice)
const Store = configureStore({
    reducer: {
      modal: modalReducer,
      form: formReducer,
      editModal:editModalReducer,
      updateuser:updateuserReducer,
      deletemodal:deleteuserReducer

    }
  });

  
  export default Store;
