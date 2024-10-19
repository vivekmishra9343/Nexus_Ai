import { FaChevronRight } from "react-icons/fa6";

const MeetingLinkInput = () => (
  <div className='bg-white p-6 rounded-xl'>
    <p className='text-center mb-4'>
      Paste the meeting link here for the candidates
    </p>
    <div className='flex items-center'>
      <input
        type='text'
        placeholder='Label'
        className='flex-grow p-2 border rounded-l-lg'
      />
      <button className='bg-gray-200 p-2 rounded-r-lg'>
        <FaChevronRight />
      </button>
    </div>
  </div>
);
export default MeetingLinkInput;
