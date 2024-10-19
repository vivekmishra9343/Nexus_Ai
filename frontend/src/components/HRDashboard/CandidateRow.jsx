const CandidateRow = ({ name, subtext, date, score, status, resumeLink }) => (
  <div className='flex items-center justify-between py-2'>
    <div className='flex items-center'>
      <div className='w-10 h-10 bg-gray-300 rounded-lg mr-2'></div>
      <div>
        <p className='font-semibold'>{name}</p>
        <p className='text-sm text-gray-500'>{subtext}</p>
      </div>
    </div>
    <div>{date}</div>
    <div>{score}</div>
    <div
      className={`px-2 py-1 rounded-lg ${
        status === "REJECTED" ? "bg-red-100" : "bg-yellow-100"
      }`}
    >
      {status}
    </div>
    <a href={resumeLink} className='text-blue-500 underline'>
      Link
    </a>
  </div>
);
export default CandidateRow;
