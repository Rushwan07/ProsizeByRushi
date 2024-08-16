import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [data, setData] = useState('')
    // const [isLoading, setIsLoading] = useState(null)
    // const { dispatch } = useAuthContext()

    const signup = async (firstname, lastname, email, password) => {
        // setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            // setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            setData("We have sended you a mail to verify your email")

            // update the auth context


            // update loading state
            // setIsLoading(false)
        }
    }

    return { signup, data, error  }
}