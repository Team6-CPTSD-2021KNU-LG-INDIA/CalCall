const {applyEventservice} = require('./sub-services/eventService.js');
const config = require('./config.json');

const pkgInfo = require('./package.json');
const Service = require('webos-service');
const service = new Service(pkgInfo.name);

(()=>{
    let err = 'no error';
    try{
        applyEventservice(pkgInfo,service,config.datapath);
    }
    catch(e){
        err=e.toString();
    }
    
    service.register("test", function(message) {
        message.respond({
            returnValue: true,
            Response: err,
        });
    });
})();
