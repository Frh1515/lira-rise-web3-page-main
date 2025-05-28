
export const API_CONFIG = {
  BASE_URL: 'https://liracoin-backend.onrender.com',
  ENDPOINTS: {
    CONNECT_WALLET: '/connect-wallet',
    GET_BALANCE: '/get-balance',
    GET_PRICE: '/get-price'
  }
};

export const apiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`;
