/** 次数处理，当次数大于10w级时已w为单位，当播放次数小于10w，正常显示次数
 * @param {string} count
 * */
exports.countHandle = (count) => {
  let wCount = parseInt(count / 100000);
  if (wCount > 0) {
    return wCount + '万';
  } else {
    return count;
  }
};
