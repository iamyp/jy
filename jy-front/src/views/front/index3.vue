<template>
  <!-- <div class="main-bg"> -->
  <div class="main-content">
    <div class="left-panel">
      <!-- 视频区 -->
      <div class="video-row">
        <div class="video-card" v-for="(video, idx) in videos" :key="idx">
          <img class="video-img" :src="video.img" alt="video" />
          <div class="video-title">编号：{{ video.device }}</div>
        </div>
      </div>
      <!-- 音频卡片区 -->
      <div class="audio-grid">
        <div class="audio-card" v-for="(audio, idx) in audios" :key="idx">
          <div class="audio-title">编号：{{ audio.device }}</div>
          <svg v-if="audio.active" class="audio-icon" viewBox="0 0 64 64">
            <path fill="#00ff44" d="M16 24v16h12l12 12V12L28 24H16z" />
          </svg>
          <svg v-else class="audio-icon" viewBox="0 0 64 64">
            <path fill="#888" d="M16 24v16h12l12 12V12L28 24H16z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <Radar2 :points="points" :gridCount="4" :size="600" :scanAngle="60" :scanSpeed="0.02" />
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import Radar2 from "@/components/radar/Radar2.vue";
const videos = [
  { device: "JY-001", img: "https://img.js.design/assets/img/64e5e2e7b7b6b6b7b7b6b6b7.png" },
  { device: "JY-002", img: "https://img.js.design/assets/img/64e5e2e7b7b6b6b7b7b6b6b7.png" },
];
const audios = [
  { device: "JY-001", active: true },
  { device: "JY-001", active: true },
  { device: "JY-001", active: false },
  { device: "JY-001", active: true },
  { device: "JY-001", active: true },
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
  min-height: 100vh;
  box-sizing: border-box;
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: row;
  gap: 24px;
}
.left-panel {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.video-row {
  display: flex;
  flex-direction: row;
  gap: 24px;
}
.video-card {
  flex: 1;
  background: rgba(20, 40, 70, 0.7);
  border-radius: 10px;
  border: 1.5px solid #4ecfff44;
  padding: 8px 8px 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  max-width: 400px;
}
.video-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  background: #0a1626;
  border: 1px solid #4ecfff22;
}
.video-title {
  color: #b8e0ff;
  font-size: 15px;
  margin: 6px 0 8px 0;
}
.audio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.audio-card {
  background: rgba(20, 40, 70, 0.7);
  border-radius: 10px;
  border: 1.5px solid #4ecfff44;
  padding: 18px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 180px;
  min-height: 120px;
  justify-content: center;
}
.audio-title {
  color: #4ecfff;
  font-size: 15px;
  margin-bottom: 10px;
}
.audio-icon {
  width: 64px;
  height: 64px;
  margin-top: 8px;
}
.right-panel {
  flex: 1.8;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 600px;
  min-height: 600px;
  background: rgba(20, 40, 70, 0.7);
  border-radius: 16px;
  border: 1.5px solid #4ecfff44;
}
</style>
