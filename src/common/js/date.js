/** 格式化时间
 *  @param {string} date 需要格式化的时间
 *  @param {string} fmt 想要格式化的格式
 */
exports.formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
/** 格式化时间，返回年，月，日
 *  @param {string } date 需要格式化的时间
 */
exports.objectDate = (date) => {
    if (date && typeof date === 'string') {
        date = new Date(date);
        let o = {
            'Y': date.getFullYear(),
            'M': date.getMonth() + 1,
            'D': date.getDate()
        };
        return o;
    }
    return date;
};

/** 格式化时间，返回时间差，年，月，日
 * @param {string} date 需要格式化的时间
* */
exports.timeDiff = (date) => {
    // 开始时间
    let startTime = date;
    // 结束时间
    let endTime = new Date();
    // 时间差的毫秒数
    let timeDifferent = endTime.getTime() - new Date(startTime).getTime();

    function filter(value, index) {
        return compare(value, index) ? filter(compare(value, index), (index + 1)) : describe(value, index);
    }

    function compare(value, index) {
        switch (index) {
            case 0:return parseInt(value / 60);
            case 1:return parseInt(value / 60);
            case 2:return parseInt(value / 24);
            case 3:return parseInt(value / 30);
            case 4:return parseInt(value / 12);
        }
    }

    function describe(value, index) {
        switch (index) {
            case 0:return (value + '秒前');
            case 1:return (value + '分钟前');
            case 2:return (value + '小时前');
            case 3:return (value + '天前');
            case 4:return (value + '月前');
            case 5:return (value + '年前');
        }
    }
    return filter(timeDifferent / 1000, 0);
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
