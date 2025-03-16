import React, { useState } from "react";
import { createAppointment } from "../Redux/Slices/appointmentSlices.js";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { FaUserCircle ,FaThumbsUp,FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isLoggedIn } = useSelector((state) => state.auth);
	const user = useSelector((state) => state.auth.data);
	const [appointmentData, setAppointmentData] = useState({
		petCategory: "",
		petName: "",
		appointmentDate: "",
		appointmentTime: "",
	});

	const dispatch = useDispatch();

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

	return (
		<div className='flex flex-col min-h-screen'>
			<Toaster position='top-right' />

			{/* Main Navigation */}
			<nav className='bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-50'>
				<div className='text-xl font-bold cursor-pointer'>PetCare</div>
				<div className='hidden md:flex items-center space-x-6'>
					<Link 
            to='/appointments'
            className='cursor-pointer hover:text-gray-300'>
						Appointments
					</Link>
					<span className='cursor-pointer hover:text-gray-300'>Services</span>
					<span className='cursor-pointer hover:text-gray-300'>Prices</span>
					<span className='cursor-pointer hover:text-gray-300'>About</span>
					<span className='cursor-pointer hover:text-gray-300'>Contact</span>
					{isLoggedIn ? (
						<div className='flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white'>
							<FaUserCircle className='text-2xl' />
							<span>{user?.fullName}</span>
						</div>
					) : (
						<div>
							<Link
								to='/login'
								className='cursor-pointer hover:text-gray-300'>
								Login
							</Link>
						</div>
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
				<div className='fixed top-16 right-0 w-64 bg-gray-800 text-white p-4 z-50'>
					<div className='flex flex-col space-y-4'>
						{isLoggedIn && (
							<div className='flex items-center space-x-2 mb-4'>
								<FaUserCircle className='text-2xl' />
								<span>{user.fullName}</span>
							</div>
						)}
						<span className='cursor-pointer hover:text-gray-300'>
							Appointments
						</span>
						<span className='cursor-pointer hover:text-gray-300'>Services</span>
						<span className='cursor-pointer hover:text-gray-300'>Prices</span>
						<span className='cursor-pointer hover:text-gray-300'>About</span>
						<span className='cursor-pointer hover:text-gray-300'>Contact</span>
						{!isLoggedIn && (
							<span className='cursor-pointer hover:text-gray-300'>Login</span>
						)}
					</div>
				</div>
			)}

			{/* Hero Section */}
			<div
				className='relative h-screen bg-cover bg-center'
				style={{ backgroundImage: "url('../Assets/background.png')" }}>
				<div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center'>
					<h1 className='text-5xl font-bold mb-4'>Best Pet Services</h1>
					<h2 className='text-3xl mb-4'>Pet Spa & Grooming</h2>
					<p className='max-w-2xl mb-8'>
						Providing exceptional care and comfort for your beloved pets with
						our premium grooming and spa services.
					</p>
					<button className='bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition'>
						Book Now
					</button>
				</div>
			</div>

			{/* Services & Appointment Section */}
			<div className='container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8'>
				{/* Appointment Form */}
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

				{/* Services */}
				<div className='grid grid-cols-2 gap-4'>
					{[
						{
							title: "Pet Boarding",
							desc: "Safe and comfortable stays for your pets",
							img: "../Assets/boarding.png",
						},
						{
							title: "Pet Feeding",
							desc: "Nutritious meals and feeding schedules",
							img: "../Assets/feeding.png",
						},
						{
							title: "Pet Grooming",
							desc: "Professional grooming and spa services",
							img: "../Assets/grooming.png",
						},
						{
							title: "Pet Training",
							desc: "Expert behavior training programs",
							img: "../Assets/training.png",
						},
					].map((service, index) => (
						<div
							key={index}
							className='bg-white p-4 rounded-lg shadow-md'>
							<h3 className='font-bold mb-2'>{service.title}</h3>
							<p className='text-gray-600'>{service.desc}</p>
							<img
								src={service.img}
								alt={service.title}
								className='w-full h-48 object-cover rounded-lg mt-4'
							/>
						</div>
					))}
				</div>
			</div>

			{/* About Us Section */}
			<div className='bg-gray-100 py-16'>
				<div className='container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center'>
					<div>
						<h2 className='text-3xl font-bold mb-4'>About Us</h2>
						<p className='text-gray-600 mb-4 font-semibold text-md'>
							At Pet-Care, we understand that your pets are cherished members of
							your family, and their well-being is your top priority. That's why
							we've dedicated ourselves to providing exceptional, personalized
							pet care services that go beyond the basics. We're not just a
							business; we're a team of passionate animal lovers committed to
							creating a safe, nurturing, and stimulating environment for your
							furry, feathered, or scaled companions. With years of collective
							experience and a deep understanding of animal behavior, we offer a
							comprehensive range of services, including reliable dog walking,
							attentive pet sitting, professional grooming, and specialized care
							tailored to individual needs. We believe in building strong,
							trusting relationships with both pets and their owners, ensuring
							clear communication, consistent care, and genuine affection in
							every interaction. Our team is fully trained, insured, and
							dedicated to upholding the highest standards of safety and
							professionalism. We strive to alleviate the stress and worry that
							comes with leaving your beloved pets, providing you with peace of
							mind knowing they are in capable and caring hands. We're committed
							to fostering a community of happy, healthy pets and their devoted
							owners, and we look forward to becoming your trusted partner in
							pet care."
						</p>
					</div>
					<div className='flex justify-between gap-4'>
						<div className='flex flex-col gap-2'>
							<img
								src='../Assets/birdFeeding.png'
								alt='About Us'
								className=' w-full h-48 object-cover rounded-lg mt-4'
							/>
							<img
								src='../Assets/catFeeding.png'
								alt='About Us'
								className=' w-full h-48 object-cover rounded-lg mt-4'
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<img
								src='../Assets/pets.png'
								alt='About Us'
								className=' w-full h-48 object-cover rounded-lg mt-4'
							/>
							<img
								src='../Assets/bunny.png'
								alt='About Us'
								className=' w-full h-48 object-cover rounded-lg mt-4'
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Pricing Section */}
			<div className='container mx-auto px-4 py-16'>
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

			{/* Team Section */}
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

			{/* Testimonials Section */}
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

			{/* Footer */}
			<footer className='bg-gray-800 text-white py-8'>
				<div className='container mx-auto px-4'>
					<div className='grid md:grid-cols-4 gap-8'>
						<div>
							<h3 className='font-bold mb-4'>PetCare</h3>
							<p>Your trusted partner in pet care services.</p>
						</div>
						<div>
							<h3 className='font-bold mb-4'>Contact</h3>
							<p>123 Pet Street</p>
							<p>Phone: (123) 456-7890</p>
							<p>Email: info@petcare.com</p>
						</div>
						<div>
							<h3 className='font-bold mb-4'>Services</h3>
							<ul>
								<li>Pet Boarding</li>
								<li>Pet Grooming</li>
								<li>Pet Training</li>
								<li>Veterinary Care</li>
							</ul>
						</div>
						<div>
							<h3 className='font-bold mb-4'>Follow Us</h3>
							{/* Add social media icons/links */}
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};
export default HomePage;
