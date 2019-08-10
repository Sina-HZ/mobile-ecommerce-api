const Mobile = require(`${config.models}/Mobile`);
// const MobileImg = require(`${config.models}/MobileImg`);

module.exports = new class MobileController { 
    
    
    index(req, res){
        Mobile.find({}, (err, mobile)=>{
            if(err) throw err;

            if(mobile){
                // let list = [mobile]
                
                res.json(mobile.map(item =>{
                    return {
                        _id : item._id,
                        name : item.name,
                        price : item.price,
                        cpu : item.cpu,
                        ram : item.ram,
                        camera : item.camera,
                        battery : item.battery,
                        desc : item.desc,
                        image : item.image.url
                }

                }));
            }
        })
    }
}

