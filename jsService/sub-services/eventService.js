import jobInfo from '../modules/eventModule'
import { initEventModule, addEvent, delEvent , eventInfo, makeHourstr, getEventlist } from './modules/eventModule';

let job_daystarter=null;

export function applyEventservice(pkgInfo,service,path){
    initEventModule(job_daystarter,path);

    // addEvent {
    //     device_id = string;
    //     action_id = string;
    //     contents = string;
    //     start = date;
    //     end = date;
    // } return 으로 이벤트 ID 반환
    service.register("addEvent", function(message) {
        let eventinfo = new eventInfo(
            message.payload.device_id,
            message.payload.action_id,
            message.payload.contents,
            makeHourstr(message.payload.start),
            makeHourstr(message.payload.end),
        );
        let res = addEvent(eventinfo);
        if(res[1] == true){
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
    
    // delEvent {
    //     eventID = string;
    // } 
    service.register("delEvent", function(message) {
        let res = delEvent(message.payload.eventID);
        if(res[1] == true){
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