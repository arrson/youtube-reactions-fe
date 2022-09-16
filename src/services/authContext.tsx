/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getBaseUrl, getApi, User } from 'services/api';
import { STORAGE, MESSAGES } from 'services/utils';
import { publish, EVENTS } from './events';

interface AuthContextInterface {
  user: User | undefined;
  error: string | undefined;
  api: ReturnType<typeof getApi>;
  login: () => void;
  logout: () => void;
}

const defaultApi = getApi();
const AuthContext = createContext<AuthContextInterface>({
  user: undefined,
  api: defaultApi,
  error: undefined,
  login: () => {},
  logout: () => {},
});

const LOGIN_URL = `${getBaseUrl()}/auth/google`;

function createLoginWindow(onLogin: (token: string) => void) {
  const child = window.open(
    LOGIN_URL,
    '_blank',
    'popup=true,width=400,height=600'
  );

  const onMessage = (e: MessageEvent) => {
    if (e.origin === getBaseUrl() && e.data.message === MESSAGES.token) {
      onLogin(e.data.token);

      child?.close();
      window.removeEventListener('message', onMessage);
    }
  };

  window.addEventListener('message', onMessage);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [api, setApi] = useState<AuthContextInterface['api']>(defaultApi);
  const [error, setError] = useState<string | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const setToken = async (t?: string) => {
    const newApi = getApi(t);
    let userInfo = undefined;

    if (t) {
      const res = await newApi.getUserProfile();
      if (res.state === 'success') {
        userInfo = res.data;
      } else {
        setError(res.data.message);
      }
    }

    setApi(newApi);
    setUser(userInfo);
    publish(EVENTS.userUpdated, { user: userInfo });
  };

  const updateUser = async () => {
    chrome.storage.local.get([STORAGE.token], async (result) => {
      setToken(result.token);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    updateUser();
  }, []);

  const login = async () => {
    createLoginWindow((token) => {
      chrome.storage.local.set({ token }, () => {
        updateUser();
      });
    });
  };

  const onLogout = async () => {
    chrome.storage.local.remove(STORAGE.token, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        setError(err.message);
        console.error(err);
      }
    });
    setToken(undefined);
  };

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider value={{ user, api, error, login, logout: onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
