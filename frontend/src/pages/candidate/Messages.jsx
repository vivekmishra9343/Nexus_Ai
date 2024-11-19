import React from "react";

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "HR Manager",
      company: "Tech Corp",
      lastMessage:
        "Thanks for your application! When would you be available for an interview?",
      time: "2:30 PM",
      unread: true,
    },
    // Add more conversations
  ];

  return (
    <div className='flex h-full'>
      {/* Conversations List */}
      <div className='w-1/3 border-r'>
        <div className='p-4 border-b'>
          <input
            type='search'
            placeholder='Search messages...'
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='overflow-y-auto'>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                conv.unread ? "bg-blue-50" : ""
              }`}
            >
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='font-semibold'>{conv.name}</h3>
                  <p className='text-sm text-gray-600'>
                    {conv.role} at {conv.company}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    {conv.lastMessage}
                  </p>
                </div>
                <span className='text-xs text-gray-500'>{conv.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col'>
        <div className='p-4 border-b'>
          <h2 className='font-semibold'>Sarah Johnson</h2>
          <p className='text-sm text-gray-600'>HR Manager at Tech Corp</p>
        </div>

        <div className='flex-1 overflow-y-auto p-4'>
          {/* Messages will go here */}
        </div>

        <div className='p-4 border-t'>
          <div className='flex space-x-4'>
            <input
              type='text'
              placeholder='Type your message...'
              className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
