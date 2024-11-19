import React from "react";

const Settings = () => {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>Settings</h1>

      <div className='space-y-6'>
        {/* Profile Settings */}
        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-lg font-semibold mb-4'>Profile Settings</h2>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Full Name
              </label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                defaultValue='John Doe'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                defaultValue='john@example.com'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Phone
              </label>
              <input
                type='tel'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                defaultValue='+1 234 567 890'
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-lg font-semibold mb-4'>Notification Settings</h2>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='font-medium'>Email Notifications</h3>
                <p className='text-sm text-gray-500'>
                  Receive email updates about your applications
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only peer'
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <h3 className='font-medium'>SMS Notifications</h3>
                <p className='text-sm text-gray-500'>
                  Receive text messages for important updates
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input type='checkbox' className='sr-only peer' />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-lg font-semibold mb-4'>Security Settings</h2>
          <div className='space-y-4'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
              Change Password
            </button>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>

      <div className='mt-6 flex justify-end space-x-4'>
        <button className='px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors'>
          Cancel
        </button>
        <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
