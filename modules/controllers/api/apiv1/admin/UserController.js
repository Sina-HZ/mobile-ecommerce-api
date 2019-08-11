const User = require(`${config.models}/User`);
const bcrypt = require('bcrypt');


module.exports = new class UserController { 
    
    
    index(req, res){
        User.find({}, (err, user)=>{
            if(err) throw err;

            if(user){
                return res.json(user);
            }
        })
    }

   

    addUser(req, res){
    
        let newUser = new User ({
            name    : req.body.name,
            price   : req.body.family,
            cpu     : req.body.password,
            ram     : req.body.email,
            role    : req.body.role,
            avatar  : req.body.avatar,
            image   : {
                url : 'http://localhost:3030/' + req.file.path.replace(/\\/g,'/'),
                contentType : 'image/jpeg',
                info : req.file
            },
        }).save((err,user) => {
            if (err){
                return res.status(424).json({
                    message : 'ایجاد کاربر جدید با مشکل مواجه شد.',
                    success : false
                })
            };
            return res.json(user);
        })
    }

    updateUser(req, res){
        const{name,family,password,email,role,avatar} = req.body;
        let newModel = {};
        if(name){newModel.name = name};
        if(family){newModel.family = family};
        if(password){newModel.password = bcrypt.hashSync(password, 10)};
        if(email){newModel.email = email};
        if(role){newModel.role = role};
        if(avatar){newModel.avatar = avatar};
        User.findByIdAndUpdate( req.params.id,
                   newModel
                // name     : req.body.phone,
                // family   : req.body.phoneCpu,
                // password : req.body.phoneRam,
                // email   : req.body.phoneCamera,
                // role   : req.body.phoneBattery,
                // avata   : {
                //     url : 'http://localhost:3030/' + req.file.path.replace(/\\/g,'/'),
                //     contentType : 'image/jpeg',
                //     info : req.file
                // } 
            ,(err =>{
                if (err){
                    return res.status(409).json({
                        message : 'درخواست بروز رسانی کاربر انجام نشد. مجدد اقدام نمایید',
                        success : false
                    })
                };

                return res.json({
                    message : 'اطلاعات کاربر بروز رسانی شد',
                    success : true
                });
                }
            )
        )
    }

    removeUser(req, res){
        User.findByIdAndDelete(req.params.id, err =>{
            if (err) throw err;

            return res.json({
                message : 'کاربر مورد نظر با موفقیت حذف شد',
                success : true
            });
        })
    }
}

