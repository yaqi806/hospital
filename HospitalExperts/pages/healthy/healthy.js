// pages/healthy/healthy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.baseUrl + "manage/healthy/",
    spUrl: getApp().globalData.baseUrl + "manage/sp/",
    fmUrl: getApp().globalData.baseUrl + "manage/fm/",
    pageIndex:0,
    ac:0,
    videos:[],
    shipin:"",
    leids:0,
    zannum:0,
    isZan:0
  },

  toPage:function(event){
    var page=event.currentTarget.dataset.pageIndex;
    this.setData({
      pageIndex:page,
      ac:page
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bofangVideo:function(event){
    var that=this;
    var leid=event.currentTarget.dataset.spId;
    wx.request({
      url: getApp().globalData.baseUrl + "getShipin.jsp?bh=" + leid,
      method: "post",
      success: function (res) {
        that.setData({
          tempDataOne: res.data,
          shipin: res.data[0].sp,
          leids: res.data[0].leid,
          zannum: res.data[0].zans
        })
        wx.request({
          url: getApp().globalData.baseUrl + "isZan.jsp",
          method:"get",
          data: {
            openid: wx.getStorageSync('userOpenId'),
            leids: that.data.leids
          },
          success: function (res) {
             that.setData({
               isZan:res.data
             })
          }
        })
        
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.baseUrl + "getHealthy.jsp",
      method: "post",
      success: function (res) {
        that.setData({
          tempData: res.data
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + "getTopVideo.jsp",
      method: "post",
      success: function (res) {
        that.setData({
          tempDataOne: res.data,
          shipin: res.data[0].sp,
          leids: res.data[0].leid,
          zannum:res.data[0].zans
        })
        wx.request({
          url: getApp().globalData.baseUrl + "isZan.jsp",
          method: "get",
          data: {
            openid: wx.getStorageSync('userOpenId'),
            leids: that.data.leids
          },
          success: function (res) {
            that.setData({
              isZan: res.data
            })
          }
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + "getHealthyTwo.jsp",
      method: "post",
      success: function (res) {
        that.setData({
          tempDataTwo: res.data
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + "getHealthyThree.jsp",
      method: "post",
      success: function (res) {
        that.setData({
          tempDataThree: res.data
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + 'getVideos.jsp',
      method: "post",
      success: function (res) {
        that.setData({
          videos: res.data
        })
      }
    })
  },

  userZan:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.baseUrl + 'userZan.jsp',
      method: "get",
      data:{
        openid: wx.getStorageSync('userOpenId'),
        leids:that.data.leids
      },
      success: function (res) {
        that.setData({
          zannum:res.data
        }) 
        wx.request({
          url: getApp().globalData.baseUrl + "isZan.jsp",
          method: "get",
          data: {
            openid: wx.getStorageSync('userOpenId'),
            leids: that.data.leids
          },
          success: function (res) {
            that.setData({
              isZan: res.data
            })
          }
        })
      }
    })
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

  },
  toDetail:function(event){
    var heid=event.currentTarget.dataset.healthyId;
    wx.navigateTo({
      url:"healthy-detail/healthy-detail?heid=" + heid
    })
  }
})