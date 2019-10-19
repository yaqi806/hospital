// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.baseUrl + "manage/project/",
    imgUrl:getApp().globalData.baseUrl + "manage/banner/",
    swiperCurrent:0
  },
  toAdv:function(){
    wx.navigateTo({
      url: 'active/active',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.baseUrl + 'project.jsp',
      method: "post",
      success: function (res) {
        that.setData({
          tempData: res.data
        })
      }
    })
    wx.request({
      url: getApp().globalData.baseUrl + 'getBanner.jsp',
      method: "post",
      success: function (res) {
        that.setData({
          carouselData: res.data
        })
      }
    })
  },

  /* 专题细节跳转 */
  projectDetail:function(event){
    var exid=event.currentTarget.dataset.proId;
    wx.navigateTo({
      url: '../appoint/expert-detail/expert-detail?bh=' + exid
    })
  },

  /* 精选专题跳转 */
  bannerDetail: function (event) {
    var banid = event.currentTarget.dataset.bannerId;
    wx.navigateTo({
      url: 'project-detail/project-detail?bh=' + banid
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