import {configureStore} from '@reduxjs/toolkit';
import memberReducer from './MemberSlice';

const store =configureStore({
reducer:{
    members:memberReducer,
},
});

export default store;