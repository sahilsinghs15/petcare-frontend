import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelOrder, getUserOrders } from "../Redux/Slices/orderSlices";
import { FaTruck, FaMoneyBillWave, FaMapMarkerAlt, FaClock, FaBan } from "react-icons/fa";
import StatusTimeline from "../Components/StatusTimeline";

const OrdersPage = () => {
    const { orders, loading } = useSelector((state) => state.orders);
    const user = useSelector((state) => state.auth.data);
    const {isLoggedIn} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCancelOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                await dispatch(cancelOrder(orderId)).unwrap();
                dispatch(getUserOrders()); // Refresh orders after cancellation
            } catch (error) {
                toast.error(error.message || 'Failed to cancel order');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Welcome {isLoggedIn ? (user.fullName).toUpperCase() : "Guest"}!
                </h1>

                {!Array.isArray(orders) || orders.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-xl mb-4">You haven't ordered anything yet!</p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-50 p-4 border-b">
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Order ID</p>
                                                <p className="font-medium">{order._id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Order Date</p>
                                                <p className="font-medium">{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>
                                        <StatusTimeline currentStatus={order.orderStatus}/>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="p-4">
                                    {/* Order Items */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold mb-3">Order Items</h3>
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center mb-2">
                                                <div>
                                                    <p className="font-medium">Product ID: {item.product}</p>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Info Grid */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Shipping Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-blue-500" />
                                                <h3 className="font-semibold">Shipping Address</h3>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <p>{order.shippingAddress.street}</p>
                                                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                                <p>{order.shippingAddress.zip}, {order.shippingAddress.country}</p>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <FaMoneyBillWave className="text-green-500" />
                                                <h3 className="font-semibold">Payment Details</h3>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <p>Method: {order.paymentInfo.method}</p>
                                                <p>Status: {order.paymentInfo.status}</p>
                                                <p className="font-semibold text-lg">Total: ₹{order.totalPrice}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 border-t w-48">
                                            {order.orderStatus === 'Pending' && (
                                                <button
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    className="flex items-center justify-center gap-2 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                                >
                                                    <FaBan />
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;