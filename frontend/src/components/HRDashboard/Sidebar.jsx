import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
import { IoIosLogOut } from "react-icons/io";
import {
  FaThLarge,
  FaCalendarAlt,
  FaFolder,
  FaChartBar,
  FaCog,
} from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className='w-64 h-full bg-white p-4 flex flex-col'>
    {/* Logo wrapped with a Link */}
    <Link to='/'>
      <Logo />
    </Link>

    {/* Navigation Items */}
    <nav className='mt-8 flex-grow'>
      <SidebarItem icon={<FaThLarge />} label='Overview' active />
      <SidebarItem icon={<FaCalendarAlt />} label='Schedule' />
      <SidebarItem icon={<FaFolder />} label='Courses' />
      <SidebarItem icon={<FaChartBar />} label='Statistic' />
      <SidebarItem icon={<FaCog />} label='Settings' />
    </nav>

    {/* Log out item */}
    <SidebarItem icon={<IoIosLogOut />} label='Log out' />
  </div>
);

export default Sidebar;
