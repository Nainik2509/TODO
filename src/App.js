import React, { useEffect, useReducer } from 'react'
import axios from 'axios';

import './App.css';

const initialState = {
  loading: true,
  error: "",
  todos: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        loading: false,
        error: "",
        todos: action.payload
      }
    case 'SET_ERROR':
      return {
        loading: false,
        error: "There are some errors",
        todos: []
      }
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        dispatch({ type: 'SET_DATA', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' });
      })
  }, [])

  const listmarkup = (
    <ul>
      {state.todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  )

  return (
    <div className="App">
      {state.loading ? 'Loading' : (state.error ? state.error : listmarkup)}
    </div>
  );
}

export default App;
