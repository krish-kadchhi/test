'use client'
import React, { createContext, useContext, useState } from 'react'

interface CartContextType {
    cart: any[]
    addItem: (title: string, price: number) => void
    quantity: number
    lastItem: string
    totalPrice: number | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartThingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<any[]>([])
    const [quantity, setQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState<number | null>(null)
    const [lastItem, setLastItem] = useState("")

    const addItem = (title: string, price: number) => {
        setLastItem(title)
        setTotalPrice(price)
        setQuantity((prev) => prev + 1)
        setCart((prev) => [...prev, { title, price }])
    }

    return (
        <CartContext.Provider value={{ cart, addItem, quantity, lastItem, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartThingsProvider')
    }
    return context
}
