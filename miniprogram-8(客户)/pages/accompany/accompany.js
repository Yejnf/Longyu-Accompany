const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
const manager = plugin.getRecordRecognitionManager();

const httpUrl = 'http://192.168.48.4:8099/'
// 在 Page 函数中定义一个医院数据对象
const hospitalsData = {
  '天津市': [
    {
      name: '天津医科大学总医院',
      address: '天津市和平区鞍山道154号',
      iconPath: '/images/天津医科大学总医院.jpg',
      latitude: '39.11739',
      longitude: '117.18492'
    },
    {
      name: '中国医学科学院血液病医院',
      address: '天津市和平区南京路288号',
      iconPath: '/images/中国医学科学院血液病医院.jpg',
      latitude: '39.121588',
      longitude: '117.183017'
    },
    // 其他医院...
  ],
  '三明市': [
    {
      name: '三明市中西医结合医院',
      address: '福建省三明市三元区沙洲路58号',
      iconPath: '/images/三明市中西医结合医院.jpg',
      latitude: '26.23202',
      longitude: '117.60229'
    },
    {
      name: '三明市第一医院',
      address: '福建省三明市梅列区列东街29号',
      iconPath: '/images/三明市第一医院.jpg',
      latitude: '26.260818',
      longitude: '117.635305'
    },
    // 其他医院...
  ],
  '北京市': [
    {
      name: '中国人民解放军总医院第一医学中心',
      address: '北京市海淀区复兴路28号',
      iconPath: '/images/中国人民解放军总医院第一医学中心.jpg',
      latitude: '39.902097',
      longitude: '116.276414'
    },
    {
      name: '北京大学第一医院',
      address: '北京市西城区西什库大街8号',
      iconPath: '/images/北京大学第一医院.jpg',
      latitude: '39.932119',
      longitude: '116.380771'
    },
    // 其他医院...
  ],
  '厦门市': [
    {
      name: '厦门大学附属中山医院',
      address: '福建省厦门市思明区湖滨南路201-209号',
      iconPath: '/images/厦门大学附属中山医院.jpg',
      latitude: '24.471352',
      longitude: '118.098313'
    }
  ],
  '广州市': [
    {
      name: '中山大学附属第一医院',
      address: '广东省广州市越秀区中山二路58号',
      iconPath: '/images/中山大学附属第一医院.jpg',
      latitude: '23.126256',
      longitude: '113.291159'
    }
  ],
  '福州市': [
    {
      name: '福建医科大学附属第一医院',
      address: '福建省福州市台江区茶中路20号',
      iconPath: '/images/福建医科大学附属第一医院.webp',
      latitude: '26.07610',
      longitude: '119.30840'
    },
    {
      name: '福建医科大学附属协和医院',
      address: '福建省福州市鼓楼区新权路29号',
      iconPath: '/images/福建医科大学附属协和医院.webp',
      latitude: '26.08366',
      longitude: '119.31023'
    }
  ],
};

