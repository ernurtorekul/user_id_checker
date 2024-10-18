'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  // Initializing user state with null
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Dynamically adding the Telegram widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?15';
    script.setAttribute('data-telegram-login', 'userCech_bot');  // Replace with your bot's username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', '/api/verifyTelegram');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    document.getElementById('telegram-login').appendChild(script);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      const userData = telegram.initDataUnsafe?.user;
      if (userData) {
        setUser(userData); // Set the user state with the fetched data
      }
      telegram.ready(); // Notify Telegram that the app is ready
    }
  }, []);

  return (
    <div>
      <h1>Telegram Mini App</h1>
      <div id="telegram-login"></div> {/* This is where the Telegram login widget will be rendered */}
      {user ? (
        <div>
          <p>Hello, {user.first_name} {user.last_name}!</p>
          <p>Your Telegram ID is {user.id}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
