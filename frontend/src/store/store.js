import { createStore } from "redux";

const initialState = {
  isLoading: false,
  taskadded: false,
  taskdone: false,
  taskdeleted: false,
  remainder: false
}

const reducer = (state = initialState, action) => {

  if (action.type === 'loading') {
    return {
      ...state,
      isLoading: action.payload
    }
  }

  if (action.type === 'taskadded') {
    return {
      ...state,
      taskadded: !state.taskadded
    }
  }

  if (action.type === 'taskdone') {
    return {
      ...state,
      taskdone: !state.taskdone
    }
  }

  if(action.type === 'taskdeleted') {
    return {
      ...state,
      taskdeleted: !state.taskdeleted
    }
  }

  if(action.type === 'remainder') {
    return {
      ...state,
      remainder: action.payload
    }
  }

  return state
}

const store = createStore(reducer)

export default store