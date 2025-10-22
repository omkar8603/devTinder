import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addFeed : (state, action) =>{
             return action.payload;
        },
        removeFeed : (state, action) => null,
        updateFeed : (state, action) => {
           
            const exist = state.some(user => user._id === action.payload)
          
            if (exist && action.payload){
               return state.filter((req) => req._id !== action.payload)
            }
            
        }
    }
})

export const {addFeed, removeFeed, updateFeed}  = feedSlice.actions
export default feedSlice.reducer;