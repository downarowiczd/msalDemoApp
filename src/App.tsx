import './app.css'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './auth/auth-config';

function App() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handelLoginRedirect = () => {
      instance
          .loginRedirect({
              ...loginRequest,
              prompt: 'create',
          })
          .catch((error) => console.log(error));
  };

  const handelLogoutRedirect = () => {
      instance.logoutRedirect({
          postLogoutRedirectUri: '/',
      });
      window.location.reload();
  }

  return (
      <div className="card">
          <AuthenticatedTemplate>
              {activeAccount ? (
                  <><button onClick={handelLogoutRedirect}>Logout</button><p> You are signed in! Welcome {activeAccount.name}</p></>
              ) : null}
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <><button onClick={handelLoginRedirect}>Login</button><p>Please sign in!</p></>
          </UnauthenticatedTemplate>
      </div>
  );
}

export default App
