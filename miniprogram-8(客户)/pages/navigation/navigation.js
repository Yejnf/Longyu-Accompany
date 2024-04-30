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
      iconPath: '/images/福建医科大学附属第一医院.jpg',
      latitude: '26.07610',
      longitude: '119.30840'
    },
    {
      name: '福建医科大学附属协和医院',
      address: '福建省福州市鼓楼区新权路29号',
      iconPath: '/images/福建医科大学附属协和医院.jpg',
      latitude: '26.08366',
      longitude: '119.31023'
    }
  ],
};

const httpUrl = 'http://192.168.48.4:8099/'
Page({

  data: {
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
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    
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
    // this.setData({
    //   multiIndex: e.detail.value
    // })

    const selectedCity = this.data.multiArray[1][e.detail.value[1]];
    this.setData({
      multiIndex: e.detail.value,
      city: selectedCity,
    });
    // 加载选中城市的医院数据
    this.loadHospitalsByCity(selectedCity);
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
        // const selectedCity = this.data.multiArray[1][this.data.multiIndex[1]];
        // this.setData({
        //   multiIndex: data.multiIndex,
        //   city: selectedCity,
        // });
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
  onLoad: function (options) {
    // 接收传递过来的city参数并存储在页面数据中
    if (options.city) {
      this.setData({
        city: options.city
      });
    }
    this.loadHospitalsByCity(this.data.city);
    // 其他页面初始化逻辑
  },
  
  // 示例函数，根据城市加载医院数据，你需要替换成实际的数据请求逻辑
  loadHospitalsByCity: function (city) {
    // 从医院数据对象中获取城市对应的医院数据
    const hospitalsDataForCity = hospitalsData[city] || [];
    //打印没问题
    console.log(hospitalsDataForCity+"loadHospitalByCity")
    this.setData({
      hospitals: hospitalsDataForCity,
    });
  },

  // 点击医院名称的事件处理函数
  //打印没问题
  onHospitalTap: function (e) {
    const hospitalName = e.currentTarget.dataset.name; // 获取医院名称
    console.log('点击了医院名称：', hospitalName);

     // 使用 wx.showToast 显示选中医院的名称
    wx.showToast({
      title: '选择了医院：' + hospitalName,
      icon: 'none', // 显示无图标
      duration: 1000, // 持续显示时间为2秒
      // mask: 'true'
    });

    console.log('1')
    // 可以在这里添加更多的处理逻辑，如跳转到医院详情页面等
    const hospitals = this.data.hospitals;
    const selectedHospital = hospitals.find((item) => item.name === hospitalName);
    this.showMapOptionsDialog(selectedHospital);

    this.setData({
      selectedHospital: selectedHospital,
      showMapOptions: true,
    });
    console.log('2')
  },

  //跳转地图app
  // 显示地图选项弹窗
  showMapOptionsDialog(hospital) {
    //打印成功
    console.log("showMapOptionsDialog")
    this.setData({
      showMapOptions: true,
      selectedHospital: hospital,
    });
  },

  // 隐藏地图选项弹窗
  hideMapOptionsDialog() {
    //打印成功
    console.log("hideMapOptionsDialog")
    this.setData({
      showMapOptions: false,
    });
  },

  // 打开百度地图
  openBaiduMap() {
    const hospital = this.data.selectedHospital;
    //打印失败
    console.log("openBaiduMap")
    if (hospital) {
      console.log("Selected Hospital:", hospital); 
      const name = hospital.name;
      const address = hospital.address;
      // 获取用户的当前位置
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          const latitude = res.latitude; // 获取用户当前位置的纬度
          const longitude = res.longitude; // 获取用户当前位置的经度
          // 设置起点和终点坐标
          const startPoint = `${latitude},${longitude}`;
          const endPoint = `${hospital.latitude},${hospital.longitude}`; // 这里是医院的经纬度坐标，请替换为实际的医院坐标

          // 使用微信小程序的API打开地图导航
          wx.openLocation({
            latitude: parseFloat(endPoint.split(',')[0]),
            longitude: parseFloat(endPoint.split(',')[1]),
            name,
            address,
            scale: 18,
          });
        },
        fail(err) {
          console.error('获取用户位置失败', err);
          wx.showToast({
            title: '无法获取您的位置信息，请检查是否已授权位置权限',
            icon: 'none',
            duration: 2000,
          });
        },
      });
    }
    else{
      console.log("Selected Hospital is invalid.");
    }
    this.hideMapOptionsDialog();
  },
  

})