<template>
  <!-- <div class="main-bg"> -->
  <div class="main-content">
    <div class="left-panel">
      <!-- 视频区 -->
      <div class="video-row">
        <div class="video-card" v-for="(item, idx) in jyDevices" :key="idx">
          <!-- <img class="video-img" :src="item.video" alt="video" /> -->
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
          <div class="video-title">编号：{{ item.id }}</div>
        </div>
      </div>
      <!-- 音频卡片区 -->
      <div class="audio-grid">
        <div class="audio-card" v-for="(item, idx) in jsDevices" :key="idx" @click="toggleDeviceActive(item.id)">
          <div class="audio-title">编号：{{ item.device }}</div>
          <svg v-if="item.active" class="audio-icon" viewBox="0 0 64 64">
            <path fill="#00ff44" d="M16 24v16h12l12 12V12L28 24H16z" />
          </svg>
          <svg v-else class="audio-icon" viewBox="0 0 64 64">
            <path fill="#888" d="M16 24v16h12l12 12V12L28 24H16z" />
          </svg>
          <div class="device-status">{{ item.active ? '激活' : '未激活' }}</div>
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
import useDevicesStore from "@/store/modules/devices";

const devicesStore = useDevicesStore();
const { jyDevices, jsDevices, points } = storeToRefs(devicesStore);

// 切换设备激活状态
const toggleDeviceActive = (deviceId) => {
  devicesStore.toggleJsDeviceActive(deviceId);
};
</script>

<style scoped>
.main-content {
  width: 100vw;
  /* min-height: 100vh; */
  box-sizing: border-box;
  /* padding: 24px 24px 0 24px; */
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
  cursor: pointer;
  transition: all 0.3s ease;
}

.audio-card:hover {
  border-color: #4ecfff;
  background: rgba(20, 40, 70, 0.9);
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

.device-status {
  color: #b8e0ff;
  font-size: 12px;
  margin-top: 8px;
  font-weight: bold;
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
