import { useGlobalContext } from "../Contexts/GlobalContext"
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import '../styles/animations.css'
import { useState, useEffect } from 'react';

const Notifications = () => {
  const { notificationData, showNotify } = useGlobalContext()
  const [animationClass, setAnimationClass] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showNotify) {
      setVisible(true);
      setAnimationClass('slide-in');
    } else {
      setAnimationClass('slide-out');
      setTimeout(() => setVisible(false), 300); // Attendi la fine dell'animazione prima di nascondere
    }
  }, [showNotify]);

  if (!visible) return null;

  return (
    <div className="relative justify-center items-center">
      <div className="w-[100vw] h-[100vh] absolute overflow-hidden">
        <div className={`fixed flex flex-col justify-center bottom-10 right-10 custom-bg-color-primary text-white rounded-2xl px-8 py-2 shadow-2xl transition-all z-999 ${animationClass}`}>
          <div className={`flex items-center pt-4 mb-[-1rem] pl-1 ${notificationData.type === "success" ? 'custom-teal-color' : 'text-red-400'}`}>
            {notificationData.type === "success" ? <FaCheckCircle /> : <MdError />}
            <span className="text-white font-bold text-xl pl-3">{notificationData.title}</span>  
          </div>
          <p className="text-center mt-4 pb-4">{notificationData.message}</p>
        </div> 
      </div>
    </div>
  )
}

export default Notifications