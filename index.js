import axios from "axios";
import { mainModule } from "process";

var txt = document.createElement("text");
var time = "2022-1-18";
console.log(time);



var apiURL = "http://vrrabackendagain.herokuapp.com";

function str(obj) {
  var result;
  result = JSON.stringify(obj);
  result = result.replaceAll("},{", "}\n{");
  return result;
}

async function login(name, email) {
  var rst;
  console.log("loging in ... \n");
  await axios({
    method: "POST",
    baseURL: apiURL,
    url: "/login",
    headers: { "Content-Type": "application/json" },
    data: {
      name: name,
      email: email,
    },
  })
    .then((res) => {
      txt.innerText = str(res.data) + "\n\n";
      console.log("TOKEN", res.data.token);
      rst = res.data.token;
    })
    .catch((error) => console.log(error));
  return rst;
}

async function getRooms() {
  console.log("Getting rooms ... \n");
  txt.innerText += "Getting rooms ... \n";
  await axios
    .get("http://vrrabackendagain.herokuapp.com/room")
    .then((res) => {
      txt.innerText += str(res.data) + "\n\n";
      console.log(res.data);
      getUsers();
    })
    .catch(() => console.log("failed"));
}

async function getUsers() {
  console.log("Getting users ... \n");
  txt.innerText += "Getting users ... \n";
  await axios
    .get("http://vrrabackendagain.herokuapp.com/user")
    .then((res) => {
      txt.innerText += str(res.data) + "\n\n";
      console.log(res.data);
      createMeeting();
    })
    .catch((err) => console.log(err.data));
}

async function createMeeting(token) {
  txt.innerText += "Creating meeting ... \n";
  console.log("Creating meeting ... \n");
  console.log(token);
  await axios({
    method: "post",
    baseURL: "http://vrrabackendagain.herokuapp.com",
    url: "/sub/meeting",
    headers: { "Content-Type": "application/json", Authorization: token },
    data: {
      roomid: 2,
      joinlist: ["kevin@gmail.com"],
      name: "2022-1-18測試",
      description: "hihiihihi u an testing here",
      startTime: 7,
      endTime: 7,
      date: "2022-1-18",
    },
  })
    .then((res) => {
      txt.innerText += str(res.data) + "\n\n";
      console.log(res.data);
      displayUserMeeting();
    })
    .catch((err) => {
      console.log(err.response.data, err.response.headers);
      displayUserMeeting();
    });
}

var meetingID;
async function displayUserMeeting() {
  txt.innerText += "Displaying user meeting for c1l1mo@gmail.com ...\n";
  console.log("Displaying user meeting for c1l1mo@gmail.com ...");
  await axios({
    method: "get",
    baseURL: "http://vrrabackendagain.herokuapp.com",
    url: "/sub/meeting",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      txt.innerText += str(res.data) + "\n\n";
      console.log(res.data);
      meetingID = res.data[res.data.length - 1].id;
      console.log("ID :" + meetingID);
      patchUserMeeting(meetingID);
    })
    .catch((err) => console.log(err.response.data));
}

async function patchUserMeeting(meetingID) {
  console.log("Modifying user meeting for c1l1mo@gmail.com");
  txt.innerText += "Modifying user meeting for c1l1mo@gmail.com\n";
  await axios({
    method: "patch",
    baseURL: "http://vrrabackendagain.herokuapp.com",
    url: `/sub/meeting/${meetingID}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: {
      roomid: 3,
      joinlist: ["exp@gmail.com", "exp2@gmail.com"],
      name: "測試",
      description: "change!",
      startTime: 7,
      endTime: 7,
      date: "2022-1-18",
    },
  })
    .then((res) => {
      txt.innerText += str(res.data) + "\n\n";
      console.log(res.data);
      displayAllMeeting();
    })
    .catch((err) => console.log(err.response.data));
}

async function displayAllMeeting() {
  txt.innerText +=
    "Displaying all meeting for exp5@gmail.com at 2022-1-18 ... \n";
  console.log("Displaying all meeting for exp5@gmail.com at 2022-1-18 ... \n");
  token = () => login("exp5", "exp5@gmail.com");
  txt.innerText("TOKEN : ", token);
  await axios({
    method: "get",
    baseURL: apiURL,
    url: "/sub/meeting/global/2022-1-18",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      txt.innerText += str(res.data) + "\n\n";
      console.log(res.headers, res.data);
      deleteUserMeeting(meetingID);
    })
    .catch((err) => console.log(err.response.data));
}

async function deleteUserMeeting(meetingID) {
  txt.innerText += `deleting meeting id ${meetingID} ... \n`;
  console.log(`deleting meeting id ${meetingID} ... \n`);
  await axios({
    method: "delete",
    baseURL: apiURL,
    url: `/sub/meeting/${meetingID}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      console.log(res.data);
      txt.innerText += str(res.data);
    })
    .catch((err) => console.log(err.response.data));
}

login("name", "c1l1mo@gmail.com").then(tkn=>createMeeting(tkn))
 




document.body.appendChild(txt);
