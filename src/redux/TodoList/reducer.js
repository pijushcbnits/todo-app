import {
    GET_TODOSLIST_SUCCESS,
    GET_TODOSLIST_ERROR,
    GET_TODOSLIST_LOADER
}from "./type"

const initialState={
    showLoader:false,
    msg:'',
    todosList:[]
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_TODOSLIST_LOADER:
            return{
                ...state,
                showLoader:action.payload.showLoader
            }
        case GET_TODOSLIST_SUCCESS:
            return{
                ...state,
                showLoader:action.payload.showLoader,
                todosList:action.payload.data
            }

        case GET_TODOSLIST_ERROR:
            return{
                ...state,
                showLoader:action.payload.showLoader,
                msg:action.payload.msg,
            }
            default: return state;
    }
}

export default reducer;