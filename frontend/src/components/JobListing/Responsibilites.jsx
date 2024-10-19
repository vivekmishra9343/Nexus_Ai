// Responsibilities Component
const Responsibilities = ({ responsibilities }) => (
  <div className='p-8'>
    <h2 className='text-lg font-medium mb-4'>Responsibilities</h2>
    <ul className='list-disc pl-5'>
      {responsibilities.map((responsibility, index) => (
        <li key={index} className='text-[#5e6670] mb-2'>
          {responsibility}
        </li>
      ))}
    </ul>
  </div>
);
export default Responsibilities;
