const User = require(`${config.models}/User`);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = new class AuthController {
    register(req, res){
 
        let newUser = new User ({
            name : req.body.name,
            family : req.body.family,
            password : req.body.password,
            email : req.body.email,
            role : 'customer'
        }).save((err, user )=> {
            if(err){
                if(err.code === 11000){
                    return res.status(406).json({
                        message : 'ایمیل وارد شده تکراری است',
                        success : false
                    })
                }else{
                    return res.status(400).json({
                        message : 'ثبت نام ناموفق بود. لطفا مقادیر را مجدد بررسی فرمایید.',
                        success : false
                    })
                }
                
            }
            jwt.sign({user_id: user._id},config.secret,(err, token)=>{
                if(err) throw err;

                return res.json({
                    'message' : `کاربر گرامی ${user.name} ${user.family} از عضویت شما سپاسگذاریم`,
                    'success' : true,
                    'token' : token
                });
            })
        })

    }

    login(req, res){
    
        User.findOne({email : req.body.email},(err,user)=>{
            if (err) {
                res.json({
                    message : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });
                return;
            };

            if (user === null)
                return res.json({
                    message : 'ایمیل / کلمه عبور صحیح نیست',
                    success : false 
                })

                if(user){
                    bcrypt.compare(req.body.password, user.password, (err, status)=>{
                        if(! status){
                            res.status(404).status({
                                message : 'ایمیل / کلمه عبور صحیح نیست',
                                success : false
                            })
                        }
                        jwt.sign({user_id: user._id},config.secret,(err, token)=>{
                            if(err) throw err;
    
                            return res.json({
                                'message' : `کاربر گرامی ${user.name} ${user.family} خوش آمدید`,
                                'success' : true,
                                'token'   : token
                            });
                        }) 
                    })
                }

        })

    }

    logout(req, res){
        let token = req.body.token || req.query.token || req.headers['x-access-token'] ;
        // console.log(req.user);
            if(token){
                token = null;
                return res.json({
                    success: true,
                    message: 'user logout successfully'
                });
            }
            res.json({
                success: true, 
                message: 'user logout successfully'
            });
    }
    
}


