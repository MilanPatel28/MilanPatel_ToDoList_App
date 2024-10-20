import jwt from 'jsonwebtoken';

const generateTokens = async (userId) => {
    try {
        const accessToken = jwt.sign(
            { _id: userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        
        const refreshToken = jwt.sign(
            { _id: userId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
        
        return { accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
};

export { generateTokens };