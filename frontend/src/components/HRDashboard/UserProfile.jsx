const UserProfile = ({ name, role, avatarUrl }) => (
  <div className='bg-indigo-600 h-full rounded-r-3xl p-8 text-white'>
    <div className='w-32 h-32 bg-yellow-100 rounded-full mx-auto mb-4'>
      <img
        src={avatarUrl}
        alt={name}
        className='w-full h-full object-cover rounded-full'
      />
    </div>
    <h2 className='text-2xl font-bold text-center'>{name}</h2>
    <p className='text-center text-indigo-200'>{role}</p>
  </div>
);
export default UserProfile;
