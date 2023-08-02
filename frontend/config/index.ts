import { config } from 'dotenv';

config({ path: '.env' });

export const COMPANY_NAME = process.env.COMPANY_NAME || 'ShareSprint';

export const DOMAIN = process.env.DOMAIN || 'http://localhost:8080/api';

export const NEXTAUTH_JWT_SECRET = process.env.NEXTAUTH_JWT_SECRET || 'secret';

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'secret';