import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCartItem } from "../Redux/Slices/cartSlices";
import toast from 'react-hot-toast';

const CartPage = () => {
    const items = useSelector((state) => state.cart.items || []);
    const { loading } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        const initialQuantities = {};
        items.forEach(item => {
            if (item && item.product) {
                initialQuantities[item.product._id] = item.quantity;
            }
        });
        setQuantities(initialQuantities);
    }, [items]);

    const handleRemoveCart = async(productId) =>{
        dispatch(removeFromCart(productId));
    }

    const handleUpdateCart = async (productId) => {
        const quantity = quantities[productId];
        try {
            await dispatch(updateCartItem({ productId, quantity })).unwrap();
            dispatch(getCart()); // Refresh cart data
        } catch (error) {
            toast.error(error.message || 'Failed to update cart');
        }
    };

    const updateQuantity = (productId, delta) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + delta)
        }));
    };

    const handleOrder = (productId) => {
        // Implement order functionality
        navigate(`/checkout/${productId}`);
    };


    const isValidCartItem = (item) => {
        return item && 
               item.product && 
               item.product.images && 
               Array.isArray(item.product.images) && 
               item.product.images.length > 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
                
                {!Array.isArray(items) || items.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-xl">Your cart is empty</p>
                        
                        <button 
                            onClick={() => navigate('/products')}
                            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="grid gap-4">
                                {items.map((item) => (
                                    isValidCartItem(item) && (
                                        <div
                                            key={item.product._id}
                                            className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-4"
                                        >
                                            <img
                                                src={item.product.images[0].secure_url}
                                                alt={item.product.name}
                                                className="w-32 h-32 object-cover rounded-md"
                                            />
                                            <div className="flex-grow">
                                                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                                <p className="text-gray-600">Price: ₹{item.product.price}</p>
                                                
                                                <div className="flex items-center gap-4 mt-4">
                                                    <button
                                                        onClick={() => updateQuantity(item.product._id, -1)}
                                                        className="bg-gray-200 px-3 py-1 rounded-md"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{quantities[item.product._id] || item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product._id, 1)}
                                                        className="bg-gray-200 px-3 py-1 rounded-md"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleUpdateCart(item.product._id)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveCart(item.product._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                                >
                                                    Delete Cart
                                                </button>
                                                <button
                                                    onClick={() => navigate('/payment')}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;