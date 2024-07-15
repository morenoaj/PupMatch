import { getAuth } from 'firebase/auth';

const handleSubscriptionUpdate = async (subscriptionStatus, paymentDetails) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const idToken = await user.getIdToken();
    const subscriptionData = {
      subscriptionStatus: subscriptionStatus,
      paymentDetails: paymentDetails,
    };

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        console.log('Subscription updated successfully');
      } else {
        console.error('Error updating subscription');
      }
    } catch (error) {
      console.error('Error updating subscription', error);
    }
  }
};

export default handleSubscriptionUpdate;
