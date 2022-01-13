const { default: axios } = require("axios");
const { stdout } = require("process");
const readline = require("readline");

apiURL = "http://vrrabackendagain.herokuapp.com"

async function getRooms() {
  console.log("Getting rooms ... \n");
  await axios
    .get("http://vrrabackendagain.herokuapp.com/room")
    .then((res) => {console.log(res.data);getUsers()})
    .catch(() => console.log("failed"));
}

async function getUsers(){
    console.log("Getting users ... \n")
    await axios
        .get("http://vrrabackendagain.herokuapp.com/user")
        .then((res)=>{console.log(res.data);createMeeting()})
        .catch(err=>console.log(err.data))

}

async function createMeeting(){
  console.log("Creating meeting ... \n")
  await axios({
    method: 'post',
    baseURL : 'http://vrrabackendagain.herokuapp.com',
    url : '/meeting',
    headers : {'Content-Type' : 'application/json',
    'Email' : 'c1l1mo@gmail.com'},
    data :{
      'roomid' : 2,
      'joinlist' : ['exp@gmail.com','exp2@gmail.com'],
      'name' : '測試',
      'description' : 'i want to change something again?',
      'startTime' : 3,
      'endTime' : 4,
      'date' : '2022-1-12'
 }
  })
  .then(res=>{console.log(res.data);displayUserMeeting()})
  .catch((err)=>{console.log(err.response.data);displayUserMeeting()})
}

var meetingID 
async function displayUserMeeting(){
  console.log("Displaying user meeting for c1l1mo@gmail.com ...")
  await axios({
    method:'get',
    baseURL : 'http://vrrabackendagain.herokuapp.com',
    url:'/meeting',
    headers :{
      'Content-Type' : 'application/json',
      'Email' : 'c1l1mo@gmail.com'
    }
  })
  .then(res=>{console.log(res.data);meetingID=res.data[6].id;console.log("ID :" + meetingID);patchUserMeeting(meetingID)})
  .catch(err=>console.log(err.response.data))
}

async function patchUserMeeting(meetingID){
  console.log("Modifying user meeting for c1l1mo@gmail.com")
  await axios({
    method:'patch',
    baseURL:'http://vrrabackendagain.herokuapp.com',
    url:`/meeting/${meetingID}`,
    headers : {
      'Content-Type' : 'application/json',
      'Email' : 'c1l1mo@gmail.com'
    },
    data :{
      'roomid' : 2,
      'joinlist' : ['exp@gmail.com','exp2@gmail.com'],
      'name' : '測試',
      'description' : 'change!',
      'startTime' : 3,
      'endTime' : 4,
      'date' : '2022-1-12'
    }
  })
  .then(res => {console.log(res.data);displayAllMeeting()})
  .catch(err => console.log(err.response.data))
}

async function displayAllMeeting(){
  console.log("Displaying all meeting for exp5@gmail.com at 2022-1-12 ... \n")
  await axios({
    method:'get',
    baseURL : apiURL,
    url: '/meeting/global/2022-1-12',
    headers : {
      'Content-Type' : 'application/json',
      'Email' : 'exp5@gmail.com'
    },
  })
  .then(res=>{console.log(res.data);deleteUserMeeting(meetingID)})
  .catch(err=>console.log(err.response.data))
}

async function deleteUserMeeting(meetingID){
  console.log(`deleting meeting id ${meetingID} ... \n`)
  await axios({
    method:'delete',
    baseURL:apiURL,
    url:`/meeting/${meetingID}`,
    headers : {
      'Content-Type' : 'application/json',
      'Email' : 'c1l1mo@gmail.com'
    }
  })
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err.response.data))
}


displayAllMeeting();
//getRooms();
return 
