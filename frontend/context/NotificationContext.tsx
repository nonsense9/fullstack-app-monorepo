"use client"
import React, { createContext, useContext, useState } from 'react';

interface Notification {
  id: string
  message: string
  type: string
}

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [ notifications, setNotifications ] = useState<Notification[]>([]);
  const handleNotification = (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [ ...prev, { id, message, type } ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 3000);
  };
  
  return (
    <NotificationContext.Provider value={ { handleNotification } }>
      { children }
      <div className="fixed top-4 right-4 space-y-2 z-50">
        { notifications.map((notif) => (
          <div
            key={ notif.id }
            className={ `p-4 rounded-lg shadow-lg text-white ${
              notif.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } animate-enter` }
          >
            { notif.message }
          </div>
        )) }
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
