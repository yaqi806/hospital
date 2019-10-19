// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myPhotoNum:0,
    myAppointNum:0,
    myPhotos:[],
    url: getApp().globalData.baseUrl + "userPhoto/",
    maskShow:false
  },

  getUserInfo: function (e) {
    var that=this;
    app.globalData.userInfo = e.detail.userInfo;

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.request({
      url: getApp().globalData.baseUrl + "setUserInfo.jsp",
      data: {
        openid: wx.getStorageSync('userOpenId'),
        nick: that.data.userInfo.nickName,
        gender: that.data.userInfo.gender,
        province: that.data.userInfo.province,
        city: that.data.userInfo.city
      },
      method: "get",
      success: function (res) {
        that.getMyPhotoNum();  
        console.log("登录成功1");       
      }
    })
  },

  /* 上传照片按钮 */
  uploadPhoto:function(){
    if(this.data.hasUserInfo){
      wx.navigateTo({
        url: 'upload/upload',
      })
    }else{
      this.setData({
        maskShow:true
      })
    }
  },

  /* 关闭遮罩层 */
  closeMask:function(){
    this.setData({
      maskShow:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  /*获取我的照片数量*/
  getMyPhotoNum:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.baseUrl + 'getMyPhotoNum.jsp',
      data: {
        openid: wx.getStorageSync('userOpenId')
      },
      method: "get",
      success: function (res) {
        that.setData({
          myPhotoNum: res.data
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + 'getMyAppointNum.jsp',
      data: {
        openid: wx.getStorageSync('userOpenId')
      },
      method: "get",
      success: function (res) {
        that.setData({
          myAppointNum: res.data
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + 'getPhotos.jsp',
      data:{
        openid:wx.getStorageSync('userOpenId')
      },
      method:"get",
      success:function(res){
        that.setData({
          myPhotos:res.data
        })
      }
    })
  },

  /* 照片的单击事件 */
  showDetail:function(event){
    var phid=event.currentTarget.dataset.photoId;
    wx.navigateTo({
      url: "photo-detail/photo-detail?phid=" + phid
    })
  },
 
  /* 单击我的预约 */
  myAppoint:function(){
    wx.navigateTo({
      url: 'my-appoint/my-appoint'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getMyPhotoNum();
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