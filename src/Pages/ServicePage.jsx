import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProducts, fetchProducts, fetchProductsByQuery } from "../Redux/Slices/productSlices";
import { addToCart } from "../Redux/Slices/cartSlices"; 
import { useNavigate } from "react-router-dom";
import SearchResultPage from "../Components/SearchResultPage";
import { FaShoppingCart, FaSearch, FaMinus, FaPlus } from "react-icons/fa";
import toast from 'react-hot-toast';

const ServicePage = () => {
    const { loading } = useSelector((state) => state.productsList);
    const products = useSelector((state) => state.productsList.products || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [quantities, setQuantities] = useState({});

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        dispatch(clearProducts());

        if (searchQuery.trim()) {
            dispatch(fetchProductsByQuery(searchQuery));
            navigate("/products/fetchProductsByQuery");
        } else {
            setIsSearching(false);
            dispatch(fetchProducts());
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const quantity = quantities[productId] || 1;
            await dispatch(addToCart({ productId, quantity })).unwrap();
        } catch (error) {
            toast.error(error.message || 'Failed to add to cart');
        }
    };

    const updateQuantity = (productId, delta) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + delta)
        }));
    };

    useEffect(() => {
        if (!isSearching) {
            dispatch(clearProducts());
            dispatch(fetchProducts());
        }
    }, [dispatch, isSearching]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-md py-6 fixed top-0 left-0 right-0 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">Our Products</h1>
                        
                        {/* Search and Cart Section */}
                        <div className="flex items-center gap-4">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search products..."
                                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                    />
                                    <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        <FaSearch />
                                    </button>
                                </div>
                            </form>
                            
                            <button
                                onClick={() => navigate('/cart')}
                                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                            >
                                <FaShoppingCart className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-24 pb-12">
                {isSearching ? (
                    <SearchResultPage />
                ) : (
                    <div>
                        {/* Products Count */}
                        <div className="mb-8">
                            {!Array.isArray(products) || products.length === 0 ? (
                                <p className="text-gray-600 text-center text-lg">No products available.</p>
                            ) : (
                                <p className="text-gray-600 text-lg">Showing {products.length} products</p>
                            )}
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="relative">
                                        <img
                                            src={product.images[0].secure_url}
                                            alt={product.name}
                                            className="w-full h-64 object-cover rounded-t-lg"
                                        />
                                        {product.stock < 5 && (
                                            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                                                Low Stock
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                        
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                                            <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center border rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(product._id, -1)}
                                                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                                                >
                                                    <FaMinus className="text-gray-600" />
                                                </button>
                                                <span className="px-4 py-2 border-x">
                                                    {quantities[product._id] || 1}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(product._id, 1)}
                                                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                                                >
                                                    <FaPlus className="text-gray-600" />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(product._id)}
                                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicePage;