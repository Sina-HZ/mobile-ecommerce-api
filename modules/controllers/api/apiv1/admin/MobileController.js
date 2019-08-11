const Mobile = require(`${config.models}/Mobile`);
const MobileImg = require(`${config.models}/MobileImg`);

module.exports = new class MobileController { 
    
    
    index(req, res){
        Mobile.find({}, (err, mobile)=>{
            if(err){
                return res.status(500).json({
                    message : 'لیست محصولات در دسترس نیست ',
                    success : false
                })
            }

            if(mobile){
                return res.json(mobile);
            }
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
            if (err){
                return res.status(400).json({
                    message : 'مقادیر محصول مورد نظر مشکل دارند.لطفا مجدد امتحان نمایید',
                    success : false
                })
            };
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
                if (err){
                    return res.status(404).json({
                        message : 'ID وارد شده صحیح نیست',
                        success : false
                    })
                };

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
            if (err) {
                return res.status(404).json({
                    message : 'ID وارد شده صحیح نیست',
                    success : false
                })
            };

            return res.json({
                message : 'ردیف مورد نظر با موفقیت حذف شد'
            });
        })
    }
}

