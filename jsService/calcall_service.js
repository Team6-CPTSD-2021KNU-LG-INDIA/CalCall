import applyDB from './sub-services/dbService'
import applyEventservice from './sub-services/eventService'

const pkgInfo = require('./package.json');
const Service = require('webos-service');
const service = new Service(pkgInfo.name);

(()=>{
    //applyDB(pkgInfo,service, pkgInfo.name+':1');
    //applyEventservice(pkgInfo,service,'/home/root/CalCall/eventDatas');
    service.register("getEventlist", function(message) {
        message.respond({
            returnValue: true,
            Response: {
                '0':{
                    title: 'All Day Event',
                    start: '2021-07-01'
                  },
                 '1': {
                    title: 'Long Event',
                    start: '2021-07-01',
                    end: '2021-07-10',
                    color: 'purple' // override!
                  },
            }
        });
    });
})();
