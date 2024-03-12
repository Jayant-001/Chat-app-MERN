import jwt from 'jsonwebtoken'

export const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };
    
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "5d" };

    return jwt.sign(payload, secret, options);
}

export function verifyAccessToken(token) {
    const secret = process.env.JWT_SECRET;

    try {
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}