const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center p-2 my-2 ${
      active ? "text-green-700" : "text-gray-600"
    }`}
  >
    {typeof icon === "string" ? <span className='mr-2'>{icon}</span> : icon}
    <span>{label}</span>
  </div>
);
export default SidebarItem;
