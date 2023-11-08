import { createStore } from "redux";

const initialState = {
  isLoading: false,
  taskadded: false,
  taskdone: false
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

  return state
}

const store = createStore(reducer)

export default store