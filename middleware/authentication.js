import jwt from 'jsonwebtoken'
import errors from '../errors/index.js'
const {UnauthenticatedError} = errors

const authMiddleWare = async (req,res,next)=>{
    const authHeader = req?.headers?.authorization?.split(" ")[1]
    if (!authHeader || authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Bearer Invalid')        
    }

    try {
        const payLoad = jwt.verify(authHeader,process.env.JWT_SECRET);
        // Attach user to the request object
        req.user = { userId: payLoad.userId, name: payLoad.name };
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new UnauthenticatedError('Token has expired');
          }
          throw new UnauthenticatedError('Authentication invalid');        
    }
}

export default authMiddleWare;