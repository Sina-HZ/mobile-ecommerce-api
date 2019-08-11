const jwt = require('jsonwebtoken');
const User = require(`${config.models}/User`);

module.exports = (req,res,next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] ;

    if(token){
        return jwt.verify(token , config.secret , (err, decode)=>{

            if(err){
                return res.status(401).json({
                    message : 'Failed to authenticate token',
                    success : false
                })
            }

            User.findById(decode.user_id, (err, user)=>{
                if(err){
                    throw err;
                }

                if(user.role === 'admin'){
                    user.token = token;
                    req.user = user;
                    next();
                }else{
                    res.status(403).json({
                        message : 'شما مجاز به اعمال به تغییرات نیستید',
                        success : false
                    })
                }
            })
        })
    }
}