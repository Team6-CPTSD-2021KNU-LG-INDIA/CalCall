const schedule = require('node-schedule');
const fs = require('fs');
const encode = 'utf8';
let defaultpath;
let eventList;

function initEventModule(job_daystarter,path){
    defaultpath = path+'EventData1.json';
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
    try {
        fs.statSync(defaultpath);
    }catch(error) {
        if (error.code === "ENOENT") {
            fs.writeFileSync(defaultpath, '{}', {
                encoding: encode,
                flag: 'w',
            });
            return {};
        }
        else
            return 'error';
    }
    const eventFile = fs.readFileSync(defaultpath,encode);
    return JSON.parse(eventFile);
};

function addJobs(index){

}
function delJob(index){

}

function getEventlist(){
    return Object.keys(eventList).map((index)=>{
        if(eventList[index] != null){
            return eventList[index];
        }
        else{
            return null
        }
    });
}

function delEvent(eventID){
    eventList[eventID] = null;
    try{
        fs.writeFileSync(defaultpath, JSON.stringify(eventList), {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e.toString(),false];
    }
    delJob(index);
    eventList = readEventData();
    return [eventID,true];
}

function addEvent(eventInfo){
    let index = Object.keys(eventList).length;

    eventList[index] = eventInfo;

    try{
        fs.writeFileSync(defaultpath, JSON.stringify(eventList), {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e,false];
    }
    addJobs(index);
    eventList = readEventData();
    return [index,true];
}

module.exports = { initEventModule, addEvent, delEvent , eventInfo, getEventlist };