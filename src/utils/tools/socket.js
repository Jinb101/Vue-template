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
  socket = new WebSocket("wss://www.jsxrk.xin:2347");

  socket.addEventListener("open", () => {
    console.log("Connected to server");
    sendLoginEvent();
    mainStore.Binding = true;
    setTimeout(() => {
      mainStore.loading = false;
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
  const wehCodng = Tools.storage("l", "get", "coding", {});
  switch (data.eventType) {
    case type.ERROR:
      mainStore.Binding = false;
      mainStore.loading = false;
      break;
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
      console.log(mainStore.AttendanceData);
      const curAtt = data.data;
      const index = mainStore.AttendanceData.list.findIndex(
        (item) => item.id === curAtt.id
      );
      if (index !== -1) {
        mainStore.AttendanceData.list[index] = curAtt;
        if (curAtt.status === 1 || curAtt.status === 5) {
          mainStore.AttendanceData.realistic_to++;
          mainStore.AttendanceData.lack_of_cards--;
        } else if (curAtt.status === 4) {
          mainStore.AttendanceData.ask_for_leave++;
          mainStore.AttendanceData.lack_of_cards--;
        } else if (curAtt.status === 3) {
          mainStore.AttendanceData.lack_of_cards++;
          mainStore.AttendanceData.realistic_to--;
        }
        console.log("修改成功");
      }
      console.log("单条幼儿考勤 data:", mainStore.AttendanceData, data);
      break;
    case type.CLASS_STYLE:
      if (data.class_type === "increase") {
        // 图片新增
        const keys = Object.keys(data.data);
        const key = keys[0];
        mainStore.class_style.unshift({
          key: key,
          src: data.data[key],
        });
        break;
      } else if (data.class_type === "delete") {
        const id = data.data.class_style_id;
        console.log(mainStore.class_style);
        const index = mainStore.class_style.findIndex(
          (item) => item.key * 1 === id
        );
        if (index !== -1) {
          mainStore.class_style.splice(index, 1);
          console.log("删除成功");
        } else {
          console.log("未找到相应的元素");
        }
        console.log(data);
        break;
      }
      if (data.class_type) {
        return;
      }
      let style = data.data.class_style;
      for (const key in style) {
        mainStore.class_style.push({
          key: key,
          src: style[key],
        });
        console.log(key, style[key], mainStore.class_style);
      }
      mainStore.class_video = data.data.class_video;
      break;
    case type.CLASSVIDE:
      mainStore.class_video = data.data;
      mainStore.videoNum++;
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
      mainStore.loading = false;
      console.log("BindDing data:", data);
      break;
    case type.TEACHER:
      mainStore.TeacherData = data.data;
      console.log("老师考勤  data:", data);
      break;
    case type.SINGLE_TEACHER:
      console.log(mainStore.TeacherData);
      const curTe = data.data;
      const teIndex = mainStore.TeacherData.value.findIndex(
        (item) => item.id === curTe.id
      );
      if (teIndex !== -1) {
        mainStore.TeacherData.value[index] = curAtt;
        console.log("修改成功");
      }
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
  console.log("pin");
  sendMessage(JSON.stringify(pingEvent));
}

function reconnect() {
  if (socket.readyState !== WebSocket.OPEN) {
    // 未连接时进行重新连接
    socket.addEventListener("open", () => {
      console.log("Reconnected to server");
    });
    socket = new WebSocket("wss://www.jsxrk.xin:2347");
  }
}

function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    reconnect();
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

export { sendLoginEvent, reconnect };
