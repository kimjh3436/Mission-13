import { useNavigate } from "react-router-dom";
// import './Cart.css';
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext"; // importing the cart context to be able to add things to cart

// the cart page, shows all the items you have added to your cart and the quantity
function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = useCart(); // use cart object essentially, now we are importing aspects of it to be used
    return (
       <div>
            <h1>Your Cart</h1>
            <div>
                {/** Display a message if the cart is empty, otherwise show the cart items */}
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        <ul>
                            {cart.map((item: CartItem) => (
                                <li key={item.bookId}>
                                    {item.title} - Quantity: {item.quantity} Total Price: ${item.price * item.quantity}
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => removeFromCart(item.bookId)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {/** Calculate and display the Grand Total */}
                        <h3 className="mt-4">Grand Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
                    </div>
                )}
            </div>
            {/** Cart actions */}
            <button className="btn btn-danger me-2" onClick={() => clearCart()}>
                Clear Cart
            </button>
            <button className="btn btn-success me-2">Checkout</button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Continue Shopping
            </button>
        </div>
    );
}

export default Cart;