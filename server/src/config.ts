import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

export const NODE_ENV: string = process.env.NODE_ENV || 'production';

export const BRAINTREE_MERCHANT_ID: string = process.env.BRAINTREE_MERCHANT_ID;
export const BRAINTREE_PUBLIC_KEY: string = process.env.BRAINTREE_PUBLIC_KEY;
export const BRAINTREE_PRIVATE_KEY: string = process.env.BRAINTREE_PRIVATE_KEY;