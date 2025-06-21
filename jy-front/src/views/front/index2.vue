<template>
  <div class="main-content">
    <!-- 上半部分：两组设备卡片 -->
    <div class="device-row">
      <div class="device-card" v-for="item in 2" :key="item">
        <div class="device-header">
          <span>编号：JY-001</span>
          <span class="device-status">已启动</span>
        </div>
        <div class="device-body">
          <img
            class="device-img"
            src="https://img.js.design/assets/img/64e5e2e7b7b6b6b7b7b6b6b7.png"
            alt="boat" />
          <div class="device-info">
            <div class="info-row"><span>E：</span><span>1.222222</span></div>
            <div class="info-row"><span>S：</span><span>1.222222</span></div>
            <div class="info-row">
              <button class="btn-start">启动</button>
              <!-- <button class="btn-arrow">&lt;</button> -->
              <button class="btn-stop">停止</button>
              <!-- <button class="btn-arrow">&gt;</button> -->
            </div>
          </div>
        </div>
        <div class="path-table-wrap">
          <div class="path-table-title">编号：JY-001 &nbsp;&nbsp;救援路径</div>
          <table class="path-table">
            <thead>
              <tr>
                <th>路径顺序</th>
                <th>设备编号</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in pathRows" :key="idx">
                <td>{{ row.order }}</td>
                <td>{{ row.device }}</td>
                <td>
                  <span class="table-op">上移</span>
                  <span class="table-op">下移</span>
                  <span class="table-op">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="device-footer">
          <span>救援指令</span>
          <img
            class="device-photo"
            src="https://img.js.design/assets/img/64e5e2e7b7b6b6b7b7b6b6b7.png"
            alt="rescue" />
        </div> -->
      </div>
    </div>
    <!-- 路径表 -->
    <div class="device-row"></div>
    <!-- 下半部分：侦测点表 + 雷达图 -->
    <div class="bottom-row">
      <div class="detect-table-wrap">
        <div class="detect-table-title">侦测点</div>
        <table class="detect-table">
          <thead>
            <tr>
              <th>选择</th>
              <th>设备编号</th>
              <th>经坐标</th>
              <th>纬坐标</th>
              <th>距离（米）</th>
              <th>方位（度）</th>
              <th>人体温度（℃）</th>
              <th>心跳</th>
              <th>是否已安排救援</th>
              <th>救援设备</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in detectRows" :key="idx">
              <td><input type="checkbox" checked /></td>
              <td>{{ row.device }}</td>
              <td>{{ row.lng }}</td>
              <td>{{ row.lat }}</td>
              <td>{{ row.dist }}</td>
              <td>{{ row.angle }}</td>
              <td>{{ row.temp }}</td>
              <td>{{ row.heart }}</td>
              <td>{{ row.rescue ? "是" : "否" }}</td>
              <td>{{ row.rescueDevice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="radar-wrap">
        <Radar2 :points="points" :gridCount="4" :scanAngle="60" :scanSpeed="0.02" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Radar2 from "@/components/radar/Radar2.vue";
const pathRows = [
  { order: 1, device: "JS-001" },
  { order: 2, device: "JS-002" },
];
const detectRows = [
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
    lat: "2.66666",
    dist: 20,
    angle: 40,
    temp: 37.1,
    heart: 82,
    rescue: true,
    rescueDevice: "JY-002",
  },
  {
    device: "JS-003",
    lng: "1.322222",
    lat: "2.66666",
    dist: 20,
    angle: 40,
    temp: 37.1,
    heart: 82,
    rescue: false,
    rescueDevice: "JY-003",
  },
];
const points = [
  { x: 0, y: 0, color: "#00ffff", radius: 8 },
  { x: 80, y: -60, color: "#00ffff", radius: 6 },
  { x: -100, y: 100, color: "#00ffff", radius: 10 },
];
</script>

<style scoped>
.main-content {
  width: 100vw;
  /* min-height: 100vh; */
  box-sizing: border-box;
  /* padding: 24px 24px 0 24px; */
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.device-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  /* margin-bottom: 16px; */
}
.device-card {
  flex: 1;
  background: rgba(20, 40, 70, 0.7);
  border-radius: 12px;
  border: 1.5px solid #4ecfff44;
  padding: 18px 24px 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* min-width: 420px; */
  /* max-width: 600px; */
}
.device-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #4ecfff;
  margin-bottom: 8px;
}
.device-status {
  color: #00ffcc;
  font-weight: bold;
}
.device-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
}
.device-img {
  width: 120px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  background: #0a1626;
  border: 1px solid #4ecfff22;
}
.device-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.info-row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 4px;
}
.btn-start {
  background: #00ffcc;
  color: #0a1626;
  border: none;
  border-radius: 6px;
  padding: 4px 18px;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
  cursor: pointer;
}
.btn-stop {
  background: #ff4e4e;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 18px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;
}
.btn-arrow {
  background: #1a2a4a;
  color: #4ecfff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 18px;
  margin: 0 4px;
  cursor: pointer;
}
.device-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  color: #b8e0ff;
  font-size: 15px;
}
.device-photo {
  width: 80px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #4ecfff22;
}
.path-table-wrap {
  flex: 1;
  background: rgba(20, 40, 70, 0.7);
  border-radius: 10px;
  border: 1.5px solid #4ecfff44;
  padding: 12px 18px 18px 18px;
  /* margin-bottom: 12px; */
  /* max-width: 700px; */
}
.path-table-title {
  color: #4ecfff;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}
.path-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  color: #b8e0ff;
}
.path-table th,
.path-table td {
  border: 1px solid #4ecfff22;
  padding: 6px 10px;
  text-align: center;
}
.path-table th {
  background: #1a2a4a;
  color: #4ecfff;
}
.table-op {
  color: #4ecfff;
  margin: 0 4px;
  cursor: pointer;
}
.bottom-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  /* margin-top: 18px; */
}
.detect-table-wrap {
  flex: 2;
  background: rgba(20, 40, 70, 0.7);
  border-radius: 10px;
  border: 1.5px solid #4ecfff44;
  padding: 12px 18px 18px 18px;
}
.detect-table-title {
  color: #4ecfff;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}
.detect-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  color: #b8e0ff;
  font-size: 15px;
}
.detect-table th,
.detect-table td {
  border: 1px solid #4ecfff22;
  padding: 6px 10px;
  text-align: center;
}
.detect-table th {
  background: #1a2a4a;
  color: #4ecfff;
}
.radar-wrap {
  flex: 1;
  background: rgba(20, 40, 70, 0.7);
  border-radius: 10px;
  border: 1.5px solid #4ecfff44;
  padding: 18px 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-width: 360px;
  min-height: 360px; */
}
</style>
