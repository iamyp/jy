<template>
  <!-- 顶部导航 -->
  <div class="main-content">
    <!-- 左上角救援舟卡片区域 -->
    <div class="side-info">
      <div class="rescue-boat-row">
        <div class="rescue-boat-card" v-for="boat in jyDevices" :key="boat.id">
          <div class="boat-header">
            <span>编号：{{ boat.id }}</span>
            <span class="boat-title">救援舟</span>
          </div>
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
                  <div class="metric-value">{{ boat.distance }}米</div>
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
                <div class="metric-value">{{ boat.angle }}度</div>
                <div class="metric-label">方位</div>
              </div>
            </div>
          </div>
          <div class="boat-actions">
            <div class="boat-coord">
              <div>E：{{ boat.e }}</div>
              <div>S：{{ boat.s }}</div>
            </div>
            <div class="boat-actions-btn">
              <div class="status-cnt">
                <div>
                  <img src="@/assets/cicons/icon-status.png" style="width: 24px; height: 24px" />
                </div>
                <div style="margin-left: 20px">已启动</div>
              </div>
              <div class="status-cnt-1">
                <div>
                  <img src="@/assets/cicons/icon-camera.png" style="width: 24px; height: 24px" />
                </div>
                <div style="margin-left: 20px">
                  <img src="@/assets/cicons/icon-sound-off.png" style="width: 24px; height: 24px" />
                </div>
                <!-- <button class="boat-btn">启动</button>
                <button class="boat-btn">停止</button> -->
                <!-- <button class="boat-btn">指令</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 其余信息卡片区域 -->
      <div class="info-group" v-for="item in jsDevices" :key="item.id">
        <div class="info-card">
          <div class="info-header">
            <span class="info-title">编号：{{ item.id }}</span>
          </div>
          <div class="info-body">
            <div class="info-coord-group">
              <div class="info-row info-coord">
                <div>E： {{ item.e }}</div>
              </div>
              <div class="info-row info-coord">
                <div>S： {{ item.s }}</div>
              </div>
            </div>
            <div class="info-metrics">
              <div class="metric-box">
                <!-- <div class="metric-icon metric-icon-pos">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <polygon points="16,4 28,28 16,22 4,28" fill="#1defff" />
                  </svg>
                </div> -->
                <div class="metric-icon metric-icon-dist">
                  <img
                    src="@/assets/cicons/icon-direction.png"
                    style="width: 24px; height: 24px"
                    alt="boat-icon" />
                </div>
                <div class="metric-main">
                  <div class="metric-value">{{ item.angle }}度</div>
                  <div class="metric-label">方位</div>
                </div>
              </div>
              <div class="metric-box">
                <!-- <div class="metric-icon metric-icon-dist">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" fill="#1defff" opacity="0.3" />
                    <text x="16" y="21" text-anchor="middle" font-size="14" fill="#1defff">
                      800
                    </text>
                  </svg>
                </div> -->
                <div class="metric-icon metric-icon-dist">
                  <img
                    src="@/assets/cicons/icon-distance.png"
                    style="width: 24px; height: 24px"
                    alt="boat-icon" />
                </div>
                <div class="metric-main">
                  <div class="metric-value">{{ item.distance }}米</div>
                  <div class="metric-label">距离</div>
                </div>
              </div>
            </div>
            <div class="info-row info-health">
              <div>体温 35℃</div>
              <div>心率 120bpm</div>
              <div>血压 120mmHg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧雷达区 -->
    <div class="radar-section">
      <div class="radar-panel">
        <div class="radar-panel-inner">
          <Radar2 :points="points" :gridCount="4" :size="500" :scanAngle="60" :scanSpeed="0.02" />
          <div class="radar-ctrl">
            <button class="ctrl-btn">+</button>
            <div class="radar-range">7000米</div>
            <button class="ctrl-btn">-</button>
          </div>
        </div>
      </div>
      <div class="weather-panel">
        <div class="weather-title">当前气象</div>
        <div class="weather-row"><span>海况等级</span><span>1级</span></div>
        <div class="weather-row"><span>水温</span><span>35℃</span></div>
        <div class="weather-row"><span>浪高</span><span>0.5m</span></div>
        <div class="weather-row"><span>流速</span><span>0.1m/s</span></div>
        <div class="weather-row"><span>流向</span><span>西南偏南</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Radar2 from "@/components/radar/Radar2.vue";
import useDevicesStore from "@/store/modules/devices";

const devicesStore = useDevicesStore();
const { jyDevices, jsDevices, points, isInitialized } = storeToRefs(devicesStore);

