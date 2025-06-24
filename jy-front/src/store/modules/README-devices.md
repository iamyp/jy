# 设备数据Store使用说明

## 概述

`useDevicesStore` 是一个Pinia store，用于管理应用中的设备数据，包括救援舟设备（JY设备）、救生设备（JS设备）、侦测点数据、路径数据和雷达点数据。

## 数据结构

### 救援舟设备 (jyDevices)
```javascript
{
  id: "JY-001",           // 设备ID
  distance: 800,          // 距离（米）
  angle: 40.2,           // 方位角（度）
  e: "1.222222",         // 经度坐标
  s: "1.222222",         // 纬度坐标
  video: "video_url",    // 视频流地址
  pathRows: [...]        // 救援路径数据
}
```

### 救生设备 (jsDevices)
```javascript
{
  id: "JS-001",              // 设备ID
  device: "JS-001",          // 设备编号
  distance: 800,             // 距离（米）
  angle: 40.2,              // 方位角（度）
  e: "1.222222",            // 经度坐标
  s: "1.222222",            // 纬度坐标
  temperature: "37.1",       // 体温（℃）
  heartRate: "20bpm",        // 心率
  bloodPressure: "120mmHg",  // 血压
  active: true               // 激活状态
}
```

### 侦测点数据 (detectRows)
```javascript
{
  device: "JS-001",      // 设备编号
  lng: "1.322222",       // 经度
  lat: "2.66666",        // 纬度
  dist: 20,              // 距离（米）
  angle: 40,             // 方位角（度）
  temp: 37.1,            // 体温（℃）
  heart: 82,             // 心率
  rescue: true,          // 是否已安排救援
  rescueDevice: "JY-001" // 救援设备编号
}
```

## 使用方法

### 1. 在组件中导入和使用

```vue
<script setup>
import useDevicesStore from "@/store/modules/devices";

const devicesStore = useDevicesStore();
const { jyDevices, jsDevices, points } = storeToRefs(devicesStore);
</script>

<template>
  <div v-for="device in jyDevices" :key="device.id">
    {{ device.id }} - {{ device.distance }}米
  </div>
</template>
```

### 2. 使用Getters

```javascript
// 获取活跃的救生设备
const activeDevices = devicesStore.activeJsDevices;

// 获取需要救援的侦测点
const needRescue = devicesStore.rescueNeededDetects;

// 根据ID获取特定设备
const device = devicesStore.getJyDeviceById("JY-001");
```

### 3. 使用Actions修改数据

```javascript
// 更新救援舟设备信息
devicesStore.updateJyDevice("JY-001", {
  distance: 900,
  angle: 45.0
});

// 切换救生设备激活状态
devicesStore.toggleJsDeviceActive("JS-001");

// 更新侦测点救援状态
devicesStore.updateDetectRescueStatus("JS-001", true, "JY-001");

// 添加新的路径项
devicesStore.addPathRow({
  order: 3,
  device: "JS-003"
});
```

## 可用的Actions

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `updateJyDevice(id, data)` | id: 设备ID, data: 更新数据 | 更新救援舟设备信息 |
| `updateJsDevice(id, data)` | id: 设备ID, data: 更新数据 | 更新救生设备信息 |
| `toggleJsDeviceActive(id)` | id: 设备ID | 切换救生设备激活状态 |
| `addDetectRow(detectData)` | detectData: 侦测点数据 | 添加新的侦测点 |
| `updateDetectRescueStatus(deviceId, rescueStatus, rescueDevice)` | deviceId: 设备ID, rescueStatus: 救援状态, rescueDevice: 救援设备 | 更新侦测点救援状态 |
| `updatePathRows(newPathRows)` | newPathRows: 新的路径数据数组 | 更新整个路径表 |
| `addPathRow(pathData)` | pathData: 路径数据 | 添加路径项 |
| `removePathRow(index)` | index: 数组索引 | 删除路径项 |
| `updatePoints(newPoints)` | newPoints: 新的雷达点数据 | 更新雷达点 |
| `addPoint(pointData)` | pointData: 雷达点数据 | 添加雷达点 |

## 可用的Getters

| Getter名 | 返回值 | 说明 |
|----------|--------|------|
| `activeJsDevices` | Array | 返回所有激活状态的救生设备 |
| `rescueNeededDetects` | Array | 返回需要救援的侦测点 |
| `getJyDeviceById(id)` | Object | 根据ID获取救援舟设备 |
| `getJsDeviceById(id)` | Object | 根据ID获取救生设备 |

## 响应式数据

所有的state数据都是响应式的，当数据发生变化时，使用了`storeToRefs`的组件会自动更新。

## 注意事项

1. 使用`storeToRefs`来保持响应性
2. 直接修改state数据请使用提供的actions方法
3. 所有的设备ID应该保持唯一性
4. 在更新数据前请确保设备存在 