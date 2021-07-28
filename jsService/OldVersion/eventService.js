import jobInfo from '../modules/eventModule'
import { initEventModule, addEvent, delEvent , eventInfo, makeHourstr } from './modules/eventModule';

let job_daystarter=null;

export function applyEventservice(pkgInfo,service,path){
    initEventModule(job_daystarter,path);


    // addEvent {
    //     device_id = string;
    //     action_id = string;
    //     contents = string;
    //     start = date;
    //     end = date;
    // } // 시작 부터 종료날짜의 모든 파일에 기록
    service.register("addEvent", function(message) {
        let eventinfo = new eventInfo(
            message.payload.device_id,
            message.payload.action_id,
            message.payload.contents,
            makeHourstr(message.payload.start),
            makeHourstr(message.payload.end),
        );
        let res = addEvent(eventinfo,message.payload.time);
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
    //     date = date;
    // } // 해당 이벤트의 시작, 종료날짜를 받아서 모든 파일에서 삭제
    service.register("delEvent", function(message) {
        let res = delEvent(message.payload.eventID,message.payload.date);
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

    // getEventlist {
    //     start = date;
    //     end = date;
    // }
    service.register("getEventlist", function(message) {
        message.respond({
            returnValue: true,
            Response: eventlist,
        });
    });
}