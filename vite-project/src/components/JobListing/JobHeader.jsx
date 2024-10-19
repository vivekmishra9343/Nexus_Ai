const JobHeader = ({ title, company, website, phone, email, expiryDate }) => (
  <div className='flex justify-between items-center p-8'>
    <div className='flex items-center'>
      <img
        src='/path-to-company-logo.png'
        alt={company}
        className='w-[60px] h-[45px] rounded-full mr-4'
      />
      <div>
        <h1 className='text-2xl font-medium'>{title}</h1>
        <div className='flex items-center mt-2'>
          <span className='bg-[#ffeded] text-[#ff4e4e] px-3 py-1 rounded-full mr-2'>
            Featured
          </span>
          <span className='bg-[#e8f1ff] text-[#0065ff] px-3 py-1 rounded-full'>
            Full Time
          </span>
        </div>
        <div className='flex items-center mt-2'>
          <a href={website} className='text-[#474c54] mr-4'>
            {website}
          </a>
          <span className='text-[#474c54] mr-4'>{phone}</span>
          <span className='text-[#474c54]'>{email}</span>
        </div>
      </div>
    </div>
    <div className='text-right'>
      <p className='text-[#767f8c]'>
        Job expire in:{" "}
        <span className='text-[#e05050] font-medium'>{expiryDate}</span>
      </p>
      <div className='flex items-center mt-4'>
        <button className='bg-[#e7f0fa] p-4 rounded mr-4'>
          <img
            src='/path-to-bookmark-icon.png'
            alt='Bookmark'
            className='w-6 h-6'
          />
        </button>
        <button className='bg-[#0a65cc] text-white px-8 py-4 rounded flex items-center'>
          Apply now
          <img
            src='/path-to-arrow-icon.png'
            alt='Arrow'
            className='w-6 h-6 ml-2'
          />
        </button>
      </div>
    </div>
  </div>
);

export default JobHeader;
