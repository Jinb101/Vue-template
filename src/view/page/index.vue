<template>
    <div class=" h-full w-full">
        <div v-if="loading"
             class=" h-full w-full custom-loading-svg"
             v-loading="loading"
             :element-loading-svg="svg"
             element-loading-text="Loading..."
             element-loading-svg-view-box="-10, -10, 50, 50"></div>
        <div v-else
             class=" h-full w-full ">
            <div v-if="!Binding"
                 class="h-full w-full theme flex justify-center items-center ">
                <div
                     class=" h-[60%] min-w-[45%] bg-white rounded-2xl shadow-2xl border border-gray-300 p-10 flex flex-col justify-start items-center">
                    <div class="h-1/3 text-2xl text-gray-500 font-semibold flex justify-center items-start">请先绑定班级班牌</div>
                    <div class=" h-1/2 w-full flex justify-between items-center px-[3rem]">
                        <div v-for=" item in coding || curCoding"
                             class="  text-6xl border border-gray-400  px-2 py-2 rounded-2xl">
                            {{ item }}
                        </div>
                    </div>
                    <div class=" text-sm text-blue-300"
                         @click="dialogFormVisible = true">已有班牌？</div>
                    <div class=" h-1/3 w-full text-gray-400 flex flex-col justify-end items-center tracking-wider">
                        请通过 园所端 - 班级列表 绑定
                    </div>
                </div>
            </div>

            <div v-if="Binding && !loading"
                 class=" page flex theme  flex-col justify-between items-center">
                <div class=" h-[6%] w-full flex justify-between items-center">
                    <div class=" flex justify-between items-center text-white">
                        <img :src="ParkInfo.logo || ''"
                             alt=""
                             class=" h-[2rem] w-[2rem]"
                             srcset="">
                        <span class="text-2xl ml-4">{{ ParkInfo.nursery_name }}</span>
                        <span class="text-2xl ml-4"> 丨 </span>
                        <span class=" ml-4">{{ ParkInfo.class_name }}</span>
                    </div>
                    <div class=" flex">
                        <div class=" text-white relative flex justify-start items-center">
                            <el-icon class=" ml-4 absolute  top-0"
                                     size="3rem">
                                <MostlyCloudy v-if='ParkInfo.weather.casts
                                [0].dayweather === "多云" || ParkInfo.weather.casts
                                [0].dayweather === "阴"' />
                                <Sunny v-if='ParkInfo.weather.casts
                                [0].dayweather === "晴"' />
                                <Drizzling v-if='ParkInfo.weather.casts
                                [0].dayweather === "小雨"' />
                            </el-icon>
                            <div class=" flex flex-col justify-center items-center ml">
                                <span class=" text-3xl">{{ ParkInfo.weather.casts
                                [0].daytemp }}°C </span>
                                <span class=" text-sm mt-2"> {{ ParkInfo.weather.casts
                                [0].dayweather }}</span>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center ml-6 tracking-widest">
                            <span class=" text-white text-2xl font-semibold">
                                {{ formattedTime.time }}
                            </span>
                            <span class=" mt-2 text-white font-semibold ">
                                {{ formattedTime.year }}
                            </span>

                        </div>

                    </div>
                </div>

                <div class=" h-[72%] w-full pt-10 flex justify-between items-center">
                    <div class="  w-[30%] h-full flex flex-col justify-between items-center">

                        <div class=" h-1/3 w-full bg-white rounded-2xl relative">
                            <div
                                 class=" absolute top-[-1.5rem] left-[38%] z-10 w-1/4 h-10 theme_no rounded-3xl flex justify-center items-center text-sm">
                                <span>营业膳食</span>
                            </div>
                            <div ref="food"
                                 class="smooth-scroll text-gray-500 font-semibold  rounded-2xl h-full w-full px-2 pt-[9rem] flex flex-col justify-center items-center text-sm overflow-y-auto ">
                                <div class=" max-h-1/2 w-full flex flex-col justify-start items-center mt-2"
                                     v-for=" (re, reIndex) in Dietlist"
                                     :key="reIndex">
                                    <span>{{ re.title }}</span>
                                    <span class=" mt-1">{{ re.content }}</span>
                                </div>
                            </div>
                        </div>

                        <div class=" h-[60%] w-full bg-white rounded-2xl relative py-4 px-4">
                            <div class=" h-1/5 w-full flex justify-center items-center">
                                <div class=" w-[35%] h-full flex justify-between items-center">
                                    <div class="  h-6 w-6 rounded-full p-2 theme_no flex justify-center items-center">
                                        <el-icon color="white"
                                                 size="1rem">
                                            <Bell />
                                        </el-icon>
                                    </div>
                                    <span class=" text-gray-500 font-semibold text-base tracking-wider">通知动态</span>
                                </div>
                            </div>
                            <div class=" h-4/5 w-full overflow-hidden py-2 smooth-scroll"
                                 ref="msgNot">
                                <div v-for=" msg in NoticeData"
                                     :key="msg.key"
                                     class=" h-14 w-full py-1 px-4 text-left border-b border-gray-200 flex justify-between items-center  text-sm">
                                    <div class=" w-1/3 truncate"> {{ msg.title }}</div>
                                    <div> {{ timestampToDateTime(msg.time) }}</div>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div class=" w-[38%] h-full flex flex-col justify-between items-center  ">
                        <div class=" h-full min-h-[70%] w-full bg-white rounded-2xl p-4">
                            <VideoPay :list="[class_video]">
                            </VideoPay>
                        </div>
                        <div class=" w-full bg-white rounded-2xl  relative mt-4"
                             v-if="TeacherData.length > 0">
                            <div class=" h-full w-full flex justify-start items-center px-4 flex-wrap py-4 text-sm">
                                <div class="  mt-2 w-1/3"
                                     v-for='te in TeacherData'
                                     :key="te.id">
                                    <span>{{ te.name }}</span>
                                    <span v-if="te.status === '1'"
                                          class=" ml-4 text-green-400">已到</span>
                                    <span v-else-if="te.status === '2'"
                                          class=" text-gray-400 ml-4">未到</span>
                                    <span v-else-if="te.status === '3'"
                                          class=" text-gray-400 ml-4">迟到</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="  w-[30%] h-full  flex flex-col justify-between items-center">
                        <div class=" h-full w-full bg-white rounded-2xl relative">
                            <div
                                 class=" absolute top-[-1.5rem] left-[38%] z-10 w-1/4 h-10 theme_no rounded-3xl flex justify-center items-center text-sm">
                                <span>幼儿考勤</span>
                            </div>
                            <div class=" h-1/4 w-full flex justify-center items-center">
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-12 w-12 rounded-full flex justify-center items-center bg-cyan-400 text-white">
                                        {{ AttendanceData.should_arrive }}
                                    </div>
                                    <span class=" mt-2 text-green-500">应到</span>
                                </div>
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-12 w-12 rounded-full flex justify-center items-center bg-green-600 text-white">
                                        {{ AttendanceData.realistic_to }}
                                    </div>
                                    <span class=" mt-2 text-green-500">实到</span>
                                </div>
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-12 w-12 rounded-full flex justify-center items-center bg-yellow-500 text-white">
                                        {{ AttendanceData.ask_for_leave }}
                                    </div>
                                    <span class=" mt-2 text-green-500">请假</span>
                                </div>
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-12 w-12 rounded-full flex justify-center items-center bg-amber-600 text-white">
                                        {{ AttendanceData.lack_of_cards }}
                                    </div>
                                    <span class=" mt-2 text-green-500">缺卡</span>
                                </div>
                            </div>
                            <div class=" h-3/4 w-full flex-col justify-start items-center ">
                                <div class="w-full h-full pb-4 ">
                                    <div v-if="filteredAttendanceData.length > 0"
                                         :class="attSec"
                                         class=" pb-4  w-full  ">
                                        <div
                                             class=" w-1/5 text-amber-600 text-right text-sm border border-gray-200 rounded-r-xl px-3">
                                            缺卡
                                        </div>
                                        <div ref="lack"
                                             class="w-full h-[95%] max-h-full flex justify-start items-center flex-wrap px-8 py-1 overflow-y-auto">
                                            <div v-for=" kq in filteredAttendanceData"
                                                 class=" h-6 w-1/3  text-sm flex justify-between items-center  mt-1">
                                                <div class="   ">{{ kq.name }}</div>
                                                <!-- <div :class="kqClass(kq)">{{ statusText(kq) }}</div> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="askAttendanceData.length > 0">
                                        <div
                                             class=" w-1/5 text-yellow-500 text-right text-sm border border-gray-200 rounded-r-xl px-3 ">
                                            请假
                                        </div>
                                        <div
                                             class="w-full flex justify-start items-center flex-wrap px-8 py-1 overflow-y-auto">
                                            <div v-for=" kq in askAttendanceData"
                                                 class=" h-6 w-1/3  text-sm flex justify-between items-center  mt-1">
                                                <div class="   ">{{ kq.name }}</div>
                                                <!-- <div :class="kqClass(kq)">{{ statusText(kq) }}</div> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="reaAttendanceData.length > 0">
                                        <div
                                             class=" w-1/5 text-green-500 text-right text-sm border border-gray-200 rounded-r-xl px-3 ">
                                            实到
                                        </div>
                                        <div ref="real"
                                             class="w-full flex justify-start items-center flex-wrap px-8 py-1  overflow-y-auto ">
                                            <div v-for=" kq in reaAttendanceData"
                                                 class=" h-6 w-1/3  text-sm flex justify-between items-center  mt-1">
                                                <div class="   ">{{ kq.name }}</div>
                                                <!-- <div :class="kqClass(kq)">{{ statusText(kq) }}</div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="h-[20%] w-full flex justify-start items-center relative mt-4">
                    <div
                         class=" w-9 h-[70%] rounded-t-full  rounded-b-full theme_no  flex justify-center items-center vertical-text z-50 text-sm">
                        班级风采
                    </div>
                    <div class="h-full w-full flex overflow-x-auto pl-8 py-2 absolute left-0 top-0 smooth-scroll"
                         v-if="class_style && class_style.length > 0"
                         ref="imgContainer">
                        <div v-for="(url, index) in class_style"
                             :key="url.key"
                             class="border border-indigo-300  ml-4 p-2 rounded-2xl h-full">
                            <div class="rounded-2xl w-[8rem]  overflow-hidden h-full">
                                <el-image :preview-src-list="class_style"
                                          fit="cover"
                                          :src="url.src"
                                          :initial-index="imgIndex"
                                          @show="curIndex(index)"
                                          class="flex-shrink-0 w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                    <div v-else
                         class=" w-full h-full flex justify-center items-center text-gray-400 tracking-wider"> 快去新增相册吧</div>
                </div>
            </div>
        </div>


        <el-dialog v-model="dialogFormVisible"
                   title="绑定班牌">
            <el-form>
                <el-form-item label="您的班牌编码："
                              :label-width="formLabelWidth">
                    <el-input v-model="formCod"
                              autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary"
                               @click="editCod">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { inject, onMounted, ref, unref, watch, nextTick, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as socket from "@/utils/tools/socket.js";
import { useMainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import VideoPay from '@/components/video/VideoPay.vue'

const router = useRouter()
const mainStor = useMainStore();
const { coding, Binding, NoticeData, AttendanceData, loading, RecipesData, class_style, class_video, TeacherData, ParkInfo } = storeToRefs(mainStor);
const Tools = inject("Tools");
const http = inject("http");

const message = ref("");
const receivedMessage = ref("");
const curCoding = Tools.storage("l", "get", "coding");

const imgContainer = ref(null)
const msgNot = ref(null)
const real = ref(null)
const lack = ref(null)
const food = ref(null)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const formCod = ref('')


// time
const formattedTime = ref({
    year: "",
    time: ""
});

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `


const createFingerprint = () => {
    // 浏览器指纹
    const fingerprint = Fingerprint2.get((components) => { // 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
        const values = components.map(component => component.value); // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
        const newValue = CryptoJS.SHA256(murmur).toString(CryptoJS.enc.Hex).substring(0, 8); // 生成 12 位哈希值
        console.log(components);
        console.log(values);
        console.log(murmur);
        console.log(newValue);
        localStorage.setItem('browserId', murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
    });
}

function timestampToDateTime(timestamp) {
    var date = new Date(timestamp * 1); // 使用时间戳创建 Date 对象

    // var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从 0 开始，需要 +1
    var day = ("0" + date.getDate()).slice(-2);

    // var hours = ("0" + date.getHours()).slice(-2);
    // var minutes = ("0" + date.getMinutes()).slice(-2);
    // var seconds = ("0" + date.getSeconds()).slice(-2);

    // var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    var dateTime = month + "-" + day;
    return dateTime;
}


// 当前最新时间
function getCurrentTime() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');

    formattedTime.value = {
        year: year + "-" + month + "-" + day,
        time: hours + ":" + minutes + ":" + seconds
    };
}

const imgIndex = ref(0)

const curIndex = (index) => {
    imgIndex.value = index
}


const editCod = () => {
    // 获取 修改缓存
    Tools.storage("l", "set", "coding", formCod.value);
    coding.value = formCod.value;
    dialogFormVisible.value = false
    Binding.value = true
    loading.value = true
    router.go(0)
    // 刷新
}
// 考勤
const attSec = computed(() => {
    if (filteredAttendanceData.length > 0 && askAttendanceData.length > 0 && reaAttendanceData.length > 0) {
        return ' h-1/3 '
    } else if (filteredAttendanceData.length > 0 && askAttendanceData.length === 0 && reaAttendanceData.length > 0) {
        return ' h-1/2 '
    } else if (filteredAttendanceData.length > 0 || reaAttendanceData.length > 0 || askAttendanceData.length > 0) {
        return ' h-1/3 '
    }
})

// 膳食
const Dietlist = computed(() => {
    return RecipesData.value.recipes ? RecipesData.value.recipes.list : [];
})
// 缺卡
const filteredAttendanceData = computed(() => {
    return AttendanceData.value.list.filter((kq) => kq.status === 3);
})
// 请假
const askAttendanceData = computed(() => {
    return AttendanceData.value.list.filter((kq) => kq.status === 4);
})
// 实到
const reaAttendanceData = computed(() => {
    return AttendanceData.value.list.filter((kq) => kq.status === 1 || kq.status === 5);
})

watch(
    () => coding.value,
    (v) => {
        if (v || curCoding && Binding.value) {
            setTimeout(() => {
                loading.value = false
            }, 1000);
        } else {
            loading.value = false
            Binding.value = false
        }
    },
    { immediate: true }
);


const getWeather = async () => {
    http.post('GetWeather', {
        class_id: ParkInfo.value.class_id
    }).then((res) => {
        ParkInfo.value.weather = res.data.code[0];
    })
}

function autoScroll(el, axis = "y", time = 70) {
    if (!el) return;
    let direction = 1; // 滚动方向，1 为正向，-1 为反向
    let timer = null; // 定时器 ID
    const buffer = 10; // 缓冲距离

    const scroll = () => {
        let parentDom = el;
        // 判断是否有滚动条
        if (axis === "x" && parentDom.scrollWidth <= parentDom.clientWidth) return;
        if (axis === "y" && parentDom.scrollHeight <= parentDom.clientHeight) return;
        // 判断元素是否滚动到边界
        if (axis === "x") {
            if (
                parentDom.scrollLeft + parentDom.clientWidth >=
                parentDom.scrollWidth - buffer
            ) {
                direction = -1; // 触底后改变滚动方向为反向
            } else if (parentDom.scrollLeft <= buffer) {
                direction = 1; // 触顶后改变滚动方向为正向
            }
            parentDom.scrollLeft += direction * 2;
        } else {
            if (
                parentDom.scrollTop + parentDom.clientHeight >=
                parentDom.scrollHeight - buffer
            ) {
                direction = -1; // 触底后改变滚动方向为反向
            } else if (parentDom.scrollTop <= buffer) {
                direction = 1; // 触顶后改变滚动方向为正向
            }
            parentDom.scrollTop += direction * 2;
        }
    };

    const startScroll = () => {
        timer = setInterval(scroll, time); // 每隔 50 毫秒执行一次滚动函数
    };

    const stopScroll = () => {
        clearInterval(timer); // 清除定时器
        timer = null;
    };

    el.addEventListener("mouseenter", stopScroll); // 鼠标进入事件，停止滚动
    el.addEventListener("mouseleave", startScroll); // 鼠标离开事件，开始滚动

    startScroll(); // 初始状态下开始滚动
}


watch(() => imgContainer.value, (v) => {
    if (v && !loading.value && Binding.value) {
        autoScroll(v, 'x')
    }
});
// watch(() => msgNot.value, (v) => {
//     if (v && !loading.value && Binding.value) {
//         autoScroll(v, 'y')
//     }
// });
watch(() => lack.value, (v) => {
    if (v && !loading.value && Binding.value) {
        autoScroll(v, 'y', 150)
    }
});
watch(() => real.value, (v) => {
    if (v && !loading.value && Binding.value) {
        autoScroll(v, 'y')
    }
});
watch(() => food.value, (v) => {
    if (v && !loading.value && Binding.value) {
        autoScroll(v, 'y')
    }
});





getCurrentTime()


//进入全屏
function requestFullScreen() {
    var de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
//退出全屏
function exitFullscreen() {
    var de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
}

onMounted(() => {
    // 点击切换全屏模式


    setInterval(() => {
        getCurrentTime()
    }, 1000);
    setInterval(() => {
        getWeather()
    }, 60 * 60000);
})

// 页面销毁时
onBeforeUnmount(() => {
    closeSocket();
    // 清楚定时器
    clearInterval(getCurrentTime());
    clearInterval(getWeather());
})



</script>

<style scoped lang="less">
.page {
    height: 100%;
    width: 100%;
    padding: 1rem;
}

.theme {
    background: linear-gradient(rgb(105, 67, 242, .7), rgb(171, 149, 241, .4), rgb(199, 181, 243, .2), rgba(255, 255, 255, 0));
}

.theme_no {
    background: linear-gradient(45deg, rgb(105, 67, 242), rgb(171, 149, 241), rgb(199, 181, 243));
    color: white;
}


.vertical-text {
    writing-mode: vertical-rl;
    /* 从上到下，从右到左排列 */
    text-orientation: upright;
    /* 保持文字正常排列 */
}

.weather {
    background-image: url('@/assets/images/weather.jpg');
    background-size: cover;
    /* 保证图片不失真并填充整个容器 */
    background-position: center;
    filter: brightness(92%);
    /* 图片居中显示 */
}

.study {
    background-image: url('@/assets/images/study.jpg');
    background-size: cover;
    /* 保证图片不失真并填充整个容器 */
    background-position: center;
    filter: brightness(92%);
    /* 图片居中显示 */
}

.dine {
    background-image: url('@/assets/images/dine1.jpg');
    background-size: cover;
    /* 保证图片不失真并填充整个容器 */
    background-position: center;
    filter: brightness(92%);
    /* 图片居中显示 */
}

.video-player {
    width: 100%;
    /* 设置视频宽度为容器的 100% */
    height: 100%;
    /* 设置视频高度为容器的 100% */
    border-radius: 6px;
}

.smooth-scroll {
    scroll-behavior: smooth;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

:deep(.el-dialog) {
    border-radius: 30px;
}
</style>
