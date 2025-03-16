import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAppointments, deleteAppointment } from '../Redux/Slices/appointmentSlices';
import { FaTrash, FaUserClock, FaCheck } from 'react-icons/fa';

function AppointmentsPage() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.appointments);
    const appointments = useSelector((state) => state.appointments.appointments || []);

    useEffect(() => {
        dispatch(getMyAppointments());
    }, [dispatch]);

    const handleCancelAppointment = (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            dispatch(deleteAppointment(appointmentId));
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>;
    }

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
            {!Array.isArray(appointments) || appointments.length === 0 ? (
                <p className="text-gray-600">No appointments found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments.map((appointment) => (
                        <div key={appointment._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold">{appointment.petOwner}</h2>
                                    <p className="text-gray-600">Time: {appointment.petName}</p>
                                    <p className="text-gray-600">Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                                    <p className="text-gray-600">Time: {appointment.appointmentTime}</p>
                                    <p className="text-gray-600">Status: {appointment.status === "Pending" ? <FaUserClock/> : <FaCheck/>}</p>
                                </div>
                                <button 
                                    onClick={() => handleCancelAppointment(appointment._id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                    title="Cancel Appointment"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AppointmentsPage;