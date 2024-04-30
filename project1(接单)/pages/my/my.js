// pages/my/my.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const httpUrl = 'http://192.168.1.94:8099/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    catchtouchmove:false,
    modalName:false,
    userInfo:null,


    orderCount: ''
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
    console.log(user);
    this.setData({
      userInfo:user
    });

    const receive = wx.getStorageSync('receive', receive)
    const receiveName = receive.receiveName 
    const receiveIdCard = receive.receiveIdCard
    const receivePhoneNumber = receive.receivePhoneNumber
    wx.request({
      url: httpUrl + 'getOrderCount', // 请替换为您的服务器接口地址
      method: 'GET',
      data: {
        receiveName:receiveName,
        receiveIdCard:receiveIdCard,
        receivePhoneNumber:receivePhoneNumber,
      },
      success: (res) => {
        this.setData({
          orderCount: res.data
        })
      },
      fail: (error) => {
        console.log("网络错误")
      }
    });
  },
  onShow(){
    this.onLoad()
  }
})