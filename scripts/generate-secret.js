import crypto from 'crypto';
import { config } from 'dotenv';

const generateSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

console.log('Generated JWT_SECRET:', generateSecret());