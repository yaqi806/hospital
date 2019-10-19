// pages/mine/upload/upload.js
import WxValidate from '../../../utils/WxValidate.js'
var Validate;
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    chooseFile:[],
    deleteIndex:-1,
    piId:-10,
    maskShow:false
  },

  plusPhoto:function(){
    var that=this;
    var imgArr=this.data.chooseFile;
    wx.chooseImage({
      count:9,
      sourceType:['album','camera'],
      success:function(res){
        that.setData({
          chooseFile:imgArr.concat(res.tempFilePaths)
        })
      }
    })
     
  },

  deleteImage:function(e){
    var num=e.currentTarget.dataset.imgId;
    console.log(num);
    var that=this;
    this.setData({
      deleteIndex:num
    });
    this.data.chooseFile.splice(num,1);
    setTimeout(function(){
      that.setData({
        deleteIndex:-1,
        chooseFile: that.data.chooseFile
      })
    },700)
  },

  cancelUpload:function(){
    wx.switchTab({
      url: '../../mine/mine',
    })
  },

  // 上传照片和照片信息
  formSubmit:function(e){
    var that=this;
    var reports = e.detail.value.reports;
    var descriptions=e.detail.value.descriptions;
    var others=e.detail.value.others;

    if (!Validate.checkForm(e.detail.value)) {
        const error = Validate.errorList[0];
        wx.showToast({
          title: `${error.msg} `,
          icon: 'none'
        })
        return false     
    }else{
      wx.request({
        url: getApp().globalData.baseUrl + "userUpload.jsp",
        method: 'get',
        data: {
          reports: reports,
          descriptions: descriptions,
          others: others,
          openid: wx.getStorageSync('userOpenId')
        },
        success: function (res) {
          that.setData({
            piId: res.data
          })

          var tempFilePaths = that.data.chooseFile;
          var imgLength = tempFilePaths.length;
          for (var i = 0; i < imgLength; i++) {
            wx.uploadFile({
              url: getApp().globalData.baseUrl + "userUploadPhoto.jsp",
              filePath: tempFilePaths[i],
              formData: {
                piid: that.data.piId
              },
              name: 'photoFile',
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
              }
            })
          }
        }
      })

      that.setData({
        maskShow: true
      })      
    }    
  },

  goBack:function(){
    wx.switchTab({
      url: '../mine',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const rules = {
      reports: {
        required: true,
      },
      descriptions: {
        required: true,
      }
    };

    const messages = {
      reports: {
        required: '检查报告不得为空',
      },
      descriptions: {
        required: '诊断描述不得为空',
      }
    }

    Validate = new WxValidate(rules, messages);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})