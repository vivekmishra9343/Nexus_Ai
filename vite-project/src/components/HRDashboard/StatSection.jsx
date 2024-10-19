import StatCard from "./StatCard";

const StatSection = () => (
  <div className='bg-yellow-100 p-6 rounded-xl grid grid-cols-2 gap-4'>
    <StatCard
      icon='👥'
      label='Interview Scheduled'
      value='5'
      color='bg-blue-500'
    />
    <StatCard
      icon='📄'
      label='Resume submitted'
      value='100'
      color='bg-purple-500'
    />
  </div>
);
export default StatSection;
