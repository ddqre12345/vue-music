/** 播放次数处理，当播放次数大于10w级时已w为单位，当播放次数小于10w，正常显示播放次数
 * @param {string} count 需要格式化的时间
 * */
exports.playCount = (count) => {
  let wCount = parseInt(count / 100000);
  if (wCount > 0) {
    return wCount + '万';
  } else {
    return count;
  }
};

exports.mainColor = (src) => {
  // Helper functions.
  let getImageData = function(src, loaded) {
    let imgObj = new Image();
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    imgObj.crossOrigin = 'Anonymous';
    imgObj.onload = function() {
      canvas.width = imgObj.width;
      canvas.height = imgObj.height;
      ctx.drawImage(imgObj, 0, 0);
      localStorage.setItem('savedImageData', canvas.toDataURL('image/pn'));
      let imageData = ctx.getImageData(0, 0, imgObj.width, imgObj.height);
      loaded && loaded(imageData.data);
    };
    imgObj.src = src;
    // make sure the load event fires for cached images too
    if (imgObj.complete || imgObj.complete === undefined) {
      imgObj.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      imgObj.src = src;
    }
  };

  let makeRGB = function(name) {
    return ['rgb(', name, ')'].join('');
  };

  let mapPalette = function(palette) {
    let arr = [];
    for (let prop in palette) {
      arr.push(frmtPobj(prop, palette[prop]));
    }
    arr.sort(function(a, b) {
      return (b.count - a.count);
    });
    return arr;
  };

  let fitPalette = function(arr, fitSize) {
    if (arr.length > fitSize) {
      return arr.slice(0, fitSize);
    } else {
      for (let i = arr.length - 1; i < fitSize - 1; i++) {
        arr.push(frmtPobj('0,0,0', 0));
      }
      return arr;
    }
  };

  let frmtPobj = function(a, b) {
    return {
      name: makeRGB(a),
      count: b
    };
  };

  getImageData(src, function(data) {
    console.log('进入函数');
    let exclude = [] || ['0,0,0', '255,255,255']; // for example, to exclude white and black:
    let paletteSize = 30;
    let colorCounts = {};
    let rgbString = '';
    let rgb = [];

    for (let i = 0; i < data.length; i += 4) {
      rgb[0] = data[i];
      rgb[1] = data[i + 1];
      rgb[2] = data[i + 2];
      rgbString = rgb.join(',');

      // skip undefined data and transparent pixels
      if ((rgb.indexOf(undefined) !== -1) || (data[i + 3] === 0)) {
        continue;
      }

      // Ignore those colors in the exclude list.
      if (exclude.indexOf(makeRGB(rgbString)) === -1) {
        if (rgbString in colorCounts) {
          colorCounts[rgbString] = colorCounts[rgbString] + 1;
        } else {
          colorCounts[rgbString] = 1;
        }
      }
    }
    let palette = fitPalette(mapPalette(colorCounts), paletteSize + 1);
    console.log(palette[0].name);
  });
};
