const Header = ({ name }) => (
  <div className='mb-8'>
    <h1 className='text-4xl font-bold mb-2'>HR Dashboard</h1>
    <p className='text-gray-500'>
      Welcome back, {name}! Your progress is really good. Keep it up
    </p>
  </div>
);
export default Header;
