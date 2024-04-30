// pages/guanli_xq/guanli_xq.js

const httpUrl = 'http://192.168.48.4:8099/'
Page({
  data: {
    orderData: null,
    showModal: false,
    input: ''
  },

  onLoad: function (options) {
    // 获取参数并赋值给页面数据
    const orderData = JSON.parse(options.orderData);
    this.setData({ orderData });
    console.log("guanli_xq")
  },
  navigateBack: function () {
    wx.navigateBack()
  },
  cancelOrder: function (event) {
    const orderNumber = this.data.orderData.orderNumber;
    const receiveStatus = 0;
    wx.showModal({
      content: '确定要取消这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + `updateTo_UnOrder/${orderNumber}/${receiveStatus}`, // 请替换为您的服务器接口地址
            method: 'PUT',
            success: (res) => {
              // 更新成功后的处理
              console.log('Order status updated to "已完成".');
              wx.navigateBack();
            },
            fail: (error) => {
              console.error('Failed to update order status:', error);
            }
          });
        } else if (res.cancel) {
          // User clicked '否', do nothing
        }
      },
    });
  },
  deleteOrder: function (event) {
    const orderNumber = this.data.orderData.orderNumber;
    const deleteStatus = 1;
    wx.showModal({
      content: '确定要删除这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + `deleteOrder/${orderNumber}/${deleteStatus}`,
            method: 'PUT',
            success: (res) => {
              console.log('Order status updated to "已完成".');
              wx.navigateBack();
            },
            fail: (error) => {
              console.error('Failed to update order status:', error);
            }
          });
        } else if (res.cancel) {
          // User clicked '否', do nothing
        }
      },
    });
  },

  finishOrder: function (event) {
    this.openModal();
  },
  // 打开弹出层
  openModal: function () {
    this.setData({
      showModal: true
    });
  },

  // 关闭弹出层
  closeModal: function () {
    this.setData({
      showModal: false
    });
  },
  inputRandom: function(e) {
    const input = e.detail.value;
    this.setData({
      input: input
    });
  },
  // 处理提交操作
  submitModal: function () {
    const orderNumber = this.data.orderData.orderNumber;
    const input = this.data.input;
    if(input != ''){
      wx.request({
        url: httpUrl + 'validateRandomString', // 请替换为您的服务器接口地址
        method: 'GET',
        data: {
          orderNumber: orderNumber,
          randomString: input
        },
        success: (res) => {
          if (res.data) {  
            const orderStatus = "已完成";
            const receiveStatus = 0
              wx.request({
                url: httpUrl + 'updateOrderStatus/' + orderNumber + '/' + orderStatus + '/' + receiveStatus,
                method: 'PUT',
                success: (res) => {
                  // 更新成功后的处理
                  console.log('Order status updated to "已完成".');
                  wx.navigateBack()
                },
                fail: (error) => {
                  console.error('Failed to update order status:', error);
                }
              })
          } 
          else {  
              wx.showToast({  
                  title: '验证完成订单编码失败，请重新向客户获取！',  
                  icon: "none",  
                  duration: 2000,  
                  mask: true  
              }); 
              this.setData({
                input: ''
              })
          }  
        },
        fail: (error) => {
          console.log("网络错误")
        }
      });
      this.closeModal();
    }
    else{
      wx.showToast({
        title: '请填写完成订单编号',
        icon: 'none',
        duration: 2000
      })
    }
  }
  
})