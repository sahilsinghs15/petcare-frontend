import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../Redux/Slices/orderSlices';
import { FaCreditCard, FaMoneyBill, FaWallet } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items);
    
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!paymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        try {
            setLoading(true);
            
            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    price : item.product.price
                })),
                shippingAddress,
                paymentInfo: {
                    method: paymentMethod,
                    status: paymentMethod === 'COD' ? 'Unpaid' : 'Paid'
                }
            };

            await dispatch(createOrder(orderData)).unwrap();
            navigate('/');
            
        } catch (error) {
            toast.error(error.message || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="border-b pb-4 mb-4">
                        {cartItems.map(item => (
                            <div key={item.product._id} className="flex justify-between mb-2">
                                <span>{item.product.name} x {item.quantity}</span>
                                <span>₹{item.product.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span>₹{calculateTotal()}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    {/* Shipping Address */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Street</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={shippingAddress.street}
                                    onChange={handleAddressChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleAddressChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={shippingAddress.state}
                                    onChange={handleAddressChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={shippingAddress.zip}
                                    onChange={handleAddressChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={shippingAddress.country}
                                    onChange={handleAddressChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3 
                                ${paymentMethod === 'CreditCard' ? 'border-blue-500 bg-blue-50' : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="CreditCard"
                                    checked={paymentMethod === 'CreditCard'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <FaCreditCard className="text-xl" />
                                <span>Credit Card</span>
                            </label>
                            
                            <label className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3
                                ${paymentMethod === 'COD' ? 'border-blue-500 bg-blue-50' : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <FaMoneyBill className="text-xl" />
                                <span>Cash on Delivery</span>
                            </label>

                            <label className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3
                                ${paymentMethod === 'DigitalWallet' ? 'border-blue-500 bg-blue-50' : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="DigitalWallet"
                                    checked={paymentMethod === 'DigitalWallet'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <FaWallet className="text-xl" />
                                <span>Digital Wallet</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 text-white py-3 rounded-lg font-semibold
                            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        {loading ? 'Processing...' : `Pay ₹${calculateTotal()}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;