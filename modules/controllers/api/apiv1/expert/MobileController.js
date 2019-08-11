const Mobile = require(`${config.models}/Mobile`);
const MobileImg = require(`${config.models}/MobileImg`);

module.exports = new class MobileController { 
    
    
    index(req, res){
        Mobile.find({}, (err, mobile)=>{
            if(err) throw err;

            if(mobile){
                return res.json(mobile);
            }
        })
    }

    imageStore(req,res){
        let newMobileImg = new MobileImg ({
            image : {
                url : 'http://localhost:3030' + req.file.path.replace(/\\/g,'/'),
                contentType : 'image/jpg',
                info : req.file
            }, 
           }).save(err =>{
            if (err) throw err;

            return res.json({
                message: 'فایل با موفقیت آپلود شد',
                data: {
                        url :'http://localhost:3030' + req.file.path.replace(/\\/g,'/'),
                        info : req.file
                     },
                success: true
            })
        })
    }

    store(req, res){
       
        let newMobile = new Mobile ({
            name    : req.body.phone,
            price   : req.body.phonePrice,
            cpu     : req.body.phoneCpu,
            ram     : req.body.phoneRam,
            camera  : req.body.phoneCamera,
            battery : req.body.phoneBattery,
            desc    : req.body.phoneDesc,
            image : {
                url : 'http://localhost:3030/' + req.file.path.replace(/\\/g,'/'),
                contentType : 'image/jpeg',
                info : req.file
            },
        }).save((err,mobile) => {
            if (err) throw err;
            return res.json(mobile);
        })
    }

    update(req, res){
        Mobile.findByIdAndUpdate( req.params.id,
             {
                name    : req.body.phone,
                cpu     : req.body.phoneCpu,
                ram     : req.body.phoneRam,
                camera  : req.body.phoneCamera,
                battery : req.body.phoneBattery,
                image   : {
                    url : req.body.phoneImg,
                } 
            },( err =>{
                if (err) throw err;

                return res.json({
                    _id     : req.params.id,
                    name    : req.body.phone,
                    cpu     : req.body.phoneCpu,
                    ram     : req.body.phoneRam,
                    camera  : req.body.phoneCamera,
                    battery : req.body.phoneBattery,
                    image   : {
                        url : req.body.phoneImg,
                }}
                    );
                }
            )
        )
    }

    remove(req, res){
        Mobile.findByIdAndDelete(req.params.id, err =>{
            if (err) throw err;

            return res.json({
                message : 'ردیف مورد نظر با موفقیت حذف شد'
            });
        })
    }
}

