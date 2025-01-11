
const DashboardCard = ({ icon, title, value, bgColor }) => {
    return (
        <div
            className={`flex items-center shadow-lg rounded-lg p-6 ${bgColor} w-full sm:w-auto lg:w-auto m-2`}
            style={{ minWidth: '200px' }} 
        >
            <div className="flex items-center justify-center bg-gray-200 rounded-full h-12 w-12 mr-4">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-600">{title}</h3>
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

export default DashboardCard