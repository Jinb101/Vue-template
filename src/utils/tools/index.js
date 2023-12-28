import CryptoJS from "crypto-js";

/**
 * 存储参数获取
 * @param {string} storageType - 存储类型（"local" 或 "session" 或 "l" 或 "s"）
 * @param {string} action - 获取或修改
 * @param {string} name - 名称
 * @param {object} value - 数值
 */
export function storage(storageType, action, name, value) {
  let storage;
  if (storageType === "local" || storageType === "l") {
    storage = localStorage;
  } else if (storageType === "session" || storageType === "s") {
    storage = sessionStorage;
  } else {
    console.error(
      "Invalid storage type. Please use 'local', 'session', 'l', or 's'."
    );
    return;
  }

  switch (action) {
    case "get":
      // 从存储获取数据
      const data = storage.getItem(name);
      return data ? JSON.parse(data) : null; // 如果没有获取到结果，返回 null
    case "set":
      // 存储数据到存储
      storage.setItem(name, JSON.stringify(value));
      break;
    default:
      // 操作类型错误
      console.error('Invalid action type. Please use "get" or "set".');
  }
}

/**
 * url 参数获取
 * @param {string} key - 参数名称
 * @returns {Promise<string>} - 参数值的 Promise，如果不存在则返回错误
 */
export function getUrlParam(key) {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(key);
    if (value === null) {
      //   reject(new Error(`返回原页面重试`));
    } else {
      resolve(value);
    }
  });
}

/**
 * 防抖
 * @param {function} fn - 回调
 * @param {number} delay - 时间
 */
export function debounce(fn, delay) {
  delay = delay || 1000; //默认 1s 后执行
  let timer = null;
  return function () {
    let context = this;
    let arg = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, arg);
    }, delay);
  };
}

/**
 * 压缩图片
 * @param {File} imageFile - 要压缩的图片文件
 * @returns {Promise<File>} - 返回压缩后的图片文件
 */
export function compressImage(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 假设将图片调整为宽度为 800 像素
        const targetWidth = 800;
        const targetHeight = (img.height / img.width) * targetWidth;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(
          (blob) => {
            const compressedImage = new File(
              [blob],
              `compressed_${imageFile.name}`,
              {
                type: "image/jpeg",
                lastModified: Date.now(),
              }
            );

            // 假设压缩后的文件大小为原文件大小的一半
            compressedImage.customSize = imageFile.size / 2;

            console.log("图片压缩成功");
            resolve(compressedImage);
          },
          "image/jpeg",
          0.2
        ); // 压缩质量为 70%
      };
    };
  });
}

/**
 * 压缩视频
 * @param {File} videoFile - 要压缩的视频文件
 * @returns {Promise<File>} - 返回压缩后的视频文件
 */
// export function compressVideo(videoFile) {
//   return new Promise((resolve, reject) => {
//     const mediaSource = new MediaSource();
//     const video = document.createElement("video");
//     video.src = URL.createObjectURL(videoFile);
//     video.onloadedmetadata = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       // 假设将视频调整为宽度为 800 像素
//       const targetWidth = 800;
//       const targetHeight = (video.videoHeight / video.videoWidth) * targetWidth;

//       canvas.width = targetWidth;
//       canvas.height = targetHeight;

//       const stream = canvas.captureStream();
//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: "video/webm; codecs=vp9",
//       });

//       const chunks = [];
//       mediaRecorder.ondataavailable = (event) => {
//         chunks.push(event.data);
//       };

//       mediaRecorder.onstop = () => {
//         const compressedVideo = new Blob(chunks, {
//           type: "video/webm",
//         });

//         const url = URL.createObjectURL(compressedVideo);
//         const compressedVideoFile = new File(
//           [compressedVideo],
//           `compressed_${videoFile.name}`,
//           {
//             type: "video/webm",
//             lastModified: Date.now(),
//           }
//         );

//         // 假设压缩后的文件大小为原文件大小的一半
//         compressedVideoFile.customSize = videoFile.size / 2;
//         console.log("视频压缩成功");
//         resolve(compressedVideoFile);
//       };

//       video.play();
//       mediaRecorder.start();
//       setTimeout(() => {
//         mediaRecorder.stop();
//         video.pause();
//         stream.getTracks().forEach((track) => {
//           track.stop();
//         });
//       }, 5000); // 假设压缩时长为 5 秒
//     };
//   });
// }

