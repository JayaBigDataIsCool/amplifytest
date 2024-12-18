import { Amplify, Auth, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsConfig from './aws-exports';
import { useState, useEffect } from 'react';

Amplify.configure(awsConfig);

function App({ signOut, user }) {
  const [data, setData] = useState(null);

  const callSecureAPI = async () => {
    try {
      // Get the current session token
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      // Make authenticated API call
      const response = await API.get('MyAPI', '/your-endpoint', {
        headers: {
          Authorization: token
        }
      });
      
      setData(response);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello {user.username}</h1>
        <button onClick={callSecureAPI}>Call Secure API</button>
        <button onClick={signOut}>Sign out</button>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </header>
    </div>
  );
}

export default withAuthenticator(App);
