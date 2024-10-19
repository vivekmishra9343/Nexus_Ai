import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Logo = () => (
  <div className='flex items-center p-4'>
    <Link to='/'>
      <img src={logo} alt='NexusAi Logo' className='h-8 w-8' />
    </Link>
  </div>
);

export default Logo;
