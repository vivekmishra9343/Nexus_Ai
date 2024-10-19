import Logo from "../../components/signup/Logo";
const Header = () => (
  <header className='flex justify-between items-center p-4 border-b border-gray-200'>
    <Logo />
    <div className='flex items-center space-x-4'>
      <input
        type='text'
        placeholder='Search'
        className='px-3 py-1 bg-gray-100 rounded-full border border-gray-300 text-sm'
      />
      <select className='text-sm'>
        <option>English (united States)</option>
      </select>
      <button className='bg-black text-white px-4 py-2 rounded-lg text-sm'>
        Sign Up
      </button>
    </div>
  </header>
);
export default Header;
