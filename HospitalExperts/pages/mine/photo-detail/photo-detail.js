// pages/mine/photo-detail/photo-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPhoto:[],
    url: getApp().globalData.baseUrl + "userPhoto/",
    phid:-1,
    maskShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var phid=options.phid;
    this.setData({
      phid:phid
    })
    wx.request({
      url: getApp().globalData.baseUrl + 'getPhoto.jsp?phid=' + phid,
      method:'POST',
      success: function (res) {
        that.setData({
          myPhoto: res.data
        })
      }
    })
  },

  /* 删除图片 */ 
  photoDelete:function(){
    var that=this;
    wx.showModal({
      title: '删除照片',
      content: '您确定删除此张照片吗？',
      success:function(res){
        if(!res.cancel){
          wx.request({
            url: getApp().globalData.baseUrl + 'photoDelete.jsp?phid=' + that.data.phid,
            mehtod: "POST",
            success: function (res) {
              that.setData({
                maskShow: true
              })
            }
          })
        }
      }
    })
    
  },

  /* 返回我的 */
  closeMask:function (){
    wx.switchTab({
      url: '../../mine/mine',
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