// pages/guanli/guanli.js
const httpUrl = 'http://192.168.48.4:8099/'

Page({
  
  data: {
    showLeftSlideItem: true, // 初始时显示组件
  },
  onPullDownRefresh: function () {
    // 显示加载动画
    wx.showNavigationBarLoading();
    this.loadOrders(() => {
      // 隐藏加载动画
      wx.hideNavigationBarLoading();
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    });
  },
  onTapJump(event) {
    const index = event.currentTarget.dataset.index;
    const order = this.data.orders[index];
    this.setData({
      showLeftSlideItem: false, // 隐藏组件
    });
    // 等待一段时间，然后重新显示组件
    setTimeout(() => {
      this.setData({
        showLeftSlideItem: true, // 重新显示组件
      });
    }, 500); // 1秒后重新加载组件
    wx.navigateTo({
      url: '/pages/guanli_xq/guanli_xq?orderData=' + JSON.stringify(order),
    })
    
  },
  onLoad(options) {
    this.leftSlideGroup = this.selectComponent("#leftSlideGroup")
    console.log(this.leftSlideGroup)
    this.loadOrders();
  },
  onShow: function () {
    this.loadOrders();
  },
  loadOrders: function (callback) {
    const user =  wx.getStorageSync('user_info', user)
    const receiveNickName = user.nickName;
    const deleteStatus = 0;

    const countAndcertificate = wx.getStorageSync('countAndcertificate', countAndcertificate)
    const certificate = countAndcertificate.certificate;
    wx.request({
      url: httpUrl +'getHadOrders',
      data: {
        receiveNickName: receiveNickName,
        deleteStatus:　deleteStatus,
        certificate: certificate
      },
      method: 'GET',
      success: (res) => {
        const orders = res.data;
        this.setData({ 
          orders 
        });
        console.log(orders.nickName)
        if (typeof callback === 'function') {
          callback();
        }
      },
      fail: (error) => {
        console.error('Request failed', error);
        if (typeof callback === 'function') {
          callback();
        }
      },
    });
  },
    // 退出页面
  logout:function(){
    wx.navigateBack({})
  },
    
})