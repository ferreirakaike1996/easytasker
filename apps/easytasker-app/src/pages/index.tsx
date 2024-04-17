import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter hook

const IndexPage: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

  // Redirect to the login page when the component mounts
  useEffect(() => {
    router.push('/Login'); // Navigate to the login page
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

  return null; // Render nothing, as the page will be redirected
};

export default IndexPage;
