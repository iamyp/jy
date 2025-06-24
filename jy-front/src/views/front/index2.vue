<template>
  <div class="main-content">
    <!-- 上半部分：两组设备卡片 -->
    <div class="device-row">
      <div class="device-card" v-for="item in jyDevices" :key="item.id">
        <!-- <div class="device-header">
          <span>编号：JY-001</span>
          <span class="device-status">已启动</span>
        </div> -->
        <div class="device-body">
          <div class="device-info-left-wrap">
            <div class="device-info">
              <img class="device-img" src="@/assets/cicons/icon-boat.png" alt="boat" />
              <div class="info-row">
                <button class="btn-start">启动</button>
                <button class="btn-stop">停止</button>
              </div>
            </div>
            <div class="device-info device-info-left">
              <div class="info-row status-wrap">已启动</div>
              <div class="info-row">
                <span>E：{{ item.e }}</span>
              </div>
              <div class="info-row">
                <span>S：{{ item.s }}</span>
              </div>
            </div>
          </div>
          <div class="device-info device-info-right">
            <video
              class="device-video"
              controls
              autoplay
              muted
              style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px">
              <source
                :src="item.video"
                type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>
        <div class="path-table-wrap">
          <div class="path-table-title">编号：{{ item.id }} &nbsp;&nbsp;救援路径</div>
          <div class="table-wrap">
            <div class="boat-metrics">
              <div class="metric-box">
                <div class="metric-icon metric-icon-dist">
                  <!-- <svg width="24" height="24" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="12" fill="#1defff" opacity="0.3" />
                  <text x="16" y="21" text-anchor="middle" font-size="12" fill="#1defff">
                    {{ boat.distance }}
                  </text>
                </svg> -->
                  <img
                    src="@/assets/cicons/icon-distance.png"
                    style="width: 24px; height: 24px"
                    alt="boat-icon" />
                </div>
                <div>
                  <div>
                    <div class="metric-value">{{ item.distance }}米</div>
                  </div>
                  <div class="metric-label">距离</div>
                </div>
              </div>
              <div class="metric-box">
                <!-- <div class="metric-icon metric-icon-pos">
                <svg width="24" height="24" viewBox="0 0 32 32">
                  <polygon points="16,4 28,28 16,22 4,28" fill="#1defff" />
                </svg>
              </div> -->
                <div class="metric-icon metric-icon-dist">
                  <img
                    src="@/assets/cicons/icon-direction.png"
                    style="width: 24px; height: 24px"
                    alt="boat-icon" />
                </div>
                <div>
                  <div class="metric-value">{{ item.angle }}度</div>
                  <div class="metric-label">方位</div>
                </div>
              </div>
            </div>
            <table class="path-table">
              <thead>
                <tr>
                  <th>路径顺序</th>
                  <th>设备编号</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item1, idx) in item.pathRows" :key="idx">
                  <td>{{ item1.order }}</td>
                  <td>{{ item1.device }}</td>
                  <td>
                    <span class="table-op">上移</span>
                    <span class="table-op">下移</span>
                    <span class="table-op" @click="removePathRow(item.id, item1.device)">删除</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
import useDevicesStore from "@/store/modules/devices";

const devicesStore = useDevicesStore();
const { jyDevices, detectRows, pathRows, points } = storeToRefs(devicesStore);
function removePathRow(jyDeviceId, jsDeviceId) {
  console.log(jyDeviceId, jsDeviceId);
  devicesStore.removePathRow(jyDeviceId, jsDeviceId);
}
</script>

<style scoped>
.main-content {
  width: 100vw;
  /* min-height: 100vh; */
  box-sizing: border-box;
  /* padding: 24px 24px 0 24px; */
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  padding: 12px 12px;
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
  width: 180px;
  /* height: 60px; */
  object-fit: contain;
  border-radius: 8px;
  background: #0a1626;
}
.device-info {
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: space-around;
  align-items: center;
}
.device-info-left-wrap {
  display: flex;
  flex-direction: row;
  gap: 18px;
  border: 1.5px solid #4ecfff44;
  border-radius: 10px;
  height: 100%;
  padding: 12px;
}
.device-info-left {
  /* flex: 3.8; */
}
.device-info-right {
  flex: 2;
}
.info-row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 4px;
}
.info-row span {
  padding: 10px;
  border: 1px solid #23ced9;
  border-radius: 6px;
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
  /* font-size: 16px; */
  margin-bottom: 8px;
  font-weight: bold;
}
.path-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  color: #b8e0ff;
  flex: 1;
  margin-left: 20px;
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
  /* font-size: 16px; */
  margin-bottom: 8px;
  font-weight: bold;
}
.detect-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  color: #b8e0ff;
  /* font-size: 15px; */
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
.status-wrap {
  color: #00ffcc;
  font-size: 16px;
  font-weight: bold;
}
.table-wrap {
  display: flex;
}

.boat-metrics {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  flex-direction: column;
}
.metric-box {
  display: flex;
  align-items: center;
  background: rgba(10, 22, 38, 0.7);
  border-radius: 8px;
  padding: 6px 18px 6px 6px;
  /* flex: 1; */
  /* min-width: 120px; */
  /* position: relative; */
}
.metric-icon {
  /* width: 40px;
  height: 40px; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(29, 239, 255, 0.08);
  border-radius: 8px;
  margin-right: 10px;
}
</style>