Page({
  data: {
    // 语音
    recordState: false, //录音状态

    show:false,
    showIndex:null,//打开弹窗的对应下标
    height:'',//屏幕高度
    avatarUrl: defaultAvatarUrl,
    catchtouchmove:false,
    nickName:"",


    price: 500, // 在data对象中定义一个price变量，并将值设置为500
    name: '',
    idCard: '', // 身份证号码
    department: '', // 就诊科室
    requirement: '', //服务需求

    orderModalVisible: false, // 控制订单状态选择弹出层的显示与隐藏
    selectedStatus: '', // 用于存储用户选择的状态
    orderStatusOptions: ['待支付', '服务中', '已完成', '退款/售后'], // 可选的状态
  
    agreeChecked: false, // 初始复选框状态为未勾选
    showModal: false,
    showAgreementPopup: false, // 控制用户协议弹出层的显示与隐藏
    userInfo: null,
    phoneNumber: '', // 用于存储用户的手机号码
    selectedDate: '', // 用于保存用户选择的日期
    selectedTime: '', // 用于保存用户选择的时间
    selectedHospitalName: '', // 用于存储用户选择的医院名称
    showMapOptions: false, // 控制地图选项弹窗显示与隐藏
    selectedHospital: {}, // 存储当前选中的医院信息
    hospitals: [],
    city: '',
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
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') && wx.canIUse('getPhoneNumber'), // Updated to check for getPhoneNumber support
   // 如需尝试获取用户信息可改为false
    
    region: [], // 用于存储选择的省份和城市
  },
  navigateBack: function () {
    wx.navigateBack()
  },
  // 监听picker的选择变化事件
  changeRegion(e) {
    const region = e.detail.value;
    const selectedCity = region[1]; // 获取选择的城市
    this.setData({
      city: selectedCity, // 更新城市信息
    });
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const selectedCity = this.data.multiArray[1][e.detail.value[1]];
    this.setData({
      multiIndex: e.detail.value,
      city: selectedCity,
      selectedHospitalName: '', // 清空选中的医院名称
    });
     // 如果城市不为空，加载选中城市的医院数据
    if (selectedCity) {
      this.loadHospitalsByCity(selectedCity);
    }
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  loadHospitalsByCity: function (city) {
    // 从 hospitalsData 中获取特定城市的医院数据
    const hospitals = hospitalsData[city] || [];
  
    // 提取医院名称并存储在一个数组中
    const hospitalNames = hospitals.map(hospital => hospital.name);
    // 更新页面数据
    this.setData({
      hospitals: hospitalNames,
      selectedHospital: {} // 清空选中的医院信息
    });
  },
  selectHospital: function (e) {
    const selectedHospitalIndex = e.detail.value;
    const selectedHospitalName = this.data.hospitals[selectedHospitalIndex];
    this.setData({
      selectedHospitalName: selectedHospitalName, // 存储用户选择的医院名称
    });
  },
  

  // 处理用户选择日期的事件
  selectDate: function (event) {
    const selectedDate = event.detail.value;
    const today = new Date(); // 获取今天的日期
    const selected = new Date(selectedDate);

    if (selected >= today) {
      this.setData({
        selectedDate: selectedDate
      });
    } else {
      // 如果选择的日期在今天之前，可以显示一个提示或者不执行任何操作
      wx.showToast({
        title: '请至少提前一天选择日期',
        icon: 'none',
        duration: 2000  
      });
    }
  },
  // 处理用户选择时间的事件
  selectTime: function (event) {
    const selectedTime = event.detail.value;
    this.setData({
      selectedTime: selectedTime
    });
  },
  onLoad: function (options) {
      const user = wx.getStorageSync('user_info');
      this.setData({
        nickName: user.nickName,
        avatarUrl: user.avatarUrl
      })
      // 接收传递过来的city参数并存储在页面数据中
      if (options.city) {
        this.setData({
          city: options.city
        });
      }
      this.loadHospitalsByCity(options.city);
      // 其他页面初始化逻辑
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
      this.initRecord();
    
  },
  // 点击按钮触发获取用户信息的操作
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
    if (e.detail.userInfo) {
      // 用户已授权，获取用户信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    } else {
      // 用户未授权，可以显示提示信息
      console.log("用户未授权获取用户信息");
    }
  },
  // console.log("sessionKey:"+sessionKey+"\n"+"encryptedData:"+encryptedData+"\n"+"iv:"+iv+"\n")
  // 51cfd24ff3b988a10533f8711f35eef1
  // 获取用户手机号码的事件处理函数
  getPhoneNumber: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 使用wx.login获取用户的登录凭证
          var code = res.code;
          
          // 发送code到后端
          wx.request({
            url: httpUrl+'getPhoneNumber', // 替换成你的后端接口URL
            method: 'POST',
            data: { code: code },
            success: (res) => {
              if (res.statusCode === 200) {
                // 后端成功返回手机号码
                var phoneNumber = res.data.phoneNumber;

                // 更新小程序页面的phoneNumber变量，以便在页面中显示
                this.setData({
                  phoneNumber: phoneNumber,
                });
              } else {
                console.error('后端请求失败', res.statusCode);
              }
            },
            fail: (error) => {
              console.error('后端请求失败', error);
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },

  showAgreement: function() {
    this.setData({
      showModal: true, // 点击服务协议时显示弹出层
    });
  },
  hideModal: function() {
    this.setData({
      showModal: false, // 点击关闭按钮或其他地方时隐藏弹出层
    });
  },
  agree: function() {
    // 处理用户同意服务协议的逻辑，可以在这里添加你的代码

    // 勾选复选框
    this.setData({
      agreeChecked: true,
    });

    // 关闭弹出层
    this.hideModal();
  },
  checkboxChange: function(e) {
    // 当复选框状态发生变化时更新 data 中的 agreeChecked 变量
    this.setData({
      agreeChecked: e.detail.value,
    });
  },

  inputName: function (event) {
    const selectedName = event.detail.value;
    this.setData({
      name: selectedName
    });
  },
  inputIdCard: function (event) {
    const selectedIdCard = event.detail.value;
    this.setData({
      idCard: selectedIdCard
    });
  },
  inputDepartment: function (event) {
    const selectedDepartment = event.detail.value;
    this.setData({
      department: selectedDepartment
    });
  },
  inputRequirement: function (event) {
    const selectedRequirement = event.detail.value;
    this.setData({
      requirement: selectedRequirement
    });
  },
  inputPrice: function (event) {
    const selectedPrice = this.data.price;
    this.setData({
      price: selectedPrice
    });
  },
  
  // 点击"确认订单"按钮时触发的事件
  showConfirmOrder: function() {
    // 检查表单项是否已经填写完成
    if (!this.isFormValid()) {
      wx.showToast({
        title: '请填写完整的订单信息',
        icon: 'none',
        duration: 2000 // 提示持续时间2秒
      });
      return;
    }
    else{
      this.setData( {
        orderModalVisible: true
      });
    }
  },

  isFormValid: function () {
    // 获取表单项的值
    const name = this.data.name; // 姓名
    const phoneNumber = this.data.phoneNumber; // 手机号码
    const idCard = this.data.idCard; // 身份证号码
    const department = this.data.department; // 就诊科室
    const selectedDate = this.data.selectedDate; // 就诊日期
    const selectedTime = this.data.selectedTime; // 就诊时间
    const city = this.data.city; // 城市
    const selectedHospitalName = this.data.selectedHospitalName; // 医院
    const agreeChecked = this.data.agreeChecked; //复选框状态
    const requirement = this.data.requirement; //服务需求
    const price = this.data.price;
    // console.log("name:"+name+"\n"+"phoneNumber:"+phoneNumber+"\n"+"idCard:"+idCard+"\n"+"department:"+department+"\n"+"selectedDate:"+selectedDate+"\n"+"selectedTime:"+selectedTime+ "\n" + "city:" + city + "\n" + "selectedHospitalName:" + selectedHospitalName+"\n"+"agreeChecked:"+agreeChecked+"\n"+"requirement:"+requirement+"\n")
    // 在这里添加其他表单项的检查逻辑，例如服务需求等

    // 判断是否所有表单项都已经填写
    if (
      !name ||
      !phoneNumber ||
      !idCard ||
      !department ||
      !selectedDate ||
      !selectedTime ||
      !city ||
      !selectedHospitalName ||
      !agreeChecked
      
    ) {
      return false; // 有未填写的表单项
    }

    return true; // 所有表单项都已填写
  },
  // 点击订单状态按钮时触发的事件
  selectOrderStatus: function(e) {
    const status = e.currentTarget.dataset.status; // 获取按钮上的data-status属性值
     // 生成唯一的订单号，使用时间戳作为订单号
    const timestamp = Date.now();
    const orderNumber = 'ORDER' + timestamp; // 这里可以根据实际需求定义订单号格式
    const orderTime = new Date(timestamp); // 创建订单时间对象
    const formattedOrderTime = `${orderTime.getFullYear()}-${(orderTime.getMonth() + 1).toString().padStart(2, '0')}-${orderTime.getDate().toString().padStart(2, '0')} ${orderTime.getHours().toString().padStart(2, '0')}:${orderTime.getMinutes().toString().padStart(2, '0')}:${orderTime.getSeconds().toString().padStart(2, '0')}`;


    const phoneNumber = this.data.phoneNumber; // 手机号码
    const name = this.data.name; // 姓名
    const idCard = this.data.idCard; // 身份证号码
    const department = this.data.department; // 就诊科室
    const selectedDate = this.data.selectedDate; // 就诊日期
    const selectedTime = this.data.selectedTime; // 就诊时间
    const city = this.data.city; // 城市
    const selectedHospitalName = this.data.selectedHospitalName; // 医院
    const agreeChecked = this.data.agreeChecked; //复选框状态
    const requirement = this.data.requirement; //服务需求
    const price = this.data.price;

    // 头像
    const user = wx.getStorageSync('user_info');
    const nickName = user.nickName;
    const avatarUrl = user.avatarUrl;

    const randomString = '';

    const deleteStatus = 0;
    const certificate = ''
    console.log(nickName+"好好好\n"+avatarUrl)
    this.setData({
      selectedStatus: status, // 保存选择的订单状态
      orderModalVisible: false, // 关闭订单状态选择弹出层
      orderNumber: orderNumber, // 保存生成的订单号
      orderTime: formattedOrderTime, // 保存格式化后的订单时间
    });
    // 输出选择的订单状态和生成的订单号
    console.log("选择的订单状态是：" + status);
    console.log("生成的订单号是：" + orderNumber);
    console.log("生成的订单时间是：" + orderTime);
    // 发送数据到后端
    wx.request({
      url: httpUrl + 'submitOrder',
      method: 'POST',
      data: {
        orderNumber: orderNumber,
        status: status,
        phoneNumber:phoneNumber,
        name: name,
        idCard: idCard,
        department: department,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        city: city,
        selectedHospitalName: selectedHospitalName,
        agreeChecked: agreeChecked,
        requirement: requirement,
        orderTime: formattedOrderTime,
        price: price,

        // 接单状态默认0
        receiveStatus:0,
        // 接单时间
        receiveOrderTime: '',
        nickName: nickName,
        receiveNickName: '',
        avatarUrl:　avatarUrl,

        randomString: randomString,
        deleteStatus: deleteStatus,
        certificate: certificate
      },
      success: function (res) {
        console.log("name:"+name+"\n"+"phoneNumber:"+phoneNumber+"\n"+"idCard:"+idCard+"\n"+"department:"+department+"\n"+"selectedDate:"+selectedDate+"\n"+"selectedTime:"+selectedTime+ "\n" + "city:" + city + "\n" + "selectedHospitalName:" + selectedHospitalName+"\n"+"agreeChecked:"+agreeChecked+"\n"+"requirement:"+requirement+"\n"+"price:"+price+"\n")
        console.log('数据成功发送到后端');
        // 在这里可以处理后端响应
      },
      fail: function (error) {
        console.error('发送数据到后端失败', error);
      }
    });

    wx.uploadFile({
      url: httpUrl + 'upload/image',
      method: 'POST',
      filePath: avatarUrl, // 要上传的文件路径
      name: 'file', // 与后端控制器中@RequestParam("file")对应
      success: function (res) {
        console.log("成功")
      },
      fail: function (error) {
        console.error('发送数据到后端失败', error);
      }
    });

    wx.navigateBack({
      delta: 1, // 返回的页面数，这里假设是返回到首页
    });
  },


  // 语音

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
        requirement:  text
      })
      
    }
  },
  //语音  --按住说话
  touchStart: function (e) {
    this.setData({
      recordState: true  //录音状态
    })
    // 语音开始识别
    manager.start({
      duration: 10000,
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

})

