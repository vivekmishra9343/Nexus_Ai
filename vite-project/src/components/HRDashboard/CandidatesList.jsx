import CandidateRow from "./CandidateRow";

const CandidatesList = () => (
  <div>
    <div className='flex justify-between items-center mb-4'>
      <h2 className='text-2xl font-bold'>Candidates List</h2>
      <button className='text-yellow-500 font-semibold'>View all &gt;</button>
    </div>
    <div className='grid grid-cols-5 text-gray-500 mb-2'>
      <div>Course name</div>
      <div>Current stage</div>
      <div>score</div>
      <div>Type</div>
      <div>Resume</div>
    </div>
    <CandidateRow
      name='Akash jain'
      subtext='Bruno Scott'
      date='Feb 12'
      score='4.8'
      status='REJECTED'
      resumeLink='#'
    />
    <CandidateRow
      name='rishi gupta'
      subtext='Bruno Scott'
      date='Feb 14'
      score='4.6'
      status='PENDING'
      resumeLink='#'
    />
  </div>
);
export default CandidatesList;
