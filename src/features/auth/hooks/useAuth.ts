import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import useRequest from '@/hooks/useRequest';
import { forceReload, removeAllCookies, setCookie } from '@/utils';
import { useApp, useSocketIO } from '@/hooks';

const useAuth = () => {
  const states = useApp();
  const { actions } = useSocketIO();
  const { callRequest } = useRequest();
  const [loading, setLoading] = useState(false);

  const setTokensToCookies = (tokens: ITokens) => {
    setCookie('sub-acc-tkn', tokens.access_token);
    setCookie('sub-ref-tkn', tokens.refresh_token);
    setCookie('sub-exp-tkn', tokens.expires_at);
  };

  const clearAuthData = () => {
    states.setUser();
    removeAllCookies();
    actions.disconnect();
  };

  const logoutRequest = async () => {
    setLoading(true);

    try {
      await callRequest('GET', '/api/v1/auth/logout');
    } catch (error) {
      console.log('logoutRequest', error);
    }

    clearAuthData();
    forceReload('/');
  };

  const fetchUser = async () => {
    let user;
    states.setIsLoading(true);

    try {
      const response = await callRequest<{ user: IUser }>(
        'GET',
        '/api/v1/auth/user',
      );

      if (response.success) {
        states.setUser(response.user);
        user = response.user;
      }
    } catch (error) {
      console.log('fetchUser', error);
    }

    states.setIsLoading(false);
    return user;
  };

  const loginRequest = async (
    body: {
      email: string;
      password: string;
    },
    redirectUrl = '/',
  ) => {
    setLoading(true);
    let response: (ICallRequestResponse & { tokens: ITokens }) | undefined;

    try {
      response = await callRequest<{ tokens: ITokens }>(
        'POST',
        '/api/v1/auth/login',
        {
          body,
        },
      );

      if (response) {
        if (response?.success) {
          setTokensToCookies(response.tokens);
          forceReload(redirectUrl);
        } else {
          showNotification({
            color: 'red',
            message: response.message,
          });
        }
      }
    } catch (error) {
      console.log('loginRequest', error);
    }

    setLoading(false);
    return response;
  };

  const registerRequest = async (
    body: {
      email: string;
      name: string;
      password: string;
    },
    redirectUrl = '/',
  ) => {
    setLoading(true);
    let response: ICallRequestResponse | undefined;

    try {
      response = await callRequest('POST', '/api/v1/auth/register', {
        body,
      });

      if (response) {
        if (response?.success) {
          forceReload(redirectUrl);
        } else {
          showNotification({
            color: 'red',
            message: response.message,
          });
        }
      }
    } catch (error) {
      console.log('registerRequest', error);
    }

    setLoading(false);
    return response;
  };

  const changePasswordRequest = async (body: {
    current_password: string;
    new_password: string;
  }) => {
    setLoading(true);
    let response: ICallRequestResponse | undefined;

    try {
      response = await callRequest('PUT', '/api/v1/auth/password', {
        body,
      });

      if (!response?.success) {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('changePasswordRequest', error);
    }

    setLoading(false);
    return response;
  };

  return {
    ...states,
    loading,
    setTokensToCookies,
    clearAuthData,
    refetchUser: fetchUser,
    loginRequest,
    registerRequest,
    changePasswordRequest,
    logoutRequest,
  };
};

export default useAuth;
