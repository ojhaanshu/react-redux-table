import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
    name :'members',
    initialState:{
        memberList:[],
    },
    reducers:{
        setMembers:(state,action)=>{
            state.memberList =action.payload;
        },
        addMembers:(state,action)=>{
            state.memberList.push(action.payload);
        },
    },
});

export const {setMembers ,addMembers} = memberSlice.actions;
export default memberSlice.reducer;