import { config } from 'dotenv';

config({ path: '.env' });

export const PORT = process.env.PORT || 8080;
export const URL = process.env.URL || 'http://localhost';
export const JWT_SECRET = process.env.JWT_SECRET || 'SUS';
export const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';
export const DB_NAME = process.env.DB_NAME || 'ShareSprint';
export const LOG_FORMAT = process.env.LOG_FORMAT || 'dev';
export const ORIGIN = process.env.ORIGIN || '*';
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const MAIL_PROVIDER = process.env.MAIL_PROVIDER || 'Mailtrap';
export const MAIL_HOST = process.env.MAIL_HOST || 'smtp.mailtrap.io';
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const COMPANY_NAME = process.env.COMPANY_NAME || 'ShareSprint';
export const MAIL_TEMPLATE_LOCATION = process.env.MAIL_TEMPLATE_LOCATION || 'src/views/mail';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';