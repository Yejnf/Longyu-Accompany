// pages/my/my.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    catchtouchmove:false,
    modalName:false,
    userInfo:null,
  },  
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  modal(){
    this.setData({
      modalName:!this.data.modalName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const user = wx.getStorageSync('user_info');
    this.setData({
      userInfo:user
    })
  },

  navigateToNewPage: function() {
    wx.navigateTo({
      url: '/pages/wenjuan/wenjuan' // 这里填写你想要跳转的新页面的路径
    });
  },

  //健康语伴跳转
  health_chat: function () {
    wx.navigateTo({
      url: '/pages/health_chat/health_chat',
    })
  },
  
})