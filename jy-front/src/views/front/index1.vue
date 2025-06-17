<template>
  <!-- 顶部导航 -->
  <!-- <div class="main-content"> -->
  <!-- 左侧信息区 -->
  <aside class="side-info">
    <div class="info-group">
      <div class="info-title">编号：JY-001</div>
      <div class="info-cards">
        <div class="info-card" v-for="i in 3" :key="i">
          <div class="info-row"><span>E：</span><span>1.222222</span></div>
          <div class="info-row"><span>S：</span><span>1.222222</span></div>
          <div class="info-row">
            <span>800米</span>
            <span>40.2℃</span>
          </div>
          <div class="info-row">
            <span>体温hahaha 35℃</span>
            <span>心率 120bpm</span>
            <span>血压 120mmHg</span>
          </div>
          <div class="info-row">
            <span class="info-btn"></span>
            <span class="info-btn"></span>
            <span class="info-btn"></span>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <!-- 右侧雷达区 -->
  <section class="radar-section">
    <div class="radar-panel">
      <Radar2 :points="points" :gridCount="4" :size="500" :scanAngle="60" :scanSpeed="0.02" />
      <div class="radar-ctrl">
        <button class="ctrl-btn">+</button>
        <div class="radar-range">7000米</div>
        <button class="ctrl-btn">-</button>
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
  </section>
  <!-- </div> -->
</template>

<script setup>
import Radar2 from "@/components/radar/Radar1.vue";
const points = [
  { x: 0, y: 0, color: "#00ffff", radius: 8 },
  { x: 80, y: -60, color: "#00ffff", radius: 6 },
  { x: -100, y: 100, color: "#00ffff", radius: 10 },
];
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
}
.side-info {
  width: 350px;
  background: rgba(20, 40, 70, 0.7);
  padding: 20px 10px;
  border-right: 2px solid #1a2a4a;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.info-group {
  margin-bottom: 20px;
}
.info-title {
  font-size: 20px;
  color: #4ecfff;
  margin-bottom: 10px;
}
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.info-card {
  background: rgba(10, 22, 38, 0.8);
  border: 1px solid #4ecfff44;
  border-radius: 8px;
  padding: 12px 10px;
  margin-bottom: 8px;
}
.info-row {
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
  align-items: center;
}
.info-btn {
  width: 24px;
  height: 24px;
  background: #1a2a4a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}
.radar-section {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  padding: 40px 0 0 0;
}
.radar-panel {
  position: relative;
  width: 540px;
  height: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.radar-ctrl {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
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
  font-size: 24px;
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
  margin-top: 40px;
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
</style>
