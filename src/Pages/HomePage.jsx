import React, { useState, useRef, useEffect } from "react";
import { createAppointment } from "../Redux/Slices/appointmentSlices.js";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { 
    FaUserCircle, 
    FaThumbsUp, 
    FaThumbsDown, 
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedin,
    FaArrowRight,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
	FaSignOutAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/authSlices.js";

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.auth.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Refs for scroll sections
    const aboutRef = useRef(null);
    const pricesRef = useRef(null);
    const contactRef = useRef(null);
    const servicesRef = useRef(null);

    const [appointmentData, setAppointmentData] = useState({
        petCategory: "",
        petName: "",
        appointmentDate: "",
        appointmentTime: "",
    });

    // Scroll handler
    const scrollToSection = (elementRef) => {
        setMenuOpen(false); // Close mobile menu when navigating
        elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

	const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };


    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        dispatch(createAppointment(appointmentData));
        setAppointmentData({
            petCategory: "",
            petName: "",
            appointmentDate: "",
            appointmentTime: "",
        });
    };

    const handleAppointmentChange = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value,
        });
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('.mobile-menu')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Toaster position='top-right' />

            {/* Navigation */}
            <nav className='bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-50'>
                <div className='text-2xl font-bold cursor-pointer flex items-center gap-2'>
                    <img src="../Assets/logo.png" alt="PetCare" className="h-8 w-8 border-2 rounded-lg" />
                    PetCare
                </div>
                <div className='hidden md:flex items-center space-x-6'>
                    <Link to='/appointments' className='nav-link'>
                        Appointments
                    </Link>
                    <Link to='/products' className='nav-link'>
                        Products
                    </Link>
                    <Link to='/orders' className='nav-link'>
                        Orders
                    </Link>
                    <button onClick={() => scrollToSection(servicesRef)} className='nav-link'>
                        Services
                    </button>
                    <button onClick={() => scrollToSection(pricesRef)} className='nav-link'>
                        Prices
                    </button>
                    <button onClick={() => scrollToSection(aboutRef)} className='nav-link'>
                        About
                    </button>
                    <button onClick={() => scrollToSection(contactRef)} className='nav-link'>
                        Contact
                    </button>
                    {isLoggedIn ? (
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
								<FaUserCircle className="text-2xl text-blue-400" />
								<span className="font-medium">{user?.fullName.toUpperCase()}</span>
							</div>
							<button 
								onClick={handleLogout}
								className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
							>
								<FaSignOutAlt />
								<span>Logout</span>
							</button>
						</div>
					) : (
						<Link 
							to="/login" 
							className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
						>
							<FaUserCircle />
							<span>Login</span>
						</Link>
					)}
                </div>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className='md:hidden text-2xl'>
                    ☰
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className='fixed top-16 right-0 w-64 bg-gray-800 text-white p-4 z-50 mobile-menu'>
                    <div className='flex flex-col space-y-4'>
                        {isLoggedIn && (
                            <div className='flex items-center space-x-2 mb-4 pb-4 border-b border-gray-700'>
                                <FaUserCircle className='text-2xl' />
                                <span>{user?.fullName}</span>
                            </div>
                        )}
                        <Link to='/appointments' className='mobile-nav-link'>
                            Appointments
                        </Link>
                        <Link to='/products' className='mobile-nav-link'>
                            Products
                        </Link>
                        <Link to='/orders' className='mobile-nav-link'>
                            Orders
                        </Link>
                        <button onClick={() => scrollToSection(servicesRef)} className='mobile-nav-link text-left'>
                            Services
                        </button>
                        <button onClick={() => scrollToSection(pricesRef)} className='mobile-nav-link text-left'>
                            Prices
                        </button>
                        <button onClick={() => scrollToSection(aboutRef)} className='mobile-nav-link text-left'>
                            About
                        </button>
                        <button onClick={() => scrollToSection(contactRef)} className='mobile-nav-link text-left'>
                            Contact
                        </button>
                        {!isLoggedIn && (
                            <Link to='/login' className='mobile-nav-link'>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Rest of your existing sections with refs added */}
            {/* Hero Section */}
            <div
                className='relative h-screen bg-cover bg-center'
                style={{ backgroundImage: "url('../Assets/background.png')" }}>
                <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center'>
                    <h1 className='text-6xl font-bold mb-4 animate-fadeIn'>Best Pet Services</h1>
                    <h2 className='text-3xl mb-4 animate-slideUp'>Pet Spa & Grooming</h2>
                    <p className='max-w-2xl mb-8 text-lg animate-slideUp delay-100'>
                        Providing exceptional care and comfort for your beloved pets with
                        our premium grooming and spa services.
                    </p>
                    <button 
                        onClick={() => scrollToSection(servicesRef)}
                        className='bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition transform hover:scale-105 animate-bounce'
                    >
                        Explore Our Services
                    </button>
                </div>
            </div>

			<div className='bg-white rounded-lg shadow-lg p-6'>
                    <h2 className='text-2xl font-bold mb-6'>Book an Appointment</h2>
                    <form onSubmit={handleAppointmentSubmit}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 mb-2'>Pet Category</label>
                            <select
                                name='petCategory'
                                value={appointmentData.petCategory}
                                onChange={handleAppointmentChange}
                                className='w-full p-2 border rounded'
                                required>
                                <option value=''>Select Category</option>
                                <option value='dog'>Dog</option>
                                <option value='cat'>Cat</option>
                                <option value='bird'>Bird</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 mb-2'>Pet Name</label>
                            <input
                                type='text'
                                name='petName'
                                value={appointmentData.petName}
                                onChange={handleAppointmentChange}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 mb-2'>
                                Appointment Date
                            </label>
                            <input
                                type='date'
                                name='appointmentDate'
                                value={appointmentData.appointmentDate}
                                onChange={handleAppointmentChange}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 mb-2'>
                                Appointment Time
                            </label>
                            <input
                                type='time'
                                name='appointmentTime'
                                value={appointmentData.appointmentTime}
                                onChange={handleAppointmentChange}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
                            Book Appointment
                        </button>
                    </form>
                </div>
            {/* Services Section */}
			<div ref={servicesRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
						<div className="w-24 h-1 bg-blue-500 mx-auto"></div>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							We provide comprehensive care services for your beloved pets, ensuring their health, happiness, and well-being
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								title: "Pet Boarding",
								desc: "Safe and comfortable stays for your pets with 24/7 care and attention",
								img: "../Assets/boarding.png",
								icon: "🏠",
								color: "bg-blue-50 text-blue-600",
							},
							{
								title: "Pet Feeding",
								desc: "Customized nutritious meals and regular feeding schedules",
								img: "../Assets/feeding.png",
								icon: "🍽️",
								color: "bg-green-50 text-green-600",
							},
							{
								title: "Pet Grooming",
								desc: "Professional grooming services to keep your pets clean and healthy",
								img: "../Assets/grooming.png",
								icon: "✨",
								color: "bg-purple-50 text-purple-600",
							},
							{
								title: "Pet Training",
								desc: "Expert behavior training programs for better pet companionship",
								img: "../Assets/training.png",
								icon: "🎯",
								color: "bg-orange-50 text-orange-600",
							},
						].map((service, index) => (
							<div
								key={index}
								className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
							>
								<div className="relative h-48 overflow-hidden">
									<img
										src={service.img}
										alt={service.title}
										className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
									<span className="absolute top-4 right-4 text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
										{service.icon}
									</span>
								</div>
								
								<div className="p-6">
									<div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${service.color}`}>
										{service.title}
									</div>
									<p className="text-gray-600 leading-relaxed">
										{service.desc}
									</p>
									<div className="mt-4 flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors cursor-pointer">
										<span>Learn More</span>
										<FaArrowRight className="ml-2 text-sm" />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

            {/* About Section */}
            <div ref={aboutRef} className='bg-gray-100 py-16'>
				<div ref={aboutRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
					<div className="container mx-auto px-4">
						<div className="text-center mb-12">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
							<div className="w-24 h-1 bg-blue-500 mx-auto"></div>
						</div>
						
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div className="space-y-6">
								<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
									<h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h3>
									<p className="text-gray-600 leading-relaxed">
										At Pet-Care, we understand that your pets are cherished family members. 
										We're dedicated to providing exceptional, personalized care that goes beyond basics.
									</p>
								</div>

								<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
									<h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Expertise</h3>
									<div className="grid grid-cols-2 gap-4">
										<div className="flex items-center space-x-2">
											<svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
											</svg>
											<span>Professional Grooming</span>
										</div>
										<div className="flex items-center space-x-2">
											<svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
											</svg>
											<span>Pet Training</span>
										</div>
										<div className="flex items-center space-x-2">
											<svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
											</svg>
											<span>Veterinary Care</span>
										</div>
										<div className="flex items-center space-x-2">
											<svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
											</svg>
											<span>Pet Boarding</span>
										</div>
									</div>
								</div>

								<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
									<h3 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Us</h3>
									<p className="text-gray-600 leading-relaxed">
										Our team of passionate animal lovers is committed to creating a safe, 
										nurturing environment for your pets. With years of experience and 
										dedication to excellence, we ensure your pets receive the best care possible.
									</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-4">
									<img
										src="../Assets/birdFeeding.png"
										alt="Pet Care"
										className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
									/>
									<img
										src="../Assets/catFeeding.png"
										alt="Pet Care"
										className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="space-y-4 mt-8">
									<img
										src="../Assets/pets.png"
										alt="Pet Care"
										className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
									/>
									<img
										src="../Assets/bunny.png"
										alt="Pet Care"
										className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>

            {/* Pricing Section */}
            <div ref={pricesRef} className='container mx-auto px-4 py-16'>
                <div className='container mx-auto px-4 ' id="prices">
					<h2 className='text-3xl font-bold text-center mb-12'>
						Our Pricing Plans
					</h2>
					<div className='grid md:grid-cols-3 gap-8'>
						{[
							{ plan: "Basic", price: "$29", 
						features: {
							"Feeding": <FaThumbsUp/>,
							"Boarding": <FaThumbsUp/>,
							"Spa & Grooming": <FaThumbsDown/>,
							"Veterinary Medicine": <FaThumbsDown/>
						}
						},
									{
										plan: "Standard",
										price: "$49",
										features: {
							"Feeding": <FaThumbsUp/>,
							"Boarding": <FaThumbsUp/>,
							"Spa & Grooming": <FaThumbsUp/>,
							"Veterinary Medicine": <FaThumbsDown/>
						}
									},
									{
										plan: "Premium",
										price: "$79",
										features: {
							"Feeding": <FaThumbsUp/>,
							"Boarding": <FaThumbsUp/>,
							"Spa & Grooming": <FaThumbsUp/>,
							"Veterinary Medicine": <FaThumbsUp/>
						}
							},
						].map((pricing, index) => (
							<div
								key={index}
								className='bg-white rounded-lg shadow-lg overflow-hidden'>
								<div className='bg-blue-500 text-white p-4'>
									<h3 className='font-bold text-xl'>{pricing.plan}</h3>
									<p className='text-3xl font-bold'>{pricing.price}</p>
					
									{
									Object.entries(pricing.features).map(([feature, status], index) => (
										<div key={index} className='flex justify-between p-2 border-b'>
										<span>{feature}</span>
										<span>{status}</span>
										</div>
									))
									}

								</div>
							</div>
						))}
					</div>
				</div>
            </div>

			<div className='bg-gray-100 py-16'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-12'>Our Team</h2>
                    <div className='grid md:grid-cols-4 gap-8'>
                        {[
                            { name: "Sara James", role: "Veterinarian" , img: "../Assets/team/sara.png"},
                            { name: "Melina Smith", role: "Pet Groomer" , img: "../Assets/team/melina.png"},
                            { name: "Yuria Johnson", role: "Trainer" , img: "../Assets/team/yuria.png"},
                            { name: "Alia Wilson", role: "Care Specialist", img: "../Assets/team/alia.png"},
                        ].map((member, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-lg shadow-lg p-4 text-center'>
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className='w-full h-48 object-cover rounded-lg mb-4'
                                />
                                <h3 className='font-bold'>{member.name}</h3>
                                <p className='text-gray-600'>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

			<div className='container mx-auto px-4 py-16'>
                <h2 className='text-3xl font-bold text-center mb-12'>
                    What Our Clients Say
                </h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    {[
                        {
                            name: "Alice Brown",
                            role: "Dog Owner",
                            text: "Amazing service and care for my pet!",
              img: "../Assets/testimonials/alice.png"
                        },
                        {
                            name: "Jimmy White",
                            role: "Dog Owner",
                            text: "Professional and friendly staff.",
              img: "../Assets/testimonials/jimmy.png"
                        },
                        {
                            name: "Maria Green",
                            role: "Pet Parent",
                            text: "Best pet care service in town!",
              img: "../Assets/testimonials/maria.png"
                        },
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className='bg-white rounded-lg shadow-lg p-6'>
                            <div className='flex items-center mb-4'>
                                <img
                                    src={testimonial.img}
                                    alt={testimonial.name}
                                    className='w-12 h-12 rounded-full mr-4'
                                />
                                <div>
                                    <h3 className='font-bold'>{testimonial.name}</h3>
                                    <p className='text-gray-600'>{testimonial.role}</p>
                                </div>
                            </div>
                            <p className='text-gray-700'>{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Contact Section */}
            <div ref={contactRef} className='bg-white py-16'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-12'>Get in Touch</h2>
                    <div className='grid md:grid-cols-2 gap-8'>
                        <div className='bg-gray-50 p-8 rounded-lg shadow-lg'>
                            <form className='space-y-4'>
                                <div>
                                    <label className='block text-gray-700 mb-2'>Name</label>
                                    <input
                                        type='text'
                                        className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                        placeholder='Your name'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 mb-2'>Email</label>
                                    <input
                                        type='email'
                                        className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                                        placeholder='Your email'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 mb-2'>Message</label>
                                    <textarea
                                        className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32'
                                        placeholder='Your message'
                                    ></textarea>
                                </div>
                                <button
                                    type='submit'
                                    className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105'
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                        <div className='space-y-6'>
                            <div className='bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
                                <div className='flex items-center gap-4'>
                                    <FaMapMarkerAlt className='text-3xl text-blue-500' />
                                    <div>
                                        <h3 className='font-bold text-xl'>Visit Us</h3>
                                        <p className='text-gray-600'>123 Pet Street, City Name</p>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
                                <div className='flex items-center gap-4'>
                                    <FaPhoneAlt className='text-3xl text-blue-500' />
                                    <div>
                                        <h3 className='font-bold text-xl'>Call Us</h3>
                                        <p className='text-gray-600'>(123) 456-7890</p>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
                                <div className='flex items-center gap-4'>
                                    <FaEnvelope className='text-3xl text-blue-500' />
                                    <div>
                                        <h3 className='font-bold text-xl'>Email Us</h3>
                                        <p className='text-gray-600'>info@petcare.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className='bg-gray-800 text-white py-12'>
                <div className='container mx-auto px-4'>
                    <div className='grid md:grid-cols-4 gap-8'>
                        <div>
                            <h3 className='font-bold text-xl mb-4'>PetCare</h3>
                            <p className='text-gray-400'>Your trusted partner in pet care services.</p>
                            <div className='flex space-x-4 mt-4'>
                                <FaFacebook className='text-2xl hover:text-blue-500 cursor-pointer' />
                                <FaTwitter className='text-2xl hover:text-blue-400 cursor-pointer' />
                                <FaInstagram className='text-2xl hover:text-pink-500 cursor-pointer' />
                                <FaLinkedin className='text-2xl hover:text-blue-600 cursor-pointer' />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;