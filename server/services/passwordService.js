import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    
    try {
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(password, salt);
        
        return hash;
    } catch (error) {
        console.log("Error ", error)
        return null;
    }
}

export const verifyPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
}