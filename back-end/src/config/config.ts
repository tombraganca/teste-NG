import * as dotenv from 'dotenv'

dotenv.config();

export const config = {
    MAIL_HOST: process.env.MAIL_HOST || 'your.smtp.host',
    MAIL_PORT: process.env.MAIL_PORT || '2525',
    MAIL_USER: process.env.MAIL_USER || 'your email',
    MAIL_PASS: process.env.MAIL_PASS || 'your pass',

    JWT_SECRET: process.env.JWT_SECRET || 'default',
}