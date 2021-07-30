const schedule = require('node-schedule');
const fs = require('fs');
const encode = 'utf8';
let defaultpath;
let eventList={};

function initEventModule(job_daystarter,path){
    defaultpath = path+'/EventData1.json';
    eventList = readEventData();
    // eventList.forEach(i=>{
    //     addJobs(index);
    // })
}

class eventInfo{
    constructor(device_id, action_id, contents, start, end){
        this.device_id = device_id;
        this.action_id = action_id;
        this.contents = contents;
        this.start = start;
        this.end = end;
    }
}

function readEventData(){
    fs.exists(defaultpath,(isEx)=>{
        if(isEx){
            // const eventFile = fs.readFileSync(defaultpath,encode);
            // return JSON.parse(eventFile);
        }
        else{
            // fs.writeFileSync(defaultpath, {}, {
            //     encoding: encode,
            //     flag: 'w',
            // });
            // return {};
        }
    });
};

function addJobs(index){

}
function delJob(index){

}

function getEventlist(){
    eventList = readEventData();
    return eventList;
}

function delEvent(eventID){
    eventlist[eventID] = null;
    try{
        fs.writeFileSync(defaultpath, eventlist, {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e.toString(),false];
    }
    delJob(index);
    return [eventID,true];
}

function addEvent(eventInfo){
    let index = Object.keys(eventlist).length;

    eventlist[index] = eventInfo;

    try{
        fs.writeFileSync(defaultpath, eventlist, {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e.toString(),false];
    }
    addJobs(index);
    return [index,true];
}

module.exports = { initEventModule, addEvent, delEvent , eventInfo, getEventlist };