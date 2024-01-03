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
                        <div v-for=" item in coding"
                             class="  text-6xl border border-gray-400  px-2 py-2 rounded-2xl">
                            {{ item }}
                        </div>
                    </div>
                    <div class=" h-1/3 w-full text-gray-400 flex flex-col justify-end items-center tracking-wider">
                        请通过 园所端 - 班级列表 绑定
                    </div>
                </div>
            </div>
            <div v-else
                 class=" page flex theme  flex-col justify-between items-center">

                <div class=" h-[6%] w-full flex justify-between items-center">
                    <div class=" flex justify-between items-center text-white">
                        <img :src="ParkInfo.logo"
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
                                     size="4rem">
                                <MostlyCloudy v-if='iconKey === "1"' />
                                <Sunny v-if='iconKey === "3"' />
                            </el-icon>
                            <div class=" flex flex-col justify-center items-center">
                                <span class=" text-4xl">{{ ParkInfo.weather.casts
                                [0].daytemp }}°C </span>
                                <span class=" text-sm"> {{ ParkInfo.weather.casts
                                [0].dayweather }}</span>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center ml-6 tracking-widest">
                            <span class=" text-white text-2xl font-semibold">
                                {{ formattedTime.time }}
                            </span>
                            <span class=" mt-4 text-white font-semibold ">
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
                            <div
                                 class=" text-gray-500 font-semibold  rounded-2xl h-full w-full px-2 pt-4 flex flex-col justify-center items-center text-sm  ">
                                <div class=" max-h-1/2 w-full flex flex-col justify-start items-center ">
                                    <span>早饭</span>
                                    <span class=" mt-1">牛奶，蛋糕卷，小米粥</span>
                                </div>
                                <div class="  max-h-1/2 w-full flex flex-col justify-start items-center mt-1">
                                    <span>加餐</span>
                                    <span class=" mt-1">樱桃，哈密瓜</span>
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
                            <div class=" h-4/5 w-full overflow-y-auto py-2 ">
                                <div v-for=" msg in NoticeData"
                                     :key="msg.key"
                                     class=" h-12 w-full py-1 px-4 text-left border-b border-gray-200 flex justify-between items-center  text-sm">
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
                                    <span v-if="te.status === '2'"
                                          class=" ml-4 text-green-400">已到</span>
                                    <span v-else
                                          class=" text-gray-400 ml-4">未到</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="  w-[30%] h-full  flex flex-col justify-between items-center">
                        <div class=" h-1/3 w-full bg-white rounded-2xl relative">
                            <div
                                 class=" absolute top-[-1.5rem] left-[38%] z-10 w-1/4 h-10 theme_no rounded-3xl flex justify-center items-center text-sm">
                                <span>幼儿考勤</span>
                            </div>
                            <div class=" h-full w-full rounded-2xl flex justify-center items-center px-4">
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
                        </div>

                        <div class=" h-[60%] w-full bg-white rounded-2xl relative py-4 px-4">
                            <div class=" h-1/5 w-full flex justify-center items-center">
                                <div class=" w-[35%] h-full flex justify-between items-center">
                                    <div class=" h-6 w-6 rounded-full p-2 theme_no flex justify-center items-center">
                                        <el-icon color="white"
                                                 size="1rem">
                                            <Bell />
                                        </el-icon>
                                    </div>
                                    <span class=" text-gray-500 font-semibold text-base tracking-wider">考勤记录</span>
                                </div>
                            </div>
                            <div class=" h-4/5 w-full overflow-y-auto py-2 mt-2 ">
                                <div v-for=" kq in AttendanceData.list"
                                     class=" h-10 w-full py-1 px-4 text-left border-b border-gray-200 flex justify-between items-center  text-sm">
                                    <div class=" w-1/3 truncate ">{{ kq.name }}</div>
                                    <div class=" ">{{ kq.enter_time }}</div>
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
                    <div class="h-full w-full flex overflow-x-auto pl-8 py-2 absolute left-0 top-0">
                        <div v-for="(url, index) in class_style"
                             :key="url"
                             class="border border-indigo-300  ml-4 p-2 rounded-2xl">
                            <div class="rounded-2xl w-[12rem]  overflow-hidden h-full">
                                <el-image :preview-src-list="class_style.length > 0 ? class_style : []"
                                          fit="cover"
                                          :src="url"
                                          :initial-index="imgIndex"
                                          @show="curIndex(index)"
                                          class="flex-shrink-0 w-full h-full object-contain   " />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref, unref, watch, nextTick, onBeforeUnmount } from 'vue'
import * as socket from "@/utils/tools/socket.js";
import { useMainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import VideoPay from '@/components/video/VideoPay.vue'


const mainStor = useMainStore();
const { coding, Binding, NoticeData, AttendanceData, loading, RecipesData, class_style, class_video, TeacherData, ParkInfo } = storeToRefs(mainStor);
const Tools = inject("Tools");
const http = inject("http");

const message = ref("");
const receivedMessage = ref("");
const curCoding = Tools.storage("l", "get", "coding");

const iconKey = ref('0')


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

    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从 0 开始，需要 +1
    var day = ("0" + date.getDate()).slice(-2);

    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);

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



watch(
    () => coding.value,
    (v) => {

        console.log(v, coding, Binding.value, curCoding);
        if (v || curCoding && Binding.value) {
            setTimeout(() => {
                loading.value = false
            }, 1000);
            console.log(loading.value);
        } else {
            loading.value = false
            Binding.value = false
        }
    },
    { immediate: true }
);

// const element = document.documentElement; // 获取整个文档的元素

// if (element.requestFullscreen) {
//   element.requestFullscreen(); // 标准方法
// } else if (element.mozRequestFullScreen) {
//   element.mozRequestFullScreen(); // Firefox
// } else if (element.webkitRequestFullscreen) {
//   element.webkitRequestFullscreen(); // Chrome、Safari 和 Opera
// } else if (element.msRequestFullscreen) {
//   element.msRequestFullscreen(); // IE/Edge
// }
const getWeather = async () => {
    http.post('GetWeather', {
        class_id: ParkInfo.value.class_id
    }).then((res) => {
        ParkInfo.value.weather = res.data.code[0];
        switch (ParkInfo.weather.casts
        [0].dayweather) {
            case '多云':
                iconKey.vlaue = '1'
                break;
            case '阴天':
                iconKey.vlaue = '2'
                break;
            case '晴天':
                iconKey.vlaue = '3'
                break;

            default:
                break;
        }
    })
}

watch(() => ParkInfo.value, (v) => {
    if (v && v.weather) {
        console.log(v);
        switch (v.weather.casts[0].dayweather) {
            case '多云':
                iconKey.value = '1';
                break;
            case '阴天':
                iconKey.value = '2';
                break;
            case '晴天':
                iconKey.value = '3';
                break;
            default:
                break;
        }
    }
});

getCurrentTime()
onMounted(() => {

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
})



</script>

<style scoped>
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
</style>
