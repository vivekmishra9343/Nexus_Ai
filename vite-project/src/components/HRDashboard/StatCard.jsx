const StatCard = ({ icon, label, value, color }) => (
  <div className='bg-white rounded-xl p-4 flex items-center'>
    <div
      className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mr-4`}
    >
      {icon}
    </div>
    <div>
      <p className='text-gray-500 text-sm'>{label}</p>
      <p className='text-xl font-bold'>{value}</p>
    </div>
  </div>
);
export default StatCard;
