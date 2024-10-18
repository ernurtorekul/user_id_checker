import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      const user = telegram.initDataUnsafe?.user;
      if (user) {
        setUser(user);
      }
      telegram.ready(); // Notify Telegram that the app is ready
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      const initData = telegram.initData;
  
      fetch('/api/verifyTelegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            console.log('User data is valid');
          } else {
            console.log('User data is invalid');
          }
        });
    }
  }, []);
  

  return (
    <div>
      <h1>Telegram Mini App</h1>
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