// 调试信息
console.log('Index1 页面加载，设备数据状态：', {
  isInitialized: isInitialized.value,
  jyDevicesCount: jyDevices.value.length,
  jsDevicesCount: jsDevices.value.length,
  pointsCount: points.value.length
});
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  /* height: calc(100vh - 60px); */
  background: #0a1626;
  width: 100vw;
}
.side-info {
  /* width: 370px; */
  /* background: rgba(20, 40, 70, 0.7); */
  /* padding: 28px 10px 0 10px; */
  /* border-right: 2px solid #1a2a4a; */
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.rescue-boat-row {
  display: flex;
  gap: 18px;
  /* margin-bottom: 18px; */
}
.rescue-boat-card {
  flex: 1;
  min-width: 220px;
  max-width: 260px;
  padding: 14px 12px 10px 12px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  background: linear-gradient(120deg, #1a2a4a 60%, #23608a 100%);
  border-radius: 12px;
  /* position: relative; */
  border: 1.5px solid #4ecfff44;
}
.boat-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #4ecfff;
  font-size: 15px;
  margin-bottom: 8px;
}
.boat-title {
  color: #1defff;
  font-weight: bold;
}
.boat-metrics {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}
.boat-coord {
  color: #b8e0ff;
  font-size: 13px;
  /* margin-bottom: 8px; */
  display: flex;
  flex-direction: column;
  /* gap: 12px; */
  justify-content: space-around;
  flex-grow: 1;
}
.boat-actions {
  display: flex;
  justify-content: space-around;
  /* gap: 12px; */
}
.boat-actions-btn {
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
  justify-content: space-around;
  flex-grow: 1;
}
.boat-btn {
  background: #1a2a4a;
  color: #4ecfff;
  border: 1px solid #4ecfff;
  border-radius: 6px;
  padding: 2px 10px;
  font-size: 13px;
  cursor: pointer;
}
/* .corner-border {
  position: relative;
  background: linear-gradient(120deg, #1a2a4a 60%, #23608a 100%);
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 12px #0a1626cc;
  padding: 18px 18px 12px 18px;
  overflow: hidden;
}
.corner-border::before,
.corner-border::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border: 2px solid #1defff;
  box-sizing: border-box;
}
.corner-border::before {
  left: 0;
  top: 0;
  border-right: none;
  border-bottom: none;
}
.corner-border::after {
  right: 0;
  bottom: 0;
  border-left: none;
  border-top: none;
} */
.info-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 14px 12px 10px 12px;
  background: linear-gradient(120deg, #1a2a4a 60%, #23608a 100%);
  border-radius: 12px;
  border: 1.5px solid #4ecfff44;
}
.info-body {
  display: flex;
  justify-content: space-between;
}
.info-coord-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-around;
}
.info-group {
  /* margin-bottom: 18px; */
}
.info-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.info-title {
  color: #4ecfff;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1px;
}
.info-metrics {
  display: flex;
  flex-direction: column;
  /* gap: 12px; */
  /* margin-bottom: 10px; */
  justify-content: space-around;
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
.metric-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.metric-value {
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
}
.metric-label {
  color: #b8e0ff;
  font-size: 13px;
  margin-top: 2px;
}
.info-row {
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
  align-items: center;
  color: #b8e0ff;
  font-size: 14px;
  flex-direction: column;
}
.info-coord {
  /* margin-bottom: 2px; */
  padding: 10px;
  border: 1px solid #23ced9;
  border-radius: 6px;
}
.info-health {
  /* margin-top: 8px; */
  /* gap: 24px; */
  color: #1defff;
  font-size: 14px;
  align-items: flex-start;
  border: 1px solid #23ced9;
  border-radius: 6px;
  padding: 10px;
}
.radar-section {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  /* gap: 40px; */
  /* padding: 40px 0 0 0; */
  margin-left: 100px;
}
.radar-panel {
  /* position: relative; */
  /* width: 540px;
  height: 540px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.radar-panel-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.radar-ctrl {
  /* position: absolute; */
  /* right: 10px;
  top: 50%; */
  /* transform: translateY(-50%); */
  margin-left: 20px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ctrl-btn {
  width: 40px;
  height: 40px;
  background: #0a1626;
  color: #4ecfff;
  border: 2px solid #4ecfff;
  border-radius: 50%;
  font-size: 30px;
  cursor: pointer;
  margin-bottom: 8px;
}
.radar-range {
  color: #4ecfff;
  font-size: 20px;
  margin: 10px 0;
}
.weather-panel {
  min-width: 220px;
  background: rgba(20, 40, 70, 0.7);
  border-radius: 10px;
  padding: 18px 20px;
  color: #b8e0ff;
  font-size: 16px;
  /* margin-top: 40px; */
  align-self: flex-start;
  border: 1.5px solid #4ecfff44;
}
.weather-title {
  font-size: 18px;
  color: #4ecfff;
  margin-bottom: 10px;
  font-weight: bold;
}
.weather-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.status-cnt {
  display: flex;
  align-items: center;
  /* gap: 10px; */
  /* border-radius: 5px 5px 5px 5px;
  border: 1px solid #23ced9; */
  /* padding: 4px 10px; */
  font-size: 14px;
  /* justify-content: space-around; */
}
.status-cnt-1 {
  display: flex;
  align-items: center;
  /* gap: 10px; */
  /* justify-content: space-around; */
}

/* .corner-box {
  position: relative;
  width: 300px;
  height: 120px;
  background: #23608a;
}

.corner-box::before,
.corner-box::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #1defff;
}

.corner-box::before {
  left: 0;
  top: 0;
  border-right: none;
  border-bottom: none;
}

.corner-box::after {
  right: 0;
  bottom: 0;
  border-left: none;
  border-top: none;
} */

/* 右上角 */
/* .corner-box .corner-rt {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border-top: 2px solid #1defff;
  border-right: 2px solid #1defff;
} */

/* 左下角 */
/* .corner-box .corner-lb {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  border-left: 2px solid #1defff;
  border-bottom: 2px solid #1defff;
} */
</style>
