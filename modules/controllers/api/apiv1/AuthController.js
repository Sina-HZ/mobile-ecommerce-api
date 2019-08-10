const User = require(`${config.models}/User`);
const bcrypt = require('bcrypt');

module.exports = new class AuthController {
    register(req, res){
        req.checkBody('name' , 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('family' , 'وارد کردن فیلد نام خانوادگی الزامیست').notEmpty();
        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'کلمه عبور نمیتواند خالی باشد').notEmpty();
        req.checkBody('email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();    

        let errors = req.validationErrors()
        if(errors){
            res.status(422).json({
                message : errors.map(error => {
                    return {
                    'field'   : error.param,
                    'message' : error.msg
                }
                })
            })
        }

        let newUser = new User ({
            name : req.body.name,
            family : req.body.family,
            password : req.body.password,
            email : req.body.email,
        }).save(err => {
            if(err){
                if(err.code === 11000){
                    return res.json({
                        data : 'email is duplicated!',
                        success : false
                    })
                }else{
                    throw new Error('ایجاد کاربر با خطا مواجه است');
                }
                
            }

            return res.json({
                message : 'کاربر با موفقیت ثبت شد',
                success : true
            })
        })

    }

    login(req, res){
        req.checkBody('email','وارد کردن فیلد ایمیل الزامی است');
        req.checkBody('password','وارد کردن کلمه عبور الزامی است');

        let errors = req.validationErrors()
        if(errors){
            res.status(422).json({
                message : errors.map(error => {
                    return {
                    'field'   : error.param,
                    'message' : error.msg
                }
                })
            })
        }

        User.findOne({email : req.body.email},(err,user)=>{
            if (err) throw err;

            if (user == null)
                res.status(422).json({
                    message : 'ایمیل وارد شده صحیح نیست',
                    success : false 
                })

                bcrypt.compare(req.body.password, user.password, (err, status)=>{
                    if(! status){
                        res.status(422).status({
                            message : 'کلمه عبور صحیح نمی باشد',
                            success : 'false'
                        })
                    }

                    return res.json(user);
                })
        })

    }

    logout(req, res){
        let token = req.user.token;
            if(token){
                req.user.token = null;
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


