/**
 * 从 URL 中获取指定参数的值或所有参数
 * @param {string|null} parameter 参数名（可选）。如果为 null，则返回包含所有参数的对象
 * @returns {string|null|Object} 如果指定了参数名，则返回该参数的值；如果未指定参数名但存在参数，则返回包含所有参数的对象；如果不存在参数，则返回 null
 */
export function getUrlParameter(parameter = null) {
    // 获取当前页面的 URL
    const url = window.location.href;
    // 将 URL 解析成包含参数的对象
    const urlParams = new URLSearchParams(new URL(url).search);

    // 如果未指定参数名但存在参数，则返回包含所有参数的对象
    if (parameter === null && urlParams.toString() !== '') {
        const paramsObj = {};
        urlParams.forEach((value, key) => {
            paramsObj[key] = decodeURIComponent(value);
        });
        return paramsObj;
    }

    // 如果指定了参数名，则返回该参数的值
    if (parameter !== null) {
        return decodeURIComponent(urlParams.get(parameter));
    }

    // 如果不存在参数，则返回 null
    return null;
}
