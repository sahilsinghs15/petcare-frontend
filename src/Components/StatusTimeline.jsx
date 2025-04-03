import { FaCircle, FaCheckCircle } from 'react-icons/fa';

const StatusTimeline = ({ currentStatus }) => {
    const statuses = ['Pending', 'Processed', 'Shipped', 'Delivered'];
    
    // If order is cancelled, show different timeline
    if (currentStatus === 'Cancelled') {
        return (
            <div className="flex items-center justify-center w-full py-4">
                <div className="flex items-center text-red-500">
                    <FaCircle className="w-4 h-4" />
                    <div className="mx-2 text-sm font-medium">Order Cancelled</div>
                </div>
            </div>
        );
    }

    const currentIndex = statuses.indexOf(currentStatus);

    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between w-full">
                {statuses.map((status, index) => (
                    <div key={status} className="flex flex-col items-center relative">
                        {/* Connector Line */}
                        {index < statuses.length - 1 && (
                            <div 
                                className={`absolute w-full h-1 top-3 left-1/2 ${
                                    index < currentIndex 
                                        ? 'bg-green-500' 
                                        : 'bg-gray-200'
                                }`}
                            />
                        )}
                        
                        {/* Status Icon */}
                        {index <= currentIndex ? (
                            <FaCheckCircle className="w-6 h-6 text-green-500 z-10 bg-white" />
                        ) : (
                            <FaCircle className="w-6 h-6 text-gray-200 z-10 bg-white" />
                        )}
                        
                        {/* Status Label */}
                        <span className={`mt-2 text-xs font-medium ${
                            index <= currentIndex 
                                ? 'text-green-500' 
                                : 'text-gray-400'
                        }`}>
                            {status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusTimeline;