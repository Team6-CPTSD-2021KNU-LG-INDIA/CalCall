const { initEventModule, addEvent, delEvent , eventInfo, getEventlist } = require('../modules/eventModule');

let job_daystarter=null;

function applyEventservice(pkgInfo,service,path){
    initEventModule(job_daystarter,path);
    // addEvent {s
    //     device_id = string;
    //     action_id = string;
    //     title = string;
    //     contents = string;
    //     start = date;
    //     end = date;
    // } return 으로 이벤트 ID 반환
    service.register("addEvent", function(message) {
        let res = addEvent(message.payload.data);
        if(res[1]){
            message.respond({
                returnValue: true,
                Response: getEventlist(),
            });
        }
        else{
            message.respond({
                returnValue: false,
                errorText: getEventlist(),
            });
        }
    });
    
    // delEvent {
    //     eventID = string;
    // } 
    service.register("delEvent", function(message) {
        let res = delEvent(message.payload.eventID);
        if(res[1]){
            message.respond({
                returnValue: true,
                Response: res[0],
            });
        }
        else{
            message.respond({
                returnValue: false,
                Response: res[0],
            });
        }
    });

    service.register("getEventlist", function(message) {
        message.respond({
            returnValue: true,
            Response: getEventlist(),
        });
    });
}

module.exports = {applyEventservice}
  