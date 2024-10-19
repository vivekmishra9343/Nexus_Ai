import Sidebar from "../components/HRDashboard/Sidebar";
import StatSection from "../components/HRDashboard/StatSection";
import MeetingLinkInput from "../components/HRDashboard/MeetingLinkInput";
import UserProfile from "../components/candidateDashboard/UserProfile";
import CandidatesList from "../components/HRDashboard/CandidatesList";
import Header from "../components/candidateDashboard/Header";

const HRDashboard = () => (
  <div className='flex h-screen bg-gray-100'>
    <Sidebar />
    <div className='flex-grow p-8 overflow-auto'>
      <Header name='Bella' />
      <div className='grid grid-cols-2 gap-8 mb-8'>
        <StatSection />
        <MeetingLinkInput />
      </div>
      <CandidatesList />
    </div>
    <UserProfile
      name='Irfan Ahsan'
      role='Middle UX/UI Designer'
      avatarUrl='/api/placeholder/150/150'
    />
  </div>
);

export default HRDashboard;
