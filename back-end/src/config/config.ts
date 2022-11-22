import * as dotenv from 'dotenv'

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,

    MAIL_HOST: process.env.MAIL_HOST || 'your.smtp.host',
    MAIL_PORT: process.env.MAIL_PORT || '2525',
    MAIL_USER: process.env.MAIL_USER || 'your email',
    MAIL_PASS: process.env.MAIL_PASS || 'your pass',

    SECRET_KEY: process.env.SECRET_KEY || 'default',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 30
}