import { combineReducers } from 'redux' 
import TodoListReducer from './TodoList/reducer';

const rootReducer = combineReducers({
    
    TodoList: TodoListReducer
})

export default rootReducer