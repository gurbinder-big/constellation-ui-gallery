const authConfig = {
  clientId: '12782580023870311851',
  endPoints: {
    token: 'https://pega24.crochetech.com/prweb/PRRestService/oauth2/v1/token',
    revoke: 'https://pega24.crochetech.com/prweb/PRRestService/oauth2/v1/revoke',
  },
};

export const initializeAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch(authConfig.endPoints.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: authConfig.clientId,
        client_secret: process.env.PEGA_CLIENT_SECRET || '',
      }),
    });

    if (!response.ok) throw new Error('Token request failed');

    const tokenData = await response.json();

    if (tokenData.access_token) {
      const authUtils = PCore.getAuthUtils();

      // Fix TS2353: Cast to 'any' because SDK type definition is overly restrictive
      // and doesn't expect 'refresh_token' or 'expires_in' in this specific setter
      (authUtils as any).setTokens({
        access_token: tokenData.access_token,
        token_type: 'bearer',
        refresh_token: tokenData.refresh_token || '',
        expires_in: tokenData.expires_in,
      });

      authUtils.setAuthorizationHeader(`Bearer ${tokenData.access_token}`);

      return true;
    }
    return false;
  } catch (error) {
    console.error('Pega Auth Initialization Error:', error);
    return false;
  }
};

/**
 * Fix TS7023: Added explicit return type Promise<any>
 */

export const secureInvokeApi = async (endpoint: string, method = 'GET', body: any = null): Promise<any> => {
  try {
    const restClient = PCore.getRestClient();

    const response: any = await restClient.invokeCustomRestApi(
      endpoint,
      {
        method: method,
        body: body || undefined,
        headers: { 'Content-Type': 'application/json' },
        withoutDefaultHeaders: false,
      },
      '', // Change from {} to "" to satisfy the 'string' requirement
    );

    return response?.data;
  } catch (error: any) {
    if (error.status === 401) {
      const reAuthed = await initializeAuth();
      if (reAuthed) {
        return secureInvokeApi(endpoint, method, body);
      }
    }
    throw error;
  }
};

export const logoutAndRevoke = () => {
  PCore.getAuthUtils().revokeTokens();
};
