import { config } from 'dotenv';

config();

export const { REACT_APP_BACKEND_URL: BASE_URL } = process.env;
