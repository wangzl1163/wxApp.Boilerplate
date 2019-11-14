function ImgUtil() {
   /**
    * 获取图片尺寸
    */
   this.getImgSize = function(filePath, orderNumber) {
      return new Promise((resolve, reject) => {
         wx.getFileInfo({
            filePath: filePath,
            success: function(res) {
               return resolve({
                  size: res.size,
                  originalPath: filePath,
                  orderNumber: orderNumber || 0
               });
            },
            fail: function(res) {
               return reject(res);
            }
         });
      });
   }

   /**
    * 获取图片文件信息
    */
   this.getImgInfo = function(filePath) {
      return new Promise((resolve, reject) => {
         wx.getImageInfo({
            src: filePath,
            success: function(res) {
               return resolve(res);
            }
         });
      });
   }

   // 目标大小与原大小的比值
   this.getSizeRatio = function(target, source) {
      return target * 1.0 / source;
   }

   /**
    * 获取等比例缩放的宽高
    */
   this.getUniformScaleInfo = function(originalW, originalH, quality, fixed) {
      /**
       * 图片压缩策略
       * 
       * a，图片宽或者高均小于或等于fixed时根据quality参数处理，得到小尺寸图片
       * b，宽或者高大于fixed，但是图片宽度高度比小于或等于2，则将图片宽或者高取大的等比压缩至fixed
       * c，宽或者高大于fixed，但是图片宽高比大于2时，并且宽以及高均大于fixed，则宽或者高取小的等比压缩至fixed
       * d，宽或者高大于fixed，但是图片宽高比大于2时，并且宽或者高其中一个小于fixed，则根据quality参数处理，得到小尺寸图片
       * 
       * fixed：推荐1280
       */

      //宽/高比
      var ratio = originalW * 1.0 / originalH;
      var newImgInfo = {
         newW: 0,
         newH: 0
      }

      if (originalW <= fixed && originalH <= fixed) {
         newImgInfo.newW = Math.ceil(originalW * quality);
         newImgInfo.newH = Math.ceil(originalH * quality);
      } else if (originalW > fixed || originalH > fixed) {
         if (ratio <= 2) {
            if (originalW > originalH) {
               newImgInfo.newW = fixed;
               newImgInfo.newH = newImgInfo.newW / ratio;
            } else {
               newImgInfo.newH = fixed;
               newImgInfo.newW = newImgInfo.newH * ratio;
            }
         } else {
            if (originalW > fixed && originalH > fixed) {
               if (originalW > originalH) {
                  newImgInfo.newH = fixed;
                  newImgInfo.newW = newImgInfo.newH * ratio;
               } else {
                  newImgInfo.newW = fixed;
                  newImgInfo.newH = newImgInfo.newW / ratio;
               }
            } else {
               newImgInfo.newW = Math.ceil(originalW * quality);
               newImgInfo.newH = Math.ceil(originalH * quality);
            }
         }
      }

      return newImgInfo;
   }

   /**
    * 指定缩放比例获取等比例宽高
    */
   this.getUniformScaleInfoByQuality = function(originalW, originalH, quality) {
      var newImgInfo = {
         newW: 0,
         newH: 0
      };

      newImgInfo.newW = Math.ceil(originalW * quality);
      newImgInfo.newH = Math.ceil(originalH * quality);

      return newImgInfo;
   }
}

ImgUtil.prototype = {
   constructor: ImgUtil
}

module.exports = ImgUtil;