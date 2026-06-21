const jwt = require('jsonwebtoken');
const middleware ={
    decodeToken:async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Không có token' });
        }
        try{

            const decodedValue   = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (!decodedValue) {
                return res.status(401).json({ message: 'Token không hợp lệ' });
            }
            req.user = decodedValue;
            console.log("User:", req.user);
            next(); 
            //  return res.status(200).json({ message: 'Token hợp lệ', user: decodedValue });

        }catch (error) {
            return res.status(500).json({ message: 'Lỗi xác thực token' });
        }
        
       
    }
}

module.exports = middleware;