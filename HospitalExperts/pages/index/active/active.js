// pages/index/active/active.js
import WxValidate from '../../../utils/WxValidate.js'
var Validate;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.baseUrl + "manage/prize/",
    prize: [],
    fromUserId: "",
    toUserId: "",
    userNickName: "",
    userImgUrl: "",
    attentionUser: [],
    isbdShow: false,
    isAttention: false,
    setNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.options = options
    var fromUserId = options.fromUserOpenId || "";
    var that = this;

    const rules = {
      userName: {
        required: true
      },
      userPhone: {
        required: true,
        tel: true
      },
      userHome: {
        required: true
      }
    };

    const messages = {
      userName: {
        required: "姓名不得为空"
      },
      userPhone: {
        required: "手机号码不得为空",
        tel: "请输入11位手机号码"
      },
      userHome: {
        required: "户籍地不得为空"
      }
    }

    Validate = new WxValidate(rules, messages);

    wx.request({
      url: getApp().globalData.baseUrl +  'getSetNum.jsp',
      method:"post",
      success:function(res){
        that.setData({
          setNum:res.data
        })
      }
    })

    wx.request({
      url: getApp().globalData.baseUrl + 'getPrize.jsp',
      method: "POST",
      success: function(res) {
        that.setData({
          prize: res.data
        })
      }
    })

    wx.login({
      success: function(res) {
        wx.getSetting({
          success: resa => {
            if (resa.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: resb => {
                  console.log(resb)
                  that.setData({
                    "userNickName": resb.userInfo.nickName,
                    "userImgUrl": resb.userInfo.avatarUrl
                  })

                  if (res.code) {
                    wx.request({
                      url: getApp().globalData.baseUrl + "getOpenId.jsp",
                      method: "GET",
                      data: {
                        code: res.code
                      },
                      success: function(res) {
                        wx.setStorageSync("shareUserOpenId", res.data.trim());
                        that.setData({
                          fromUserId: fromUserId,
                          toUserId: wx.getStorageSync("shareUserOpenId")
                        })
                        if (that.data.fromUserId !== "") {
                          wx.request({
                            url: getApp().globalData.baseUrl + 'saveForwardInfo.jsp',
                            method: "get",
                            data: {
                              send: that.data.fromUserId,
                              receive: that.data.toUserId,
                              nickname: that.data.userNickName,
                              imgurl: that.data.userImgUrl
                            },
                            success: function(ress) {}
                          })
                        }
                      }
                    })
                  }


                }
              })
            }
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let openid = this.data.options.openid
    let that = this
    //进入转发页面后请求后端判断有没有当前用户有则不动将用户openid拿到存入页面缓存，没有则添加一条新用户并将用户openid存入页面缓存
    wx.login({
      success(res) {
        if (res.code) {

          // 发起网络请求
          wx.request({
            url: 'https://dsm.hebwj.net/abc/demo1.php',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code
            },
            success: function(res) {
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              })

            }
          })
        }

      }
    })

    if (openid) {
      console.log('从转发页面进来的')
      var uid = openid
    } else {
      console.log('从首页进来的')
      var uid = ''
      var nickname = ''
      var photo = ''
    }
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        wx.getStorage({
          key: 'xinxi',
          success: function(resa) {

            wx.login({
              success(res) {

                wx.getSetting({
                  success: resc => {
                    if (resc.authSetting['scope.userInfo']) {
                      wx.getUserInfo({
                        success: resb => {
                          console.log(resb)
                          wx.request({
                            url: 'https://dsm.hebwj.net/abc/demo1.php',
                            method: "POST",
                            header: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                              encryptedData: resa.data.encryptedData,
                              iv: resa.data.iv,
                              code: res.code,
                              uid: uid,
                              nickname: resb.userInfo.nickName,
                              photo: resb.userInfo.avatarUrl
                            },
                            success: function(res) {
                              console.log(res)
                              wx.setStorage({
                                key: 'userinfo',
                                data: '111',
                              })
                              if (res.data.isguan == 1) {
                                that.setData({
                                  ziti: '/images/zf.png',
                                  contact: 'share',
                                })
                              } else {
                                that.setData({
                                  ziti: '/images/ca.png',
                                  contact: 'contact'
                                })
                              }
                            }
                          })
                        }
                      })
                    }
                  }
                })






              }
            })

          },
        })


      },
      fail: function(res) {
        that.setData({
          ziti: '/images/sq.png',
          contact: 'getUserInfo',
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(option) {
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        return {
          title: '活动专题',
          path: '/pages/index/active/active?openid=' + res.data
        }
      },
    })
  },

  formSubmit: function(e) {
    var that = this;
    var userName = e.detail.value.userName;
    var userPhone = e.detail.value.userPhone;
    var userHome = e.detail.value.userHome;

    if (!Validate.checkForm(e.detail.value)) {
      const error = Validate.errorList[0];
      wx.showToast({
        title: `${error.msg} `,
        icon: 'none'
      })
      return false
    } else {
      wx.request({
        url: getApp().globalData.baseUrl + "getPrizeUser.jsp",
        method: "get",
        data: {
          uname: userName,
          uphone: userPhone,
          uhome: userHome
        },
        success: function(res) {}
      })
    }
  },
  getUserInfo: function(e) {

    let that = this
    wx.getUserInfo({
      success: function(resa) {
        var arr = {}
        arr.encryptedData = resa.encryptedData,
          arr.iv = resa.iv,
          wx.setStorage({
            key: 'xinxi',
            data: arr,
          })

        wx.login({
          success(res) {
            if (res.code) {

              // 发起网络请求
              wx.request({
                url: 'https://dsm.hebwj.net/abc/demo2.php',
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  encryptedData: resa.encryptedData,
                  iv: resa.iv,
                  code: res.code
                },
                success: function(res) {
                  wx.setStorage({
                    key: 'userinfo',
                    data: '111',
                  })
                  if (res.data.isguan == 1) {
                    that.setData({
                      ziti: '/images/zf.png',
                      contact: 'share',
                    })
                  } else {
                    that.setData({
                      ziti: '/images/ca.png',
                      contact: 'contact'
                    })
                  }
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })

      }
    })
  },

})