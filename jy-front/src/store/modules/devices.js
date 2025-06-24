const useDevicesStore = defineStore('devices', {
  state: () => ({
    // 救援舟设备数据
    jyDevices: [
      {
        id: "JY-001",
        distance: 800,
        angle: 40.2,
        e: "1.322222",
        s: "1.222222",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        pathRows: [
          { order: 1, device: "JS-001" },
          { order: 2, device: "JS-002" },
        ],
      },
      {
        id: "JY-002",
        distance: 800,
        angle: 40.2,
        e: "2.222222",
        s: "3.333333",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        pathRows: [
          { order: 1, device: "JS-001" },
          { order: 2, device: "JS-002" },
        ],
      },
    ],
    
    // 救生设备数据
    jsDevices: [
      {
        id: "JS-001",
        device: "JS-001",
        distance: 800,
        angle: 40.2,
        e: "1.222222",
        s: "1.222222",
        temperature: "37.1",
        heartRate: "20bpm",
        bloodPressure: "120mmHg",
        active: true,
      },
      {
        id: "JS-002",
        device: "JS-002",
        distance: 600,
        angle: 30.2,
        e: "1.222222",
        s: "1.222222",
        temperature: "36.6",
        heartRate: "19bpm",
        bloodPressure: "121mmHg",
        active: true,
      },
      {
        id: "JS-003",
        device: "JS-003",
        distance: 400,
        angle: 50.2,
        e: "1.222222",
        s: "1.222222",
        temperature: "36.5",
        heartRate: "21bpm",
        bloodPressure: "122mmHg",
        active: false,
      },
      {
        id: "JS-004",
        device: "JS-004",
        distance: 500,
        angle: 35.5,
        e: "1.333333",
        s: "1.444444",
        temperature: "36.8",
        heartRate: "18bpm",
        bloodPressure: "118mmHg",
        active: true,
      },
      {
        id: "JS-005",
        device: "JS-005",
        distance: 350,
        angle: 45.8,
        e: "1.555555",
        s: "1.666666",
        temperature: "37.2",
        heartRate: "22bpm",
        bloodPressure: "125mmHg",
        active: true,
      },
    ],
    
    // 侦测点表格数据
    detectRows: [
      {
        device: "JS-001",
        lng: "1.322222",
        lat: "2.66666",
        dist: 20,
        angle: 40,
        temp: 37.1,
        heart: 82,
        rescue: true,
        rescueDevice: "JY-001",
      },
      {
        device: "JS-002",
        lng: "1.322222",
        lat: "1.66666",
        dist: 20,
        angle: 40,
        temp: 36.1,
        heart: 82,
        rescue: true,
        rescueDevice: "JY-002",
      },
      {
        device: "JS-003",
        lng: "2.322222",
        lat: "2.66666",
        dist: 20,
        angle: 40,
        temp: 37.1,
        heart: 82,
        rescue: false,
        rescueDevice: "JY-003",
      },
    ],
    
    // 路径表数据
    pathRows: [
      { order: 1, device: "JS-001" },
      { order: 2, device: "JS-002" },
    ],
    
    // 雷达点数据
    points: [
      { x: 0, y: 0, color: "#00ffff", radius: 8 },
      { x: 80, y: -60, color: "#00ffff", radius: 6 },
      { x: -100, y: 100, color: "#00ffff", radius: 10 },
    ],
  }),
  
  getters: {
    // 获取活跃的救生设备
    activeJsDevices: (state) => {
      return state.jsDevices.filter(device => device.active);
    },
    
    // 获取需要救援的侦测点
    rescueNeededDetects: (state) => {
      return state.detectRows.filter(row => !row.rescue);
    },
    
    // 根据ID获取救援舟设备
    getJyDeviceById: (state) => {
      return (id) => state.jyDevices.find(device => device.id === id);
    },
    
    // 根据ID获取救生设备
    getJsDeviceById: (state) => {
      return (id) => state.jsDevices.find(device => device.id === id);
    },
  },
  
  actions: {
    // 更新救援舟设备信息
    updateJyDevice(id, data) {
      const index = this.jyDevices.findIndex(device => device.id === id);
      if (index !== -1) {
        this.jyDevices[index] = { ...this.jyDevices[index], ...data };
      }
    },
    
    // 更新救生设备信息
    updateJsDevice(id, data) {
      const index = this.jsDevices.findIndex(device => device.id === id);
      if (index !== -1) {
        this.jsDevices[index] = { ...this.jsDevices[index], ...data };
      }
    },
    
    // 切换救生设备激活状态
    toggleJsDeviceActive(id) {
      const device = this.jsDevices.find(device => device.id === id);
      if (device) {
        device.active = !device.active;
      }
    },
    
    // 添加侦测点
    addDetectRow(detectData) {
      this.detectRows.push(detectData);
    },
    
    // 更新侦测点救援状态
    updateDetectRescueStatus(deviceId, rescueStatus, rescueDevice = null) {
      const detect = this.detectRows.find(row => row.device === deviceId);
      if (detect) {
        detect.rescue = rescueStatus;
        if (rescueDevice) {
          detect.rescueDevice = rescueDevice;
        }
      }
    },
    
    // 更新路径表
    updatePathRows(newPathRows) {
      this.pathRows = [...newPathRows];
    },
    
    // 添加路径项
    addPathRow(pathData) {
      this.pathRows.push(pathData);
    },
    
    // 删除路径项
    removePathRow(index) {
      this.pathRows.splice(index, 1);
    },
    
    // 更新雷达点
    updatePoints(newPoints) {
      this.points = [...newPoints];
    },
    
    // 添加雷达点
    addPoint(pointData) {
      this.points.push(pointData);
    },
  },
});

export default useDevicesStore;
