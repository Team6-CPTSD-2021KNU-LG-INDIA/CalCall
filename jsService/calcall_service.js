import applyDB from './sub-services/dbService'
import applyEventservice from './sub-services/eventService'


const pkgInfo = require('./package.json');
const Service = require('webos-service');
const service = new Service(pkgInfo.name);

(()=>{
    //applyDB(pkgInfo,service, pkgInfo.name+':1');
    applyEventservice(pkgInfo,service,'/home/root/CalCall/eventDatas');
})
