const jwt = require('jsonwebtoken');
const User = require(`${config.models}/User`);

module.exports = (req,res,next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] ;

    if(token){
        return jwt.verify(token , config.secret , (err, decode)=>{

            if(err){
                return res.json({
                    message : 'Failed to authenticate token',
                    success : false
                })
            }

            User.findById(decode.user_id, (err, user)=>{
                if(err){
                    throw err;
                }

                if(user){
                    user.token = token;
                    req.user = user;
                    next();
                }else{
                    res.json({
                        message : 'کاربر یافت نشد',
                        success : false
                    })
                }
            })
        })
    }
}
