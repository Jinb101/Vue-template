import { defineStore } from "pinia";
// 1. 定义容器、导出容器
// 参数 1：容器的 ID，必须是唯一的，后面 Pinia 会把所有的容器挂载到根容器
// 参数 2：一些选项对象，也就是 state、getter 和 action
// 返回值：一个函数，调用即可得到容器实例

export const useMainStore = defineStore("main", {
  // 类似于 Vue2 组件中的 data，用于存储全局状态数据，但有两个要求
  // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
  // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
  state: () => {
    return {
      loading: true,
      // 设备编码
      coding: null,
      // 是否绑定
      Binding: true,
      // 园所信息
      ParkInfo: null,
      // 通知数据
      NoticeData: null,
      // 考勤数据
      AttendanceData: null,
      // 营养食谱数据
      RecipesData: null,
      // 班级风采数据
      class_video: "",
      class_style: [],
      // 老师考勤数据
      TeacherData: null,
    };
  },
  persist: true, // 添加 persist 属性
  getters: {},
  actions: {},
});
