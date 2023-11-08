import { createStore } from "redux";

const initialState = {
  isLoading: false,
  taskadded: false
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
      taskadded: action.payload
    }
  }

  return state
}

const store = createStore(reducer)

export default store