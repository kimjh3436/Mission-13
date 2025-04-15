import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // importing the cart context to be able to add things to cart

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart(); //using the cart object
    const totalAmount = cart.reduce((total, item) => total +  item.price * item.quantity, 0); // This should be replaced with the actual total amount from your cart context or state.
    return (
        <div
        // lots of styling being added
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                padding: "8px 12px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                zIndex: 1000,
                width: "120px", // Set a fixed width to prevent it from expanding
                textAlign: "center", // Center-align the text
            }}
            onClick={() => navigate("/cart")}
        >
            🛒
            <strong>${totalAmount.toFixed(2)}</strong>
        </div>
    );
}

export default CartSummary;