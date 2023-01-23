import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
     value :   localStorage.getItem("favoriteVideo") ? JSON.parse(localStorage.getItem("favoriteVideo")) : [],
     loading : false
}




export const favoriteSlice = createSlice({
    name : 'favoriteVideo',
    initialState,
    reducers : {
        addVideo : (state , action ) => {

      
            console.log(action.payload.id);

                const newItem = action.payload
                const duplicate = findItem(state.value , newItem)
                if(duplicate.length > 0) {
                    state.value = delItem(state.value , newItem)                 
                    state.value = [
                       ...state.value,
                       {
                          ...newItem
                       }
                    ]
                } else {
            
                       state.value = [
                        ...state.value,

                        {
                            ...newItem
                        }
                           
                       ]
                 
                }
                localStorage.setItem("favoriteVideo" ,  JSON.stringify(state.value))
            },
        

          
        deleteVideo : (state , action) => {
            console.log(action.payload)
               const deleteItem = action.payload
               state.value = delItem(state.value , deleteItem)
               localStorage.setItem("favoriteVideo" ,  JSON.stringify(state.value))
        }

    }
     
})


export const {addVideo , deleteVideo } = favoriteSlice.actions
export default favoriteSlice.reducer
const findItem = (arr , item) => arr.filter(e => e.id === item.id)
const delItem = (arr , item) => arr.filter(e => e.id !== item.id)

const sortItem = (arr) => arr.sort((a,b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))