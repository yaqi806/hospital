// pages/test/testTopic/testTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tno:0,
    url: getApp().globalData.baseUrl + "manage/test-banner/",
    currentNum:1,
    multipleSelect:true,
    symptomSelect:true,
    mask:false,
    total:0
  }, 

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tid=options.tid;
    this.setData({
      tno:tid
    })
    var that = this;
    wx.request({
      url: getApp().globalData.baseUrl + "getTopic.jsp?bh=" + tid,
      method: "post",
      success: function (res) {
        var config = [];
        var data = res.data || [];
        console.log(data);
        for(var i=0;i<res.data.length;i++){
          var symptom = [];
          for(var j=0,innerLen=data[i].symptom.length;j<innerLen;j++){
            symptom[j] = {
              name:data[i].symptom[j],
              checked:false,
            };
          };
          config[i] = {
            title:data[i].title,
            symptom:symptom,
            answer:data[i].answer
          };
        }

        that.setData({
          topicData: config
        })
      }
    })    

    wx.request({
      url: getApp().globalData.baseUrl + "getTestDetail.jsp?bh=" + tid,
      method: "post",
      success: function (res) {
        that.setData({
          testData: res.data
        })
      }
    })
  },

  symptomSelect:function(){
    var that=this;
    this.setData({
      symptomSelect:!that.data.symptomSelect
    })
  },

  check:function(event){
    var that=this;
    var i=event.currentTarget.dataset.topicId;
    var j=event.currentTarget.dataset.symId;
    var tempKey = "topicData[" + i + "].symptom[" + j + "].checked";
    this.setData({
      [tempKey]:!that.data.topicData[i].symptom[j].checked
    })
  },

  statusSelect:function(event){
    var that=this;
    var num=event.currentTarget.dataset.staId;
    var istotal=event.currentTarget.dataset.staIstotal;
    this.setData({
      multipleSelect:false,
      statusNum:num
    })
    if(istotal!=0){
      this.setData({
        total:++that.data.total
      })
    }
  },

  // prevTopic: function () {
  //   var that = this;
  //   this.setData({
  //     currentNum: that.data.currentNum - 1
  //   })
  // },

  nextTopic:function(){
    var that=this;
    if(this.data.multipleSelect){
      wx.showModal({
        title: '请选择必要的选项',
        content: '问题和状态没有选中任何选项',
        showCancel:false
      })
    }else{
      this.setData({
        currentNum: that.data.currentNum + 1,
        multipleSelect: true
      })
    }
  },

  symptomSelect:function(event){
    
  },

  topicResult:function(){
    if (this.data.multipleSelect) {
      wx.showModal({
        title: '请选择必要的选项',
        content: '问题和状态没有选中任何选项',
        showCancel: false
      })
    } else {
      this.setData({
        mask: true
      })
    }
    
  },

  closePage:function(){
    this.setData({
      mask:false
    })
    wx.switchTab({
      url: '../../test/test',
    })
  },

  reTest:function(){
    wx.navigateTo({
      url: 'testTopic?tid=' + this.data.tno,
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