import { verifyAccessToken } from "../services/tokenService.js";

export default (req, res, next) => {

    const bearerHeader = req.headers["authorization"];

    if(!bearerHeader) {
        return res.status(400).json({error: "Bearer token not found"})
    }

    const bearerToken = bearerHeader.split(' ')[1];
    const verificationStatus = verifyAccessToken(bearerToken);

    if(verificationStatus.success == false) {
        return res.status(403).json({error: verificationStatus.error});
    }

    req.userId = verificationStatus.data.id;
    req.userEmail = verificationStatus.data.email;
    next();
}