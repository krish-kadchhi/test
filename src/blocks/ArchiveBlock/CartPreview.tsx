'use client'
import React from 'react'
import { useCart } from '@/providers/CartThings'

export const CartPreview: React.FC = () => {
    const { cart, quantity } = useCart()

    const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0)

    return (
        <div className="flex flex-col w-full h-full p-4 overflow-y-auto bg-card">
            <h3 className="font-bold text-lg mb-2 border-b pb-1 flex justify-between">
                <span>Cart</span>
                <span className="text-sm font-normal text-muted-foreground">{quantity} items</span>
            </h3>
            {cart.length > 0 ? (
                <div className="flex flex-col h-full">
                    <ul className="flex-1 space-y-2 overflow-y-auto pr-2">
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-start text-sm border-b border-border/30 pb-2 last:border-0 last:pb-0">
                                <span className="truncate mr-2 leading-tight" title={item.title}>{item.title}</span>
                                <span className="font-medium shrink-0">${item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 pt-2 border-t font-bold flex justify-between">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground italic text-sm text-center">Your cart is empty</p>
                </div>
            )}
        </div>
    )
}
