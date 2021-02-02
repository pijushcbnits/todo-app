import {
    GET_TODOSLIST_SUCCESS,
    GET_TODOSLIST_ERROR,
}from "./type"


import axios from 'axios';

export const getTodosList = ()=>{
        return (disPatch)=>{
            disPatch({
                type:GET_TODOSLIST_SUCCESS,
                payload:{showLoader:true}
            })
            axios({
                method: 'GET',
                url: `https://tiny-list.herokuapp.com/api/v1/users/110/tasks`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if(res.status === 200){
                        disPatch({
                            type:GET_TODOSLIST_SUCCESS,
                            payload:{data:res.data ? res.data : [] ,showLoader:false}
                        })
                    }else{
                        disPatch({
                            type:GET_TODOSLIST_ERROR,
                            payload:{msg:res.data.msg,showLoader:false}
                        })
                    }
                }).catch(err=>{
                    disPatch({
                        type:GET_TODOSLIST_ERROR,
                        payload:{msg:"Something went wrong",showLoader:false}
                    })
                })
        }
}

export const addTodosList = (data)=>{
    return (disPatch)=>{
        disPatch({
            type:GET_TODOSLIST_SUCCESS,
            payload:{showLoader:true}
        })
        axios({
            method: 'POST',
            url: `https://tiny-list.herokuapp.com/api/v1/users/110/tasks`,
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.status === 201){
                    
                    disPatch({
                        type:GET_TODOSLIST_SUCCESS,
                        payload:{data:res.data ? res.data : [] ,showLoader:false}
                    })
                }else{
                    disPatch({
                        type:GET_TODOSLIST_ERROR,
                        payload:{msg:res.data.msg,showLoader:false}
                    })
                }
            }).catch(err=>{
                disPatch({
                    type:GET_TODOSLIST_ERROR,
                    payload:{msg:"Something went wrong",showLoader:false}
                })
            })
    }
}