// pages/mine/my-appoint/my-appoint.js
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    myAppoint:{},
    url: getApp().globalData.baseUrl + "manage/hospital/",
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: getApp().globalData.baseUrl + "getMyAppoint.jsp",
      method:"GET",
      data:{
        openid:wx.getStorageSync("userOpenId")
      },
      success:function(res){
        console.log(res.data);
        that.setData({          
          myAppoint:res.data
        })
      }
    })
  },

  /* 取消预约 */
  cancelAppoint:function(event){
    var that=this;
    var apid=event.currentTarget.dataset.apId;
    wx.showModal({
      title: '取消预约',
      content: '您确认取消该预约吗？',
      success:function(res){
        if(!res.cancel){
          wx.request({
            url: getApp().globalData.baseUrl + "cancelAppoint.jsp?bh=" + apid,
            method: "get",
            success: function (res) {
              that.onLoad();
            }
          })
        }
      }
    })
    
  },

  /* 电话取消 */
  cancelPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '18000319142'
    })
  },

  /* 查看专家 */
  showExpert:function(event){
    var exid=event.currentTarget.dataset.expertId;
    wx.navigateTo({
      url: '../../appoint/expert-detail/expert-detail?bh=' + exid
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

  }
})