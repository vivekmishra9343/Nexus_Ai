import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => (
  <div className='w-64 h-full bg-white p-4 flex flex-col'>
    <Logo />
    <nav className='mt-8 flex-grow'>
      <SidebarItem icon='grid' label='Overview' active />
      <SidebarItem icon='calendar' label='Schedule' />
      <SidebarItem icon='folder' label='Courses' />
      <SidebarItem icon='bar-chart' label='Statistic' />
      <SidebarItem icon='settings' label='Settings' />
    </nav>
    <SidebarItem icon={<IoIosLogOut />} label='Log out' />
  </div>
);
export default Sidebar;
