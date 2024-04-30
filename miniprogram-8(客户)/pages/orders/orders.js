// order-page.js
const httpUrl = 'http://192.168.48.4:8099/'

const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
const manager = plugin.getRecordRecognitionManager();
Page({
  data: {
    recordState: false, //录音状态
    ip: 'localhost',
    unpaidOrders: [], // 用于存储待支付订单数据

    textareaValue: '', // 用于存储文本域的内容
    imageList: [],     // 用于存储已选择的图片路径

    showListModal: false, // 控制备忘清单弹出层的显示
    listOrderDetail: '', // 用于存储备忘清单的内容
    listSubmitted: false, // 标记备忘清单是否已提交
    order: {}, // 你的订单数据

    modalOrder: [],
    showModal: false,
    currentTab: 'all', // 默认选中"全部"标签
    
  },
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.imageList.map(item => item.url);
    wx.previewImage({
      current: urls[index],
      urls: urls,
    });
  },
  onLoad: function () {
    // 加载订单数据并显示在页面上
    this.all();
    this.initRecord();
  },

  onPullDownRefresh: function () {
    // 显示加载动画
    wx.showNavigationBarLoading();

    // 根据当前标签加载相应订单数据
    if (this.data.currentTab === 'all') {
      this.loadOrders(() => {
        // 隐藏加载动画
        wx.hideNavigationBarLoading();
        // 停止下拉刷新
        wx.stopPullDownRefresh();
      });
    } else if (this.data.currentTab === 'unpaid') {
      this.loadUnpaidOrders(() => {
        // 隐藏加载动画
        wx.hideNavigationBarLoading();
        // 停止下拉刷新
        wx.stopPullDownRefresh();
      });
    }
    else if (this.data.currentTab === 'inService') {
      this.loadInServiceOrders(() => {
        // 隐藏加载动画
        wx.hideNavigationBarLoading();
        // 停止下拉刷新
        wx.stopPullDownRefresh();
      });  
    }
    else if (this.data.currentTab === 'completed') {
      this.loadCompletedOrders(() => {
        // 隐藏加载动画
        wx.hideNavigationBarLoading();
        // 停止下拉刷新
        wx.stopPullDownRefresh();
      });  
    }
    else if (this.data.currentTab === 'refund') {
      this.loadRefundOrders(() => {
        // 隐藏加载动画
        wx.hideNavigationBarLoading();
        // 停止下拉刷新
        wx.stopPullDownRefresh();
      });  
    }
  },

  //所有
  loadOrders: function (callback) {
    wx.request({
      url: httpUrl +'getOrders',
      data: {
        phoneNumber: '13859231505' // Provide the phone number parameter if needed
      },
      method: 'GET',
      success: (res) => {
        const orders = res.data;
        this.setData({ orders });
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

  onShow: function (){
    const currentTab = this.data.currentTab;
    if(currentTab == 'unpaid'){
      this.unpaid();
    }
    else if(currentTab == 'inService'){
      this.inService();
    }
    else if(currentTab == 'completed'){
      this.completed();
    }
    else if(currentTab == 'refund'){
      this.refund();
    }
    else{
      this.all();
    }
  },

  deleteOrder: function (e) {
    const order = e.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;
    const currentTab = this.data.currentTab;
    wx.showModal({
      // title: '确认删除订单',
      content: '确定要删除这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + 'deleteOrder?orderNumber=' + orderNumber,
            method: 'DELETE',
            success: (res) => {
                // 在成功的回调中处理删除订单后的逻辑，例如重新加载订单数据
                console.log(orderNumber)
                if(currentTab == 'completed'){
                  this.completed();
                }
                else{
                  this.all();
                }
            },
            fail: (error) => {
                console.error('Cancel order failed', error);
            },
          });
          
        } else if (res.cancel) {
          // User clicked '否', do nothing
        }
      },
    });
  },

  cancelOrder: function (event) {
    const order = event.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;
    const orderStatus = "已完成";//变成什么订单状态、四种状态
    const currentTab = this.data.currentTab;
    // 更新订单状态为已完成
    // 发送更新后的订单对象到服务器
    wx.showModal({
      content: '确定要取消这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + 'updateOrderStatus/' + orderNumber + '/' +orderStatus, // 请替换为您的服务器接口地址
            method: 'PUT',
            success: (res) => {
              // 更新成功后的处理
              console.log('Order status updated to "已完成".');
              if(currentTab == 'unpaid'){
                this.unpaid();
              }
              else{
                this.all();
              }
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
  goPay: function (event) {
    const order = event.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;
    const orderStatus = "服务中";//变成什么订单状态、四种状态
    const currentTab = this.data.currentTab;
    // 更新订单状态为已完成
    // 发送更新后的订单对象到服务器
    wx.showModal({
      content: '确定要付款吗？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + 'updateOrderStatus/' + orderNumber + '/' +orderStatus, // 请替换为您的服务器接口地址
            method: 'PUT',
            success: (res) => {
              // 更新成功后的处理
              console.log('Order status updated to "服务中".');
              if(currentTab == 'unpaid'){
                this.unpaid();
              }
              else{
                this.all();
              }
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
  entryRefund: function (event) {
    const order = event.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;
    const orderStatus = "售后";//变成什么订单状态、四种状态
    const currentTab = this.data.currentTab;
    // 更新订单状态为已完成
    // 发送更新后的订单对象到服务器
    wx.showModal({
      content: '是否进入售后？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + 'updateOrderStatus/' + orderNumber + '/' +orderStatus, // 请替换为您的服务器接口地址
            method: 'PUT',
            success: (res) => {
              // 更新成功后的处理
              console.log('Order status updated to "售后".');
              if(currentTab == 'inService'){
                this.inService();
              }
              else{
                this.all();
              }
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
  cancelRefund: function (event) {
    const order = event.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;
    const orderStatus = "服务中";//变成什么订单状态、四种状态
    const currentTab = this.data.currentTab;
    // 更新订单状态为已完成
    // 发送更新后的订单对象到服务器
    wx.showModal({
      content: '是否取消售后？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + 'updateOrderStatus/' + orderNumber + '/' +orderStatus, // 请替换为您的服务器接口地址
            method: 'PUT',
            success: (res) => {
              // 更新成功后的处理
              console.log('Order status updated to "服务中".');
              if(currentTab == 'refund'){
                this.refund();
              }
              else{
                this.all();
              }
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
  afterRefund: function (event) {
    const order = event.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;
    const orderStatus = "已完成";//变成什么订单状态、四种状态
    const currentTab = this.data.currentTab;
    // 更新订单状态为已完成
    // 发送更新后的订单对象到服务器
    wx.showModal({
      content: '是否确认售后？',
      success: (res) => {
        if (res.confirm) {
          // User clicked '是', proceed with the deletion
          wx.request({
            url: httpUrl + 'updateOrderStatus/' + orderNumber + '/' +orderStatus, // 请替换为您的服务器接口地址
            method: 'PUT',
            success: (res) => {
              // 更新成功后的处理
              console.log('Order status updated to "已完成".');
              // this.refund();
              if(currentTab == 'refund'){
                this.refund();
              }
              else{
                this.all();
              }
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
    const order = event.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;
    const currentTab = this.data.currentTab;
    // 更新订单状态为已完成
    // 发送更新后的订单对象到服务器
    const randomFloat = Math.random(); // 生成一个随机浮点数
    const randomString = randomFloat.toString().slice(2, 6); // 转换为字符串并截取四位
    wx.showToast({
      title: '生成四位随机完成订单编码：'+ randomString + '，请告知陪诊师完成订单！',
      icon: "none",
      duration: 5000,
      mask: true
    })
    wx.request({
      url: httpUrl + 'updateRandomString/' + orderNumber + '/' +randomString, // 请替换为您的服务器接口地址
      method: 'PUT',
      success: (res) => {
        // 更新成功后的处理
        console.log('Order status updated to "已完成".');
        if(currentTab == 'inService'){
          this.inService();
        }
        else{
          this.all();
        }
      },
      fail: (error) => {
        console.error('Failed to update order status:', error);
      }
    });
  },
  

  viewOrder: function (e) {
    const order = e.currentTarget.dataset.order;
    // 将订单信息存储到页面数据中，以便在弹出层中渲染
    this.setData({
      modalOrder: order,
      showModal: true, // 设置弹出层的显示状态为true
    });
  },
  // 添加关闭弹出层的事件处理程序
  hideModal: function () {
    this.setData({
      showModal: false, // 设置弹出层的显示状态为false
    });
  },


  // 展示图片
  showListModal: function (event) {
    const order = event.currentTarget.dataset.order;
    const orderNumber = order.orderNumber;

    // You can construct the listOrderDetail content from order data here.
    this.setData({
      showListModal: true,
      listOrderDetail: '在这里添加备忘清单内容',
      orderNumber: orderNumber,
      modalOrder: order, // Set modalOrder data
      imageList: [], // Clear imageList when opening the modal
      textareaValue: '', // Clear textareaValue when opening the modal
      listSubmitted: false, // Reset listSubmitted when opening the modal
    });

    wx.request({
      url: httpUrl + `getMemoList?orderNumber=${orderNumber}`,
      method: 'GET',
      success: (res) => {
        console.log("1")
        const imagePaths = res.data.imagePaths.map(url => 'https://www.inquark.com/' + '/' + url); // Add '/pages/orders/' path 'https://www.inquark.com/image/' + '/' + url);
        console.log("2")
        const imageList = imagePaths.map(url => ({ url }));
        console.log(imagePaths)
        const textareaContent = res.data.textarea;
        this.setData({ 
          imageList,
          textareaValue:textareaContent,
          listSubmitted: true,
        });
      },
      fail: (error) => {
        // Handle request failure
      },
    });
  },


  hideListModal: function () {
    this.setData({
      showListModal: false
    });
  },



  //文本域填写
  onTextareaInput: function (e) {
    const textareaValue = e.detail.value; // Get the input value from the event
    this.setData({
      textareaValue: textareaValue, // Update the component's data with the input value
    });
  },
  // 选择图片
  chooseImage(e) {
    let index=e.currentTarget.dataset.index
    console.log(index)
    let self = this
    // 获取剩余可选择图片的数量
    let remainingSlots = 9 - self.data.imageList.length;
    const listSubmitted = this.data.listSubmitted;
    if (remainingSlots <= 0 &&　!listSubmitted) {
      wx.showToast({
        title: '最多只能选择9张图片',
        icon: 'none',
      });
      return;
    }
    if(!listSubmitted){
      wx.chooseMedia({
        count: remainingSlots,
        sizeType: ['original', 'compressed'], //原图 ，压缩图
        sourceType: ['album', 'camera'], //从相处选择 ，使用相机
        success(res) {
          res.tempFiles.forEach((file) => {
            if(index === undefined){ //添加图片
              self.setData({
                imageList: [...self.data.imageList, {
                  url: file.tempFilePath
                }]
              })
            }else{ //替换当前索引下的图片
              self.data.imageList[index].url=file.tempFilePath
              self.setData({
                imageList:self.data.imageList
              })
            }
  
             // 检查是否已经选择了9张图片，如果是，隐藏添加图片的组件
            if (self.data.imageList.length >= 9) {
              self.setData({
                hideAddImage: true
              });
            }
          })
        }
      })
    }
    else{
      const index = e.currentTarget.dataset.index;
      const urls = this.data.imageList.map(item => item.url);
      wx.previewImage({
        current: urls[index],
        urls: urls,
      });
    }
  },
  //删除图片
  delImage(e) {
    let {
      imageList
    } = this.data
    let index = e.currentTarget.dataset.index
    imageList.splice(index, 1)
    this.setData({
      imageList,
      hideAddImage: false // 显示添加图片的组件
    })
  },



  // 备忘清单提交方法
  submitList() {
    const textareaValue = this.data.textareaValue;
    const orderNumber = this.data.orderNumber;
    const imageList = this.data.imageList.map(image => image.url);

    // 检查是否有文本和图片
    if (!textareaValue || imageList.length === 0) {
      wx.showToast({
        title: '文本和图片均为必填项',
        icon: 'none', // 可以使用'none'来显示红色警告图标
        duration: 2000, // Toast提示显示的时间（以毫秒为单位）
      });
      return;
    }

    const data = {
      orderNumber: orderNumber,
      textareaValue: textareaValue,
      imageList: imageList,
    };
    const uploadPromises = imageList.map(image => new Promise((resolve,reject) => {
      // 提交图片
      wx.uploadFile({
          // url: httpUrl + 'uploadImage',
          url: httpUrl + 'upload/test',
          filePath: image, // Use image directly as filePath
          name: 'file',
          formData: {
            orderNumber: orderNumber,
            textareaValue: textareaValue,
          },
          success: (res) => {
              const uploadedImage = JSON.parse(res.data);
              if (uploadedImage && uploadedImage.imageUrl) {
                  resolve(uploadedImage.imageUrl);
              } else {
                  reject(new Error('Image upload failed'));
              }
          },
          fail: (error) => {
              reject(error);
          },
      });
    }));
    this.setData({
        listSubmitted: true,
    });
  },

  
  
  all: function () {
    this.setData({ currentTab: 'all' });
    this.loadOrders(); // 在切换到“全部”标签时刷新订单数据
  },
  unpaid: function () {
    this.setData({ currentTab: 'unpaid' });
    this.loadUnpaidOrders();
  },
  loadUnpaidOrders: function (callback) {
    wx.request({
      url: httpUrl + 'getOrdersByStatus', // Replace this URL with your API endpoint for unpaid orders
      data: {
        phoneNumber: '13859231505',
        status: '待支付', 
      },
      method: 'GET',
      success: (res) => {
        const unpaidOrders = res.data;
        this.setData({ orders: unpaidOrders });
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

  inService: function () {
    this.setData({ currentTab: 'inService' });
    this.loadInServiceOrders();
  },
  loadInServiceOrders: function (callback) {
    wx.request({
      url: httpUrl + 'getOrdersByStatus', // Replace this URL with your API endpoint for unpaid orders
      data: {
        phoneNumber: '13859231505',
        status: '服务中', 
      },
      method: 'GET',
      success: (res) => {
        const inServiceOrders = res.data;
        this.setData({ orders: inServiceOrders });
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

  completed: function () {
    this.setData({ currentTab: 'completed' });
    this.loadCompletedOrders();
  },
  loadCompletedOrders: function (callback) {
    wx.request({
      url: httpUrl + 'getOrdersByStatus', // Replace this URL with your API endpoint for unpaid orders
      data: {
        phoneNumber: '13859231505',
        status: '已完成', 
      },
      method: 'GET',
      success: (res) => {
        const completedOrders = res.data;
        this.setData({ orders: completedOrders });
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

  refund: function () {
    this.setData({ currentTab: 'refund' });
    this.loadRefundOrders();
  },
  loadRefundOrders: function (callback) {
    wx.request({
      url: httpUrl + 'getOrdersByStatus', // Replace this URL with your API endpoint for unpaid orders
      data: {
        phoneNumber: '13859231505',
        status: '售后', 
      },
      method: 'GET',
      success: (res) => {
        const refundOrders = res.data;
        this.setData({ orders: refundOrders });
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

  //语音模块



  onReady(e) {
    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    }) 
  },
  // 手动输入内容
  conInput: function (e) {
    this.setData({
      content: e.detail.value,
    })
  },
  // 文字转语音
  wordYun:function (e) {
    var that = this;
    var content = this.data.textareaValue;
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function (res) {
        console.log(res);
        console.log("succ tts", res.filename);
        that.setData({
          src: res.filename
        })
        that.yuyinPlay();
 
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })
  },
  
  //播放语音
  yuyinPlay: function (e) {
    if (this.data.src == '') {
      console.log(暂无语音);
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址
    this.innerAudioContext.play(); //播放音频
  },
 
  // 结束语音
  end: function (e) {
    this.innerAudioContext.pause();//暂停音频
  },


  //语音转字
  initRecord: function () {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function (res) {
      console.error("error msg", res)
    }
    //识别结束事件
    manager.onStop = function (res) {
      console.log('..............结束录音')
      console.log('录音临时文件地址 -->' + res.tempFilePath); 
      console.log('录音总时长 -->' + res.duration + 'ms'); 
      console.log('文件大小 --> ' + res.fileSize + 'B');
      console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) {}
        })
        return;
      }
      var text =  res.result;
      that.setData({
        textareaValue: text
      });
    }
  },
  //语音  --按住说话
  touchStart: function (e) {
    this.setData({
      recordState: true  //录音状态
    })
    // 语音开始识别
    manager.start({
      
      lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    })
    

  },
  //语音  --松开结束
  touchEnd: function (e) {
    this.setData({
      recordState: false
    })
    // 语音结束识别
    manager.stop();
  },
});
