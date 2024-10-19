const Header = () => (
  <header className='bg-[#667bc6]/75 h-[103px] flex items-center justify-between px-8'>
    <div className='flex items-center'>
      <img
        src='/path-to-nexusai-logo.png'
        alt='NexusAi Logo'
        className='w-[66px] h-[73.96px] mr-4'
      />
      <span className='text-black text-2xl font-medium'>NexusAi</span>
    </div>
    <nav className='flex items-center'>
      <div className='w-[72px] h-[58px] bg-white rounded-full flex items-center justify-center mr-4'>
        <img
          src='/path-to-notification-icon.png'
          alt='Notifications'
          className='w-12 h-[38.67px]'
        />
      </div>
      <button className='bg-[#15191f] text-white px-4 py-2 rounded-[20px] border-2 border-[#c4fdff] mr-4'>
        Dashboard
      </button>
      <button className='bg-white text-black px-4 py-2 rounded-[20px] border border-black mr-4'>
        Job Listing
      </button>
      <button className='bg-[#15191f] text-white px-4 py-2 rounded-[20px] border-2 border-[#c4fdff]'>
        Profile
      </button>
    </nav>
  </header>
);
export default Header;
