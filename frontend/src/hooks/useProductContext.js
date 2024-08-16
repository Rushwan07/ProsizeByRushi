import { ProductContext } from '../context/ProductContext'
import { useContext } from 'react'

export const useProductContext = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }

    return context
}