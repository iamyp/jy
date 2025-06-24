const useDevicesStore = defineStore("devices", {
  state: () => ({
    // 救援舟设备数据
    jyDevices: [],

    // 救生设备数据
    jsDevices: [],

    // 侦测点表格数据
    detectRows: [],

    // 路径表数据
    // pathRows: [],

    // 雷达点数据
    points: [],

    // 初始化状态
    isInitialized: false,
  }),

  getters: {
    // 获取活跃的救生设备
    // activeJsDevices: (state) => {
    //   return state.jsDevices.filter((device) => device.active);
    // },

    // 获取需要救援的侦测点
    // rescueNeededDetects: (state) => {
    //   return state.detectRows.filter((row) => !row.rescue);
    // },

    // 根据ID获取救援舟设备
    getJyDeviceById: (state) => {
      return (id) => state.jyDevices.find((device) => device.id === id);
    },

    // 根据ID获取救生设备
    getJsDeviceById: (state) => {
      return (id) => state.jsDevices.find((device) => device.id === id);
    },
  },

  actions: {
    // 设置救援舟设备数据
    setJyDevices(devices) {
      this.jyDevices = devices;
    },

    // 设置救生设备数据
    setJsDevices(devices) {
      this.jsDevices = devices;
    },

    // 设置侦测点数据
    setDetectRows(rows) {
      this.detectRows = rows;
    },

    // 设置路径表数据
    // setPathRows(rows) {
    //   this.pathRows = rows;
    // },

    // 设置雷达点数据
    setPoints(points) {
      this.points = points;
    },

    // 标记为已初始化
    markAsInitialized() {
      this.isInitialized = true;
    },

    // 重置设备数据
    resetDevices() {
      this.jyDevices = [];
      this.jsDevices = [];
      this.detectRows = [];
      // this.pathRows = [];
      this.points = [];
      this.isInitialized = false;
    },

    // 更新救援舟设备信息
    updateJyDevice(id, data) {
      const index = this.jyDevices.findIndex((device) => device.id === id);
      if (index !== -1) {
        this.jyDevices[index] = { ...this.jyDevices[index], ...data };
      }
    },

    // 更新救生设备信息
    updateJsDevice(id, data) {
      const index = this.jsDevices.findIndex((device) => device.id === id);
      if (index !== -1) {
        this.jsDevices[index] = { ...this.jsDevices[index], ...data };
      }
    },

    // 切换救生设备激活状态
    toggleJsDeviceActive(id) {
      const device = this.jsDevices.find((device) => device.id === id);
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
      const detect = this.detectRows.find((row) => row.device === deviceId);
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
    removePathRow(jyDeviceId, jsDeviceId) {
      // this.pathRows.splice(index, 1);
      this.jyDevices.forEach((jyDevice) => {
        if (jyDevice.id === jyDeviceId) {
          jyDevice.pathRows.forEach((pathRow) => {
            if (pathRow.device === jsDeviceId) {
              const pathIndex = jyDevice.pathRows.findIndex(pathRow => pathRow.device === jsDeviceId);
              if (pathIndex !== -1) {
                jyDevice.pathRows.splice(pathIndex, 1);
              }
              return;
            }
          });
        }
        // device.pathRows.splice(index, 1);
      });
      this.jsDevices.forEach((jsDevice) => {
        if (jsDevice.id === jsDeviceId) {
          jsDevice.inRescue = false;
        }
      });
    },
    movePathRow(jyDeviceId, idx, direction) {
      this.jyDevices.forEach((jyDevice) => {
        if (jyDevice.id === jyDeviceId) {
          const pathRow = jyDevice.pathRows[idx];
          jyDevice.pathRows.splice(idx, 1);
          jyDevice.pathRows.splice(idx + direction, 0, pathRow);
        }
      });
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
