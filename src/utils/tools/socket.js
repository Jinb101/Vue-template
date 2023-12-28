// import Fingerprint2 from "fingerprintjs2"; // 引入 fingerprintjs2
import { useMainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
// 工具类
import * as Tools from "@/utils/tools/index.js";

// if (window.requestIdleCallback) {
//   requestIdleCallback(() => {
//     createFingerprint();
//   });
// } else {
//   setTimeout(() => {
//     createFingerprint();
//   }, 500);
// }

const mainStor = useMainStore();
const { coding } = storeToRefs(mainStor);

const socket = new WebSocket("ws://121.43.179.182:2347");

socket.addEventListener("open", () => {
  console.log("Connected to server");
  const curCoding = Tools.storage("l", "get", "coding");
  // 发送登录事件
  const loginEvent = {
    eventType: "BANPAI",
    operationType: "BANPAI_LOGIN",
    equipment_number:
      curCoding || coding.value ? curCoding || coding.value : "",
  };
  socket.send(JSON.stringify(loginEvent));
});

socket.addEventListener("message", (event) => {
  console.log("Received data:", event.data);
  // 处理服务端返回的数据
  const data = JSON.parse(event.data);
  console.log(data.eventType);
  if (data.eventType === "ERROR") {
    mainStor.coding = data.equipment_number;
    mainStor.Binding = false;
    Tools.storage("l", "set", "coding", data.equipment_number);
    console.log(mainStor.coding);
    console.log("Equipment number:", data.equipment_number);
    // 存储 展示
  } else if (data.eventType === "notice") {
    console.log("Notice data:", data);
  } else if (data.eventType === "recipes") {
    console.log("Nutrition recipes data:", data);
  } else if (data.eventType === "attendance") {
    console.log("Child attendance data:", data);
  } else if (data.eventType === "class_style") {
    console.log("Class style data:", data);
  }
});

socket.addEventListener("close", () => {
  console.log("Connection closed, attempting to reconnect...");
  reconnect();
});

socket.addEventListener("error", (error) => {
  console.error("Socket error:", error);
  reconnect();
});

// 发送心跳事件
setInterval(() => {
  const curCoding = Tools.storage("l", "get", "coding");
  const pingEvent = {
    eventType: "BANPAI",
    operationType: "BANPAI_PING",
    // equipment_number: coding,
    equipment_number:
      curCoding || coding.value ? curCoding || coding.value : "",
  };
  socket.send(JSON.stringify(pingEvent));
}, 30000);

// 重新连接
function reconnect() {
  if (socket.readyState !== WebSocket.OPEN) {
    // 未连接时进行重新连接
    socket.addEventListener("open", () => {
      console.log("Reconnected to server");
    });
    socket = new WebSocket("ws://121.43.179.182");
  }
}

// 发送消息
export function sendMessage(message) {
  socket.send(message);
}

// 关闭连接
export function closeSocket() {
  socket.close();
}
