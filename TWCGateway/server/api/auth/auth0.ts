import { nanoid } from 'nanoid';

let state: { [key: string]: any } = {};
const genState = () => {
  const s = nanoid();
  state[s] = 1;
  return s;
};

const verifyNonce = (nonce: string) => {
  if (state[nonce]) {
    delete state[nonce];
    return true;
  }
  return false;
};

const getRuntimeConfig = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig;
};

export const loginRedirectUrl = () => {
  const { ISSUER, AUTH0_CLIENTID, BASEURL } = getRuntimeConfig();
  return `${ISSUER}/authorize?response_type=id_token&response_mode=form_post&client_id=${AUTH0_CLIENTID}&scope=openid%20email&redirect_uri=${encodeURIComponent(
    BASEURL + 'api/auth/callback'
  )}&nonce=${genState()}`;
};

export const logoutRedirectUrl = (id_token: string) => {
  const { ISSUER, BASEURL } = getRuntimeConfig();
  return `${ISSUER}/oidc/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${encodeURIComponent(
    BASEURL + 'api/auth/logout-complete'
  )}&nonce=${genState()}`;
};
