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

        console.log('req.body store :' , req.body);
        console.log('req.file store :' , req.file);

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
       console.log('req.body :' , req.body);
        const{phone ,phoneCpu , phoneRam,phoneCamera,phoneBattery,MobileImg} = req.body;
        // let newMobile = {};
        // if(phone){newMobile.name = phone};
        // if(phoneCpu){newMobile.cpu = phoneCpu};
        // if(phoneRam){newMobile.ram = phoneRam};
        // if(phoneCamera){newMobile.camera = phoneCamera};
        // if(phoneBattery){newMobile.battery = phoneBattery};
        // if(MobileImg){let newMobile = new Object({
        //     image : {
        //         url : 'http://localhost:3030/' + req.file.path.replace(/\\/g,'/'),
        //         contentType : 'image/jpeg',
        //         info : req.file
        //     },
        //     }) 
        // }

            // const updated =await Mobile.findByIdAndUpdate( req.params.id ,{$upsert : {newMobile}},{new : true},
            // )
            // return res.json(updated);
        Mobile.findOne({_id : req.params.id},(err,mobile)=>{
                if (err) console.log('update error',err);
                if(phone){mobile.name = phone};
                if(phoneCpu){mobile.cpu = phoneCpu};
                if(phoneRam){mobile.ram = phoneRam};
                if(phoneCamera){mobile.camera = phoneCamera};
                if(phoneBattery){mobile.battery = phoneBattery};
                if(MobileImg){let newImg = new Object({
                                url : 'http://localhost:3030/' + req.file.path.replace(/\\/g,'/'),
                                info : req.file
                                })
                                mobile.image.url = newImg.url;
                                mobile.image.info = newImg.info;
                                console.log('new image', newImg)
                }
            mobile.save(err =>{
                if (err) throw new Error('update saving have problem');
                return res.json(mobile);
            })
        })
    };

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

