// pages/healthy/healthy-detail/healthy-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    healId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var heid=options.heid;
    var that=this;
    that.setData({
      healId:heid
    })
    wx.request({
      url: getApp().globalData.baseUrl + "getHealthyDetail.jsp?bh=" + heid,
      method: "post",
      success: function (res) {
        that.setData({
          tempData: res.data
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + "getAboutHealthyDetail.jsp?bh=" + heid,
      method: "post",
      success: function (res) {
        that.setData({
          aboutData: res.data
        })
      }
    })
  },

  toTest:function(){
    wx.switchTab({
      url: '../../test/test',
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
    var that=this;
    wx.request({
      url: getApp().globalData.baseUrl + "addShare.jsp?bh=" + that.data.healId,
      method:"post",
      success:function(res){
        console.log("Share Ok");
      }
    })
    return {
      title:""
    }
  },
  toHealthyDetail:function(event){
    var heid=event.currentTarget.dataset.healthyId
    wx.redirectTo({
      url: '../healthy-detail/healthy-detail?heid=' + heid,
    })
  }
})