/**
 * 压缩文件
 * @param {File} file - 要压缩的文件
 * @returns {Promise<File|null>} - 返回压缩后的文件，如果不支持的文件类型则返回 null
 */
export function compressFile(file) {
  console.log(`正在压缩文件：${file.name}`);
  let compressedFile;
  if (file.type.includes("image")) {
    return compressImage(file);
  } else if (file.type.includes("video")) {
    return compressVideo(file);
  } else {
    console.log("不支持的文件类型");
    return null;
  }
}

/**
 * 随机生成函数
 * @returns {object} 返回包含三个方法的对象：mock、vars、produce
 */
export function myRandom() {
  // 定义辅助函数，生成指定范围内的随机整数
  const generateRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // mock 方法
  const mock = (t, n) => {
    t = isNaN(t) ? Math.random() : t;
    n = isNaN(n) ? Math.random() : n;
    let r = "qwertyuiopasdfghjklzxcvbnm",
      o = "0123456789",
      i =
        t > 0.5
          ? r.charAt(generateRandomInt(0, r.length - 1))
          : o.charAt(generateRandomInt(0, o.length - 1));
    return n > 0.5 ? i.toUpperCase() : i.toLowerCase();
  };

  // vars 方法
  const vars = (e) => {
    e = isNaN(e) ? 6 : e;
    e = e < 1 ? 1 : e;
    let n = mock(1);
    for (let r = 0; r < e - 1; r++) n += mock();
    return n;
  };

  // produce 方法
  const produce = (t, o) => {
    let i = t || vars(),
      a = this.$obj(this.fictitious[i], 1);
    return a === 7
      ? ((this.fictitious[i] = 0), i)
      : a === 1
      ? (o ? (this.fictitious[i] = 0) : this.fictitious[i]++, i)
      : produce();
  };

  return {
    mock,
    vars,
    produce,
  };
}
/**
 * 加密解密
 * @param {string} key - 加密密钥
 * @param {string} val - 要加密或解密的数据
 * @param {boolean} type - 加密或解密的类型，true 为解密，false 为加密
 * @returns {string} - 返回加密或解密后的数据
 */
export function md5(key, val, type) {
  if (typeof CryptoJS !== "object") {
    return val;
  }
  val = val.replace(/\s/g, ""); // 去除空格
  if (!!type) {
    // 解
    let decData = CryptoJS.enc.Base64.parse(val).toString(CryptoJS.enc.Utf8);
    let decJson = CryptoJS.AES.decrypt(decData, key).toString(
      CryptoJS.enc.Utf8
    );
    return decJson;
  } else {
    let encJson = CryptoJS.AES.encrypt(val, key).toString();
    let encData = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encJson)
    );
    return encData;
  }
}
/**
 *   url:访问地址 加密
 * @param {object} data - 要加密的数据
 * @param {string} url - 访问地址
 * @param {string} type - 加密类型，默认为"web"
 * @param {string} join - 连接加密结果和密钥的分隔符，默认为"_____"
 * @returns {string} - 返回加密后的数据
 */
export function encrypt(data, url, type = "web", join = "_____") {
  let o = {
    type,
    data,
    url,
  };
  let random = myRandom();
  let k = random.vars();
  let c = md5(k, JSON.stringify(o), 0);
  return [encodeURIComponent(c), k].join(join);
}
/**
 * 解密
 * @param {string} encrypt - 要解密的数据
 * @param {string} join - 连接加密结果和密钥的分隔符，默认为"_____"
 * @returns {object} - 返回解密后的数据
 */
export function decrypt(encrypt, join = "_____") {
  let m = decodeURIComponent(encrypt).split(join);
  let data = md5(m[1], m[0], 1);
  try {
    data = JSON.parse(data);
  } catch (e) {
    data = {};
  }
  return data;
}

/**
 * uuid
 * @returns {String} - uuid
 */

export function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 将 Base64 编码的字符串转换为文件对象
 * @param {String} base64String - Base64 编码的字符串
 * @returns {File} - 表示 Base64 编码的字符串的文件对象
 */
export function base64ToFile(base64String) {
  const byteString = atob(base64String.split(",")[1]);

  // 解码后的字符串转换为 ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // 生成一个随机的文件名
  const fileName = getUUID() + ".png";

  // 创建一个文件对象
  const file = new File([ab], fileName, { type: "image/png" });

  return file;
}
