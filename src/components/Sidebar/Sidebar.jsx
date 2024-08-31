
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt ,newChat} = useContext(Context);

  const loadPrompt = async (prompt) => {
    if (typeof setRecentPrompt === 'function') {
      setRecentPrompt(prompt);
      await onSent(prompt);
    } else {
      console.error('setRecentPrompt is not a function');
    }
  };

  return (
    <div className='sidebar'>
      <div className='top'>
        <img
          className='menu'
          src={assets.menu_icon}
          alt='Menu'
          onClick={() => setExtended((prev) => !prev)}
        />

        <div  onClick={() =>newChat()} className='new-chat'>
          <img src={assets.plus_icon} alt='New Chat' />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className='recent'>
            <p className='recent-title'>Recent</p>
            {prevPrompts.map((prompt, index) => (
              <div
                onClick={() => loadPrompt(prompt)}
                className='recent-entry'
                key={index}
              >
                <img src={assets.message_icon} alt='Prompt' />
                <p>{prompt.slice(0, 18)}..</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='bottom'>
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon} alt='Help' />
          {extended && <p>Help</p>}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt='Activity' />
          {extended && <p>Activity</p>}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt='Settings' />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
