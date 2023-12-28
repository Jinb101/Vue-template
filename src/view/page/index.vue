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
                     class=" h-[60%] min-w-[45%] bg-white rounded-2xl shadow-2xl p-10 flex flex-col justify-start items-center">
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

                <div class=" h-[10%] w-full flex justify-between items-center">
                    <div class=" flex justify-between items-center text-white">
                        <img src="@/assets/images/logo.png"
                             alt=""
                             srcset="">
                        <span class="text-2xl ml-4">圣诞工学幼儿园</span>
                        <span class="text-2xl ml-4"> 丨 </span>
                        <span class=" ml-4">幼儿班</span>
                    </div>
                    <div class=" flex">
                        <div class=" text-white relative flex justify-start items-center">
                            <el-icon class=" ml-4 absolute  top-0"
                                     size="4rem">
                                <MostlyCloudy />
                            </el-icon>
                            <div class=" flex flex-col justify-center items-center">
                                <span class=" text-4xl">15°C </span>
                                <span class=" text-sm"> 多云</span>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center ml-6">
                            <span class=" text-white text-2xl font-semibold">
                                10:10
                            </span>
                            <span class=" mt-4 text-white font-semibold">
                                2023-12-22
                            </span>

                        </div>

                    </div>
                </div>

                <div class=" h-[70%] w-full pt-10 flex justify-between items-center">
                    <div class="  w-[30%] h-full flex flex-col justify-between items-center">

                        <div class=" h-1/3 w-full bg-white rounded-2xl relative">
                            <div
                                 class=" absolute top-[-1.5rem] left-[38%] z-10 w-1/4 h-12 theme_no rounded-3xl flex justify-center items-center">
                                <span>营业膳食</span>
                            </div>
                            <div
                                 class=" text-gray-500 font-semibold  rounded-2xl h-full w-full px-2 pt-4 flex flex-col justify-center items-center text-xl ">
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
                                    <div class="  h-10 w-10 rounded-full p-2 theme_no flex justify-center items-center">
                                        <el-icon color="white"
                                                 size="1.3rem">
                                            <Bell />
                                        </el-icon>
                                    </div>
                                    <span class=" text-gray-500 font-semibold tracking-wider">通知动态</span>
                                </div>
                            </div>
                            <div class=" h-4/5 w-full overflow-y-auto py-2 ">
                                <div v-for=" msg in notification"
                                     :key="msg.key"
                                     class=" h-12 w-full py-1 px-4 text-left border-b border-gray-200 flex justify-between items-center">
                                    <span> {{ msg.title }}</span>
                                    <span> {{ msg.time ? msg.time : ' 1-12 ' }}</span>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div class=" w-[38%] h-full flex flex-col justify-between items-center  ">

                        <div class=" h-[35%] w-full bg-white rounded-2xl  relative">
                            <div
                                 class=" absolute top-[-1.5rem] left-[38%] z-10 w-1/4 h-12 theme_no rounded-3xl flex justify-center items-center">
                                <span>教师考勤</span>
                            </div>
                            <div class=" h-full w-full flex justify-start items-center">
                                <div class=" ml-4 mt-2">
                                    <span>张老师</span>
                                    <span class=" ml-4">未到</span>
                                </div>
                                <div class=" ml-4 mt-2">
                                    <span>张老师</span>
                                    <span class=" ml-4">未到</span>
                                </div>
                                <div class=" ml-4 mt-2">
                                    <span>张老师</span>
                                    <span class=" ml-4">未到</span>
                                </div>
                                <div class=" ml-4 mt-2">
                                    <span>张老师</span>
                                    <span class=" ml-4">未到</span>
                                </div>
                            </div>
                        </div>
                        <div class=" h-[62%] w-full bg-white rounded-2xl p-4">
                            <VideoPay :list="list">
                            </VideoPay>
                        </div>
                    </div>

                    <div class="  w-[30%] h-full  flex flex-col justify-between items-center">
                        <div class=" h-1/3 w-full bg-white rounded-2xl relative">
                            <div
                                 class=" absolute top-[-1.5rem] left-[38%] z-10 w-1/4 h-12 theme_no rounded-3xl flex justify-center items-center">
                                <span>幼儿考勤</span>
                            </div>
                            <div class=" h-full w-full rounded-2xl flex justify-center items-center px-4">
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-16 w-16 rounded-full flex justify-center items-center bg-cyan-400 text-white">
                                        55
                                    </div>
                                    <span class=" mt-2 text-green-500">应到</span>
                                </div>
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-16 w-16 rounded-full flex justify-center items-center bg-green-600 text-white">
                                        55
                                    </div>
                                    <span class=" mt-2 text-green-500">实到</span>
                                </div>
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-16 w-16 rounded-full flex justify-center items-center bg-yellow-500 text-white">
                                        55
                                    </div>
                                    <span class=" mt-2 text-green-500">请假</span>
                                </div>
                                <div class="  w-1/4 flex flex-col justify-between items-center">
                                    <div
                                         class=" h-16 w-16 rounded-full flex justify-center items-center bg-amber-600 text-white">
                                        55
                                    </div>
                                    <span class=" mt-2 text-green-500">缺卡</span>
                                </div>
                            </div>
                        </div>

                        <div class=" h-[60%] w-full bg-white rounded-2xl relative py-4 px-4">
                            <div class=" h-1/5 w-full flex justify-center items-center">
                                <div class=" w-[35%] h-full flex justify-between items-center">
                                    <div class=" h-10 w-10 rounded-full p-2 theme_no flex justify-center items-center">
                                        <el-icon color="white"
                                                 size="1.3rem">
                                            <Bell />
                                        </el-icon>
                                    </div>
                                    <span class=" text-gray-500 font-semibold tracking-wider">考勤记录</span>
                                </div>
                            </div>
                            <div class=" h-4/5 w-full overflow-y-auto py-2 mt-2 ">
                                <div v-for=" kq in kqjv"
                                     class=" h-12 flex justify-start items-center px-4">
                                    <div class=" w-1/5">{{ kq.name }}</div>
                                    <div class=" w-full">{{ kq.time }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="h-[20%] w-full flex justify-start items-center relative mt-4">
                    <div
                         class=" w-10 h-[70%] rounded-t-full  rounded-b-full theme_no  flex justify-center items-center vertical-text z-50">
                        班级风采
                    </div>
                    <div class="h-full w-full flex overflow-x-auto pl-8 py-2 absolute left-0 top-0">
                        <div v-for="(url, index) in urls"
                             :key="url"
                             class="border border-indigo-300  ml-4 p-2 rounded-2xl">
                            <div class="rounded-2xl w-[12rem]  overflow-hidden h-full">
                                <el-image :preview-src-list="urls"
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
import { inject, onMounted, ref, unref, watch, nextTick } from 'vue'
import { sendMessage, closeSocket } from "@/utils/tools/socket.js";
import { useMainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import VideoPay from '@/components/video/VideoPay.vue'


const mainStor = useMainStore();
const { coding, Binding } = storeToRefs(mainStor);

const message = ref("");
const receivedMessage = ref("");

const loading = ref(false)
const msgLoading = ref(false)
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



let kqjv = [
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
    {
        name: '娃娃',
        time: '2023-12-22   10:12'
    },
]

let list = [
    'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    'http://vjs.zencdn.net/v/oceans.mp4',
    'https://media.w3.org/2010/05/sintel/trailer.mp4',
    'https://ugcbsy.qq.com/uwMROfz2r57AoaQXGdGnC2deB3dYv4oNCBdVbCXSmvjDwMX6/szg_84102919_50001_1a1dfbbc8eea4b2a963121d09e2d48b1.f622.mp4?sdtfrom=v1104&guid=8f30590cd87bbd6f86e30a9dd8ab213f&vkey=10BA556F24F5D69A6C0053C2171FEA54BA9FC6C2B809FB2F4A7429170394489CFBAFA9D18D79C0FB01E1E1B3572ECD20BB8DB8F0E884E476124A31EC5036C3932E942ADD94E5F8A927EF0AF7FACBB5995B29CEBA366F7AA7F5527AB1BD1A16B45569865D17DDFAA006933982EF5334F5502409E1DB977E3480305C118379CB55',
]

const urls = [
    '/src/assets/images/1.jpg',
    '/src/assets/images/2.jpg',
    '/src/assets/images/3.jpg',
    '/src/assets/images/4.jpg',
    '/src/assets/images/5.jpg',
    '/src/assets/images/6.jpg',
    '/src/assets/images/7.jpg',
    '/src/assets/images/8.jpg',
    '/src/assets/images/9.jpg',
]

let notification = [
    {
        key: 1,
        title: '开学啦！'
    },
    {
        key: 2,
        title: '关于元旦放假'
    },
    {
        key: 3,
        title: '瞧！孩子们游戏表征在杯子上'
    },
    {
        key: 4,
        title: '瞧！孩子们游戏表征在杯子上'
    },
    {
        key: 5,
        title: '瞧！孩子们游戏表征在杯子上'
    },
    {
        key: 6,
        title: '瞧！孩子们游戏表征在杯子上'
    },
    {
        key: 7,
        title: '瞧！孩子们游戏表征在杯子上'
    },
    {
        key: 8,
        title: '瞧！孩子们游戏表征在杯子上'
    },
    {
        key: 9,
        title: '瞧！孩子们游戏表征在杯子上'
    },
    {
        key: 10,
        title: '瞧！孩子们游戏表征在杯子上'
    },
]

const imgIndex = ref(0)

const curIndex = (index) => {
    imgIndex.value = index
}



watch(
    () => coding.value,
    (v) => {
        console.log(v);
        if (v && Binding.value) {
            loading.value = false
            msgLoading.value = false
        } else {
            msgLoading.value = true
        }
    },
    { immediate: true }
);



onMounted(() => {

})




</script>

<style scoped>
.page {
    height: 100%;
    width: 100%;
    padding: .8rem;
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
