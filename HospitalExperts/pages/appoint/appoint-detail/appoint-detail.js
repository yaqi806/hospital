// pages/appoint/appoint-detail/appoint-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.baseUrl + "manage/experts/",
    isShow:false,
    toID:0,
    exid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      exid:options.bh
    })
    var that=this;
    wx.request({
      url: getApp().globalData.baseUrl + 'expert.jsp?bh=' + that.data.exid,
      method: "post",
      success: function (res) {
        that.setData({
          tempData: res.data
        })
      }
    });    
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
    this.setData({
      isShow: false
    })
    var that=this;
    wx.request({
      url: getApp().globalData.baseUrl + 'outcalls.jsp?bh=' + that.data.exid,
      method: "post",
      success: function (res) {
        that.setData({
          outcallsData: res.data
        })
        console.log(res.data);
      }
    });
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
  clickTap:function(event){
    var outid=event.currentTarget.dataset.outcallsId;
    this.setData({
      isShow:true,
      toId:outid
    })
  },
  cancel:function(){
    this.setData({
      isShow:false
    })
  },
  appointok:function(){
    var outid=this.data.toId;
    wx.navigateTo({
      url: '../appoint-ok/appoint-ok?bh=' + outid
    })
  }
})