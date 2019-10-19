// pages/appoint/expert-detail/expert-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.baseUrl + "manage/experts/",
    imgUrl: getApp().globalData.baseUrl + "manage/science/",
    swiperCurrent: 0,
    scienceData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var exid=options.bh;
    var that = this;
    wx.request({
      url: getApp().globalData.baseUrl + 'expert.jsp?bh=' + exid,
      method: "post",
      success: function (res) {
        that.setData({
          tempData: res.data
        })
      }
    }) 

    wx.request({
      url: getApp().globalData.baseUrl + 'getScience.jsp?bh=' + exid,
      method:"post",
      success:function(res){
        that.setData({
          scienceData:res.data
        })
      }
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

  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})