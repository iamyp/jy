<template>
  <div class="main-bg">
    <!-- 顶部导航 -->
    <header class="header-bar">
      <div class="header-left">
        <span class="nav-item" :class="{ active: currentPath === 1 }" @click="handleTabClick(1)">
          首页
        </span>
        <span class="nav-item" :class="{ active: currentPath === 2 }" @click="handleTabClick(2)">
          水域救援
        </span>
        <span class="nav-item" :class="{ active: currentPath === 3 }" @click="handleTabClick(3)">
          音视频联机
        </span>
      </div>
      <div class="header-title">水域应急救援系统</div>
      <div class="header-right">
        <img src="@/assets/cicons/icon-time.png"  class="header-icon"/>
        <span class="header-info">22:18:46</span>
        <img src="@/assets/cicons/icon-calendar.png"  class="header-icon"/>
        <span class="header-info">2022.01.10</span>
        <img src="@/assets/cicons/icon-temperature.png"  class="header-icon"/>
        <span class="header-info">12~14℃</span>
      </div>
    </header>
    <div class="main-component-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
const currentPath = ref(null);
const handleTabClick = (index) => {
  currentPath.value = index;
  router.push("/front/index" + index);
};
onMounted(() => {
  currentPath.value = 1;
  router.push("/front/index" + currentPath.value);
});
</script>

<style scoped>
html,
body,
#app,
/* .main-bg {
  width: 100vw;
  height: 100vh;
  min-height: 100vh; 
  min-width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
} */
.main-bg {
  /* width: 100vw; */
  /* height: 100vh; */
  /* min-height: 100vh; */
  background: #0a1626;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  color: #b8e0ff;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #0a1626 80%, #1a2a4a 100%);
  padding: 0 2vw;
  height: 60px;
  border-bottom: 2px solid #1a2a4a;
  box-sizing: border-box;
}
.header-left {
  display: flex;
  gap: 2vw;
}
.nav-item {
  padding: 0 10px;
  cursor: pointer;
  color: #4ecfff;
  opacity: 0.7;
}
.nav-item.active {
  color: #4ecfff;
  font-weight: bold;
  opacity: 1;
  border-bottom: 2px solid #4ecfff;
}
.header-title {
  font-size: 28px;
  color: #4ecfff;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 8px #4ecfff88;
}
.header-right {
  display: flex;
  align-items: center;
  /* gap: 10px; */
  font-size: 18px;
}
.header-icon {
  width: 24px;
  height: 24px;
  /* margin-left: 20px; */
}
.header-info {
  margin-left: 4px;
  margin-right: 25px;
}
.main-component-content {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
  /* min-height: calc(100vh - 60px); */
  padding: 24px;
  width: 100vw;
  box-sizing: border-box;
  overflow: auto;
}
.side-info {
  /* width: 350px; */
  /* background: rgba(20, 40, 70, 0.7); */
  padding: 20px 10px;
  border-right: 2px solid #1a2a4a;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  box-sizing: border-box;
}
.info-group {
  margin-bottom: 20px;
}
.info-title {
  /* font-size: 20px; */
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
  height: 100%;
  box-sizing: border-box;
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
