import { useMainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import * as Tools from "@/utils/tools/index.js";
// 请求 axios -  http
import http from "@/api/api.js";

const type = {
  ERROR: "ERROR",
  NURSERY: "nursery",
  NOTICE: "notice",
  // 单条园所通知
  ADD_NOTICE: "add_notice",
  RECIPES: "recipes",
  ATTENDANCE: "attendance",
  // 单条幼儿考勤
  ADD_ATTENDANCE: "add_attendance",
  CLASS_STYLE: "class_style",
  BINDDING: "binding",
  EQUIPMENT: "equipment_number",
  TEACHER: "teacher_attendance",
  // 单条老师考勤
  SINGLE_TEACHER: "single_teacher_attendance",
  CLASSVIDE: "class_vide",
  //increase(添加班级风采) delete（删除班级风采）
  CLASSTYPE: "class_type",
};

const mainStore = useMainStore();
const { coding } = storeToRefs(mainStore);

let socket = null;

function connectToServer() {
  socket = new WebSocket("ws://121.43.179.182:2347");

  socket.addEventListener("open", () => {
    console.log("Connected to server");
    sendLoginEvent();
    setTimeout(() => {
      mainStore.loading = false;
      mainStore.Binding = true;
    }, 1000);
  });

  socket.addEventListener("message", handleIncomingMessage);

  socket.addEventListener("close", () => {
    console.log("Connection closed, attempting to reconnect...");
    reconnect();
  });

  socket.addEventListener("error", (error) => {
    console.error("Socket error:", error);
    reconnect();
  });
}

function sendLoginEvent() {
  const curCoding = Tools.storage("l", "get", "coding");
  const loginEvent = {
    eventType: "BANPAI",
    operationType: "BANPAI_LOGIN",
    equipment_number: curCoding || coding.value,
  };
  sendMessage(JSON.stringify(loginEvent));
}

function handleIncomingMessage(event) {
  console.log("Received data:", event.data);
  const data = JSON.parse(event.data);
  const wehCodng = Tools.storage("l", "get", "coding");
  switch (data.eventType) {
    case type.ERROR:
    case type.EQUIPMENT:
      mainStore.Binding = false;
      mainStore.loading = false;
      if (!wehCodng) {
        mainStore.coding = data.equipment_number;
        Tools.storage("l", "set", "coding", data.equipment_number);
      }
      break;
    case type.NOTICE:
      mainStore.NoticeData = data.data;
      console.log("Notice data:", data);
      break;
    case type.ADD_NOTICE:
      mainStore.NoticeData.push(data.data);
      console.log("单条通知 data:", data);
      break;
    case type.NURSERY:
      http
        .post("GetWeather", {
          class_id: data.data.class_id,
        })
        .then((res) => {
          mainStore.ParkInfo = data.data;
          mainStore.ParkInfo.weather = res.data.code[0];
        });

      console.log("NURSERY data:", data);
      break;
    case type.RECIPES:
      mainStore.RecipesData = data.data;
      console.log("Nutrition recipes data:", data);
      break;
    case type.ATTENDANCE:
      mainStore.AttendanceData = data.data;
      console.log("Child attendance data:", data);
      break;
    case type.ADD_ATTENDANCE:
      console.log("单条幼儿考勤 data:", data);
      break;
    case type.CLASS_STYLE:
      mainStore.class_style = data.data.class_style;
      mainStore.class_video = data.data.class_video;
      console.log("Class style data:", data);
      break;
    case type.CLASSVIDE:
      mainStore.class_style = data.data.class_style;
      mainStore.class_video = data.data.class_video;
      console.log("班级视频添加 data:", data);
      console.log(mainStore.class_video);
      break;
    case type.CLASSTYPE:
      console.log("班级风采 修改 data:", data);
      break;
    case type.BINDDING:
      if (!wehCodng) {
        mainStore.coding = data.equipment_number;
        Tools.storage("l", "set", "coding", data.equipment_number);
      }
      sendLoginEvent();
      mainStore.Binding = true;
      console.log("BindDing data:", data);
      break;
    case type.TEACHER:
      mainStore.TeacherData = data.data;
      console.log("老师考勤  data:", data);
      break;
    case type.SINGLE_TEACHER:
      //   mainStore.TeacherData = data.data;
      console.log("单条老师考勤  data:", data);
      break;
    default:
      break;
  }
}

function sendPingEvent() {
  const curCoding = Tools.storage("l", "get", "coding");
  const pingEvent = {
    eventType: "BANPAI",
    operationType: "BANPAI_PING",
    equipment_number: curCoding || coding.value,
  };
  console.log("Sending ping event");
  sendMessage(JSON.stringify(pingEvent));
}

function reconnect() {
  if (socket.readyState !== WebSocket.OPEN) {
    // 未连接时进行重新连接
    socket.addEventListener("open", () => {
      console.log("Reconnected to server");
    });
    socket = new WebSocket("ws://121.43.179.182:2347");
  }
}

function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error("Socket is not open, message not sent:", message);
  }
}

function closeSocket() {
  socket.close();
}

// 连接到服务器
connectToServer();

// 发送心跳事件
setInterval(sendPingEvent, 3000);
