<template>
  <div class="main-bg">
    <!-- 顶部导航 -->
    <header class="header-bar">
      <nav class="header-left">
        <span class="nav-item" :class="{ active: currentPath === 1 }" @click="handleTabClick(1)">
          首页
        </span>
        <span class="nav-item" :class="{ active: currentPath === 2 }" @click="handleTabClick(2)">
          水域救援
        </span>
        <span class="nav-item" :class="{ active: currentPath === 3 }" @click="handleTabClick(3)">
          音视频联机
        </span>
      </nav>
      <div class="header-title">水域应急救援系统</div>
      <div class="header-title"></div>
      <div class="header-right">
        <img src="@/assets/cicons/icon-time.png" class="header-icon" />
        <span class="header-info">{{ currentTime }}</span>
        <img src="@/assets/cicons/icon-calendar.png" class="header-icon" />
        <span class="header-info">{{ currentDate }}</span>
        <img src="@/assets/cicons/icon-temperature.png" class="header-icon" />
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
import useDevicesStore from "@/store/modules/devices";

const currentPath = ref(null);
const devicesStore = useDevicesStore();
// const currentTime = ref(new Date().toLocaleTimeString());
const currentDate = ref("");
const currentTime = ref("");

// 实时更新时间
const updateTime = () => {
  const now = new Date();
  currentDate.value = now
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
  currentTime.value = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // currentDate.value = new Date()
  //   .toLocaleDateString("zh-CN", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   })
  //   .replace(/\//g, "-");
};

// 启动定时器，每秒更新时间
let timeInterval;

const handleTabClick = (index) => {
  currentPath.value = index;
  router.push("/front/index" + index);
};

// 初始化数据方法
const initData = () => {
  if (devicesStore.isInitialized) return;
  const jyDevices = [
    {
      id: "JY-001",
      distance: 800,
      angle: 40.2,
      e: "1.322222",
      s: "1.222222",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      pathRows: [{ device: "JS-001" }, { device: "JS-002" }],
    },
    {
      id: "JY-002",
      distance: 800,
      angle: 40.2,
      e: "2.222222",
      s: "3.333333",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      pathRows: [{ device: "JS-003" }],
    },
  ];
  const jsDevices = [
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
      soundActive: true,
      rescueStatus: true,
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
      soundActive: true,
      rescueStatus: true,
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
      soundActive: false,
      rescueStatus: true,
    },
  ];
  // 设置救援舟设备数据
  devicesStore.setJyDevices(jyDevices);

  // 设置救生设备数据
  devicesStore.setJsDevices(jsDevices);

  // 设置侦测点数据
  devicesStore.setDetectRows(jsDevices);

  // 设置路径表数据
  // devicesStore.setPathRows([
  //   { order: 1, device: "JS-001" },
  //   { order: 2, device: "JS-002" },
  // ]);

  // 设置雷达点数据
  devicesStore.setPoints([
    { x: 0, y: 0, color: "#00ffff", radius: 8 },
    { x: 80, y: -60, color: "#00ffff", radius: 6 },
    { x: -100, y: 100, color: "#00ffff", radius: 10 },
  ]);

  // 标记为已初始化
  devicesStore.markAsInitialized();
};

onMounted(() => {
  updateTime();
  // 启动时间更新定时器
  timeInterval = setInterval(updateTime, 1000);
  // 设置默认路由
  currentPath.value = 1;
  router.push("/front/index" + currentPath.value);
  // 初始化数据
  initData();
});
// 组件卸载时清理定时器
onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
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
  /* height: calc(100vh - 60px); */
  min-height: calc(100vh - 60px);
  padding: 24px;
  width: 100vw;
  box-sizing: border-box;
  overflow: auto;
  font-size: 14px;
  flex-grow: 1;
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
