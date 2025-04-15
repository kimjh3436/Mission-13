import { CartItem } from "../types/CartItem";  // importing the cartitem interface from the types folder
import { useState, ReactNode, useContext, createContext } from "react";

// cart context interface, essentially an object, stores an array of cart items, and then has functions for adding, removing and clearing the items from the cart.
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
};

// creating the cart context, using the cartContext hook
const CartContext = createContext<CartContextType | undefined>(undefined); // setting it to undefined by default

export const CartProvider = ({children } : {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.bookId === item.bookId);

            if (existingItem) {
                // Update the existing item's quantity
                return prevCart.map((cartItem) =>
                    cartItem.bookId === item.bookId
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity } // updating the quantity of the item in the cart
                        : cartItem
                );
            } else {
                // Add the new item to the cart
                return [...prevCart, item];
            }
        });
    };
    const removeFromCart = (bookId: number) => {
        // filtering out an item that has been removed from the cart, takes the book id and then filters the cart array to remove the item with that book id.
        setCart((prevCart) => prevCart.filter((item) => item.bookId !== bookId));
    };

    const clearCart = () => {
        setCart([]); // setting the cart to an empty array. 
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
    
};

// useCart hook that we created to use the cart context in other components.
export const useCart = () => {
    const context = useContext(CartContext); // this could cause errors 
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};