import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <form action="/auth/register">
        <div>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default App
