//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    var that=this;
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({ 
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
       
    // 用户登录
    wx.login({
      success:function(res){
        if(res.code){
          wx.request({
            url:getApp().globalData.baseUrl + "getOpenId.jsp",
            method:"GET",
            data:{
              code:res.code
            },
            success:function(res){
              wx.setStorageSync("userOpenId",res.data.trim());
              wx.request({
                url: getApp().globalData.baseUrl + "userLogin.jsp",
                data: {
                  openid: wx.getStorageSync('userOpenId'),
                },
                method: "get",
                success: function (res) {
                  console.log("登录成功")
                }
              })
            }
          })
        }
      } 
    })

  }, 
  globalData: {
    userInfo: null,
    baseUrl: "https://vrvi.v228.10000net.cn/",
    appid: 'wx7d118a6b1b628f42',
    secret: '0d8949e5dfb19aaefd8f568cdc5d4cdc'
  }
})