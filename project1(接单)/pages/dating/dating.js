const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const httpUrl = 'http://192.168.48.4:8099/'
Page({
  data: {
    receiveIdCard:'',
    receiveName:'',
    receivePhoneNumber:'',
    orderCount: '',
    certificate: '',
    flag: false,

    // 头像
    show:false,
    showIndex:null,//打开弹窗的对应下标
    height:'',//屏幕高度
    avatarUrl: defaultAvatarUrl,
    catchtouchmove:false,
    nickName:"",

    index: 0,
    multiArray: [['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'], ['北京市']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '北京市'
        },
        {
          id: 1,
          name: '天津市'
        }
        ,
        {
          id: 2,
          name: '河北省'
        },
        {
          id: 3,
          name: '山西省'
        },
        {
          id: 4,
          name: '内蒙古自治区'
        },
        {
          id: 5,
          name: '辽宁省'
        },
        {
          id: 6,
          name: '吉林省'
        },
        {
          id: 7,
          name: '黑龙江省'
        },
        {
          id: 8,
          name: '上海市'
        },
        {
          id: 9,
          name: '江苏省'
        },
        {
          id: 10,
          name: '浙江省'
        },
        {
          id: 11,
          name: '安徽省'
        },
        {
          id: 12,
          name: '福建省'
        },
        {
          id: 13,
          name: '江西省'
        },
        {
          id: 14,
          name: '山东省'
        },
        {
          id: 15,
          name: '河南省'
        },
        {
          id: 16,
          name: '湖北省'
        },
        {
          id: 17,
          name: '湖南省'
        },
        {
          id: 18,
          name: '广东省'
        },
        {
          id: 19,
          name: '广西壮族自治区'
        },
        {
          id: 20,
          name: '海南省'
        },
        {
          id: 21,
          name: '重庆市'
        },
        {
          id: 22,
          name: '四川省'
        },
        {
          id: 23,
          name: '贵州省'
        },
        {
          id: 24,
          name: '云南省'
        },
        {
          id: 25,
          name: '西藏自治区'
        },
        {
          id: 26,
          name: '陕西省'
        },
        {
          id: 27,
          name: '甘肃省'
        },
        {
          id: 28,
          name: '青海省'
        },
        {
          id: 29,
          name: '宁夏回族自治区'
        },
        {
          id: 30,
          name: '新疆维吾尔自治区'
        },
        {
          id: 31,
          name: '台湾省'
        },
        {
          id: 32,
          name: '香港特别行政区'
        },
        {
          id: 33,
          name: '澳门特别行政区'
        }
      ], [
        {
          id: 0,
          name: '北京市'
        }
      ],
    ],
    multiIndex: [0, 0],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    
    city: '',
    region: [], // 用于存储选择的省份和城市
 
    
  },

  // 监听picker的选择变化事件
  changeRegion(e) {
    const region = e.detail.value;
    const selectedCity = region[1]; // 获取选择的城市
    this.setData({
      city: selectedCity, // 更新城市信息
    });
    this.loadOrders(selectedCity); // 刷新订单数据
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 检查位置权限
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] === undefined) {
          // 如果用户尚未授权，或者还没有做出选择
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              // 用户同意授权，可以执行获取位置的操作
              this.getLocation();
            },
            fail: () => {
              // 用户拒绝授权，执行默认操作或提醒用户授权
              this.setDefaultCity();
            }
          });
        } else if (res.authSetting['scope.userLocation'] === true) {
          // 用户已经同意授权，可以执行获取位置的操作
          this.getLocation();
        } else {
          // 用户拒绝授权，执行默认操作或提醒用户授权
          this.setDefaultCity();
        }
      },
    });
    const user = wx.getStorageSync('user_info');
    if(user != ''){
      this.setData({
        show: false,
        nickName: user.nickName
      })
    }
    else{
      this.setData({
        show: true
      })
    }
    // 加载订单数据并显示在页面上
    this.loadOrders(this.data.city);
  },
  
  // 获取位置信息
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 调用逆地理编码 API，获取城市信息
        this.reverseGeocode(latitude, longitude);
      },
      fail: (err) => {
        console.error('获取位置失败', err);
        this.setDefaultCity();
      }
    });
  },
  
  reverseGeocode: function (latitude, longitude) {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: `${latitude},${longitude}`,
        key: 'DPYBZ-GOP37-AVIXJ-PLB2V-XDZNH-GJFLV', // Replace 'YOUR_API_KEY_HERE' with your actual Tencent Map API key
        get_poi: 1,
      },
      success: (res) => {
        console.log('逆地理编码成功', res);
        const city = res.data.result.address_component.city;
        // 更新城市信息，例如将城市信息存储在页面数据中
        this.setData({
          city: city,
        });
        this.loadOrders(this.data.city);
      },
      fail: (err) => {
        console.error('逆地理编码失败', err);
        this.setDefaultCity();
      }
    });
  },
  setDefaultCity: function () {
    // 更新城市信息为默认值
    this.setData({
      city: '北京市',
    });
    // 弹出中间提示窗口
    wx.showToast({
      title: '获取不到位置，默认北京市',
      icon: 'none',
      duration: 2000
    });
    this.loadOrders(this.data.city);
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindMultiPickerChange: function (e) {
    const selectedCity = this.data.multiArray[1][e.detail.value[1]];
    this.setData({
      multiIndex: e.detail.value,
      city: selectedCity,
    });
    this.loadOrders(this.data.city)
  },

  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    // if (e.detail.column === 0) {
    //   data.multiIndex[1] = 0;
    // }
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['北京市'];
            break;
          case 1:
            data.multiArray[1] = ['天津市'];
            break;
          case 2:
            data.multiArray[1] = ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'];
            break;
          case 3:
            data.multiArray[1] = ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'];
            break;  
          case 4:
            data.multiArray[1] = ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市 ', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市', '兴安盟', '锡林郭勒盟', '阿拉善盟'];
            break;  
          case 5:
            data.multiArray[1] = ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'];
            break;  
          case 6:
            data.multiArray[1] = ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'];
            break;  
          case 7:
            data.multiArray[1] = ['哈尔滨', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区'];
            break;  
          case 8:
            data.multiArray[1] = ['上海市'];
            break;  
          case 9:
            data.multiArray[1] = ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'];
            break;  
          case 10:
            data.multiArray[1] = ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'];
            break;  
          case 11:
            data.multiArray[1] = ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '毫州市', '池州市', '宣城市'];
            break;  
          case 12:
            data.multiArray[1] = ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市', '平潭综合试验区'];
            break;  
          case 13:
            data.multiArray[1] = ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'];
            break;  
          case 14:
            data.multiArray[1] = ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'];
            break;  
          case 15:
            data.multiArray[1] = ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市'];
            break;  
          case 16:
            data.multiArray[1] = ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州'];
            break;  
          case 17:
            data.multiArray[1] = ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永川市', '怀化市', '娄底市', '湘西土家族苗族自治州'];
            break;  
          case 18:
            data.multiArray[1] = ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'];
            break;  
          case 19:
            data.multiArray[1] = ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'];
            break;
          case 20:
            data.multiArray[1] = ['海口市', '三亚市', '三沙市', '儋州市'];
            break;
          case 21:
            data.multiArray[1] = ['重庆市'];
            break;
          case 22:
            data.multiArray[1] = ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'];
            break;
          case 23:
            data.multiArray[1] = ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'];
            break;
          case 24:
            data.multiArray[1] = ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'];
            break;
          case 25:
            data.multiArray[1] = ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市', '阿里地区'];
            break;
          case 26:
            data.multiArray[1] = ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'];
            break;
          case 27:
            data.multiArray[1] = ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '定西市', '临夏回族自治州', '甘南藏族自治州'];
            break;
          case 28:
            data.multiArray[1] = ['西宁市', '海东市', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'];
            break;
          case 29:
            data.multiArray[1] = ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'];
            break;
          case 30:
            data.multiArray[1] = ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭勒蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区'];
            break;
          case 31:
            data.multiArray[1] = ['台北市', '高雄市', '台南市', '台中市', '南投县', '基隆市', '新竹市', '嘉义市', '新北市', '宜兰市', '新竹县', '桃园市', '苗栗县', '彰化县', '嘉义县', '云林县', '屏东县', '台东县', '花莲县', '澎湖县'];
            break;
          case 32:
            data.multiArray[1] = ['香港特别行政区'];
            break;
          case 33:
            data.multiArray[1] = ['澳门特别行政区'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  


  // ldy
  onPullDownRefresh: function () {
    // 显示加载动画
    wx.showNavigationBarLoading();
    this.loadOrders(this.data.city,() => {
      // 隐藏加载动画
      wx.hideNavigationBarLoading();
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    });
  },

  //所有
  loadOrders: function (city,callback) {
    wx.request({
      url: httpUrl + 'getUnOrders',
      data: {
        city: city, // Provide the phone number parameter if needed
        status: '服务中',
        receiveStatus: 0,
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

  all: function () {
    this.setData({ currentTab: 'all' });
    this.loadOrders(); // 在切换到“全部”标签时刷新订单数据
  },

  //接单按钮
  acceptOrder: function (e) {
    const orderNumber = e.currentTarget.dataset.orderNumber;
    const receiveStatus = 1;

    const timestamp = Date.now();
    const orderTime = new Date(timestamp); // 创建订单时间对象
    const receiveOrderTime = `${orderTime.getFullYear()}-${(orderTime.getMonth() + 1).toString().padStart(2, '0')}-${orderTime.getDate().toString().padStart(2, '0')} ${orderTime.getHours().toString().padStart(2, '0')}:${orderTime.getMinutes().toString().padStart(2, '0')}:${orderTime.getSeconds().toString().padStart(2, '0')}`;

    const user =  wx.getStorageSync('user_info', user)
    const receiveNickName = user.nickName;

    const deleteStatus = 0;

    const countAndcertificate = wx.getStorageSync('countAndcertificate', countAndcertificate)
    const orderCount = countAndcertificate.orderCount;
    const certificate = countAndcertificate.certificate;

    const receive = wx.getStorageSync('receive', receive)
    const receiveName = receive.receiveName 
    const receiveIdCard = receive.receiveIdCard
    const receivePhoneNumber = receive.receivePhoneNumber

    // 发送请求到后端，更新订单的receiveStatus为1
    wx.request({
      url: httpUrl + 'updateReceiveStatus/' + orderNumber + '/' + receiveStatus + '/' + receiveOrderTime + '/' + receiveNickName + '/' + deleteStatus + '/' + certificate,
      method: 'PUT', // 或 'PUT'，具体根据后端API的要求来设置
      success: (res) => {
        // 请求成功，你可以在这里处理成功后的逻辑，比如刷新页面或者显示提示信息
        wx.showToast({
          title: '接单成功',
          icon: 'success',
          duration: 2000,
          mask: true
        });
        // 更新订单数
        wx.request({
          url: httpUrl + 'updateOrderCount/' + receiveName + '/' + receiveIdCard + '/' + receivePhoneNumber + '/' + orderCount,
          method: 'PUT',
          success: (res) => {
            // 更新成功后的处理
            console.log("更新订单数成功")
          },
          fail: (error) => {
            console.error('Failed to update order status:', error);
          }
        })
        this.loadOrders(this.data.city);
      },
      fail: (error) => {
        // 请求失败，你可以在这里处理失败后的逻辑，比如显示错误信息
        wx.showToast({
          title: '接单失败',
          icon: 'none',
          duration: 2000,
        });
        console.error('接单失败', error);
      },
    });
    this.loadOrders(this.data.city,() => {
      // 隐藏加载动画
      wx.hideNavigationBarLoading();
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    });
  },

  // 头像
  onChooseAvatar(e) {
    console.log(e.detail.avatarUrl);
    this.setData({
      avatarUrl:e.detail.avatarUrl,
    })
    
  },

  
  // 打开弹窗
  getnick(e){
    console.log(e.detail.value)
    this.setData({
      nickName:e.detail.value
    })
  },
  closePopup(){
  //在需要退出小程序的地方调用添加下面代码即可(js文件中)
  wx.exitMiniProgram({success: (res) => {}})
    this.setData({
      show:false
    })
  },
  submit(e){
    const user = wx.getStorageSync();
    if(user != null){
      this.setData({
        show: false
      })
      console.log("111");
      wx.switchTab({
        url: '/pages/dating/dating',
      })
    }
    else{
      if(this.data.nickName == '' ||　this.data.avatarUrl == ''　
      || this.data.receiveName == '' ||　this.data.receiveIdCard == ''　
      ||　this.data.receivePhoneNumber == ''){
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 2000
        })
      }
      else{
        wx.request({
          url: httpUrl + 'getReceiver',
          data: {
            receiveName:this.data.receiveName,
            receiveIdCard:this.data.receiveIdCard,
            receivePhoneNumber:this.data.receivePhoneNumber,
          },
          method: 'GET',
          success: (res) => {
            const receive = { 
              receiveName: this.data.receiveName,
              receiveIdCard: this.data.receiveIdCard,
              receivePhoneNumber: this.data.receivePhoneNumber
            }
            wx.setStorageSync('receive', receive)
  
            console.log(res.data)
            if(res.data == true){
              // 成功返回全部剩余两个数据
              wx.request({
                url: httpUrl + 'getReceiverAll',
                data: {
                  receiveName:this.data.receiveName,
                  receiveIdCard:this.data.receiveIdCard,
                  receivePhoneNumber:this.data.receivePhoneNumber,
                },
                method: 'GET',
                success: (res) => {
                  const orderCount = res.data.orderCount;
                  const certificate = res.data.certificate;
                  this.setData({ 
                    orderCount: orderCount,
                    certificate: certificate
                  });
                  const countAndcertificate = { 
                    orderCount: orderCount,
                    certificate: certificate,
                  }
                  wx.setStorageSync('countAndcertificate', countAndcertificate)
                },
                fail: (error) => {
                  console.error('Request failed', error);
                },
              });
              const user = { 
                avatarUrl:this.data.avatarUrl, 
                nickName: this.data.nickName,
                flag:res.data,
              }
              this.setData({
                show: false
              })
              wx.setStorageSync('user_info', user)
              wx.switchTab({
                url: '/pages/dating/dating',
              })
            }
            else{
              wx.showToast({
                title: '验证凭证失败，请先获取接单资格', //提示的内容
                duration: 2000, //持续的时间
                icon: 'none', //图标有success、error、loading、none四种
                mask: true //显示透明蒙层 防止触摸穿透
              })
            }
          },
          fail: (error) => {
            console.error('Request failed', error);
          },
        });
      }
      
    }
  },

  getreceiveName(e){
    this.setData({
      receiveName:e.detail.value
    })
    // const user = { 
    //   receiveName: this.data.receiveName,
    // }
    // wx.setStorageSync('user_info', user)
    // const test = wx.getStorageSync('user_info', user)
    // console.log(test)
  },
  getreceivePhoneNumber(e){
    this.setData({
     receivePhoneNumber:e.detail.value
    })
  },
  getreceiveIdCard(e){
    this.setData({
     receiveIdCard:e.detail.value
    })
  },

})