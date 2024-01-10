<template>
    <div :style="videoWrapStyles">
        <video id="my-player"
               ref="videoRef"
               muted
               poster="@/assets/images/1.jpg"
               class="video-js w-full h-full"
               playsinline>
            <source :src="currentSrc" />
        </video>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import { useMainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";

const props = defineProps({
    list: {
        type: Array,
        required: true
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    }
})


const mainStor = useMainStore();
const { videoNum, class_video } = storeToRefs(mainStor);


const videoRef = ref(null)
let videoPlayer = null
let currentSrcIndex = 0

const videoWrapStyles = computed(() => {
    return {
        width: props.width,
        height: props.height
    }
})

const currentSrc = computed(() => {
    if (props.list && props.list.length > 0) {
        return props.list[currentSrcIndex]
    } else {
        return ''
    }
})

const initVideo = () => {
    const options = {
        language: 'zh-CN',
        controls: true,
        preload: 'auto',
        autoplay: true,
        fluid: false,
        sources: [
            {
                src: currentSrc.value,
                type: 'video/mp4'
            }
        ]
    }
    if (videoPlayer) {
        videoPlayer.src({ src: currentSrc.value, type: 'video/mp4' })
    } else if (videoRef.value) {
        videoPlayer = videojs(videoRef.value, options, onPlayerReady)
    }
}

const onPlayerReady = () => {
    nextTick(() => {
        videoRef.value.play() // 在视频准备好后调用 play() 方法
        videoPlayer.on('ended', onVideoEnded)
        videoPlayer.on('error', onVideoError)
    })
}

const onVideoEnded = () => {
    currentSrcIndex = (currentSrcIndex + 1) % props.list.length
    videoPlayer.src({ src: props.list[currentSrcIndex], type: 'video/mp4' })
}

const onVideoError = () => {
    currentSrcIndex = (currentSrcIndex + 1) % props.list.length
    const nextSrc = props.list[currentSrcIndex]
    if (nextSrc) {
        videoPlayer.src({ src: nextSrc, type: 'video/mp4' })
    } else {
        console.log('No more videos to play.')
        // 可以根据需求处理没有更多视频的情况，例如停止播放或显示错误信息等
    }
}

watch(
    () => videoNum.value,
    (v, old) => {
        nextTick(() => {
            if (v > old) {
                currentSrcIndex = 0
                currentSrc.value = class_video.value
            }

        })
    }
)

onMounted(() => {
    initVideo()
})

onBeforeUnmount(() => {
    if (videoPlayer) {
        videoPlayer.dispose()
    }
})
</script>

<style lang="scss" scoped>
.w-full {
    width: 100%;
}

.h-full {
    height: 100%;
}

#my-player {
    border-radius: 6px;
}

video::-webkit-media-controls-overlay-play-button {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
}

video::-webkit-media-controls-start-playback-button {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
    position: relative;
    top: -30px;
    left: calc(50% - 30px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

video::-webkit-media-controls-start-playback-button:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
