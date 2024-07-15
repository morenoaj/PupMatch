// auth.js
import Cookies from 'js-cookie';

export const setUserId = (userId) => {
  Cookies.set('userId', userId, { expires: 7, secure: true, sameSite: 'Strict' });
};

export const getUserId = () => {
  return Cookies.get('userId');
};

export const clearUserId = () => {
  Cookies.remove('userId');
};

export const loginUser = async (uid) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid })
    });
    if (!response.ok) {
      throw new Error('Error logging in user');
    }
    setUserId(uid);
    const data = await response.json();
    console.log('Login successful:', data);
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
