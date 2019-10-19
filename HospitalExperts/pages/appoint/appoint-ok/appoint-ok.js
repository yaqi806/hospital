// pages/appoint/appoint-ok/appoint-ok.js
import WxValidate from '../../../utils/WxValidate.js'
var Validate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    url: getApp().globalData.baseUrl + "manage/experts/",
    outids:0,
    sex:["男","女"],    
    sexIndex:0,
    region: ["北京市", "北京市","东城区"]
  },

  bindPickerChange:function(e){
    console.log(e.detail.value);
    this.setData({
      sexIndex: e.detail.value
    })
  },

  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var outid=options.bh;
    this.setData({
      outids:outid
    })
    var that = this;
    wx.request({
      url: getApp().globalData.baseUrl + 'getOutcalls.jsp?bh=' + outid,
      method: "post",
      success: function (res) {
        that.setData({
          tempData: res.data
        })
      }
    })

    const rules = {
      userName: {
        required: true
      },
      userAge: {
        required: true,
        range:[1,100]
      },
      userPhone:{
        required:true,
        tel:true
      }
    };

    const messages = {
      userName: {
        required: "姓名不得为空"
      },
      userAge: {
        required: "年龄不得为空",
        range:"请输入有效的年龄范围"
      },
      userPhone: {
        required: "手机号码不得为空",
        tel: "请输入11位手机号码"
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
    this.setData({
      isShow:false
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
  maskClose:function(){
    this.setData({
      isShow:false
    })
  },
  showExpert:function(event){
    var exid = event.currentTarget.dataset.expertId;
    console.log(exid);
    wx.redirectTo({
      url: '../expert-detail/expert-detail?bh=' + exid
    })
  },
  formSubmit:function(e){
    var that=this;
    var outid=that.data.outids;
    var userName=e.detail.value.userName;
    var userAge = e.detail.value.userAge;
    var userSex = that.data.sex[that.data.sexIndex];
    var userPhone=e.detail.value.userPhone;
    var userHome=that.data.region.join(",");

    if (!Validate.checkForm(e.detail.value)) {
      const error = Validate.errorList[0];
      wx.showToast({
        title: `${error.msg} `,
        icon: 'none'
      })
      return false
    } else {
      console.log("openId=" + wx.getStorageSync("userOpenId"));
      wx.request({
        url: getApp().globalData.baseUrl + "insertAppoint.jsp?bh=" + outid,
        method: "get",
        data: {
          openid:wx.getStorageSync("userOpenId"),
          uname: userName,
          uage: userAge,
          usex: userSex,
          uphone: userPhone,
          uhome: userHome
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.indexOf("ok") != -1) {
            that.setData({
              isShow: true
            })
          }
        }
      })
    }
    
  }
})