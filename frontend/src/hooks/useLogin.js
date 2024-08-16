import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error2, setError] = useState(null)
  const [data2, setData2] = useState("")
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    // setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
    //   setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {

      localStorage.setItem('user', JSON.stringify(json))


      dispatch({type: 'LOGIN', payload: json})

      setData2("Logedin successfully")
    }
  }

  return { login, data2, error2 }
}
