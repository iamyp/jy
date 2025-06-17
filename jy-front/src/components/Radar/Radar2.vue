<template>
  <div class="radar-container" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- 雷达圆环 -->
      <circle
        v-for="i in gridCount"
        :key="i"
        :cx="center"
        :cy="center"
        :r="(radius / gridCount) * i"
        stroke="#2EB74E"
        stroke-width="2"
        fill="none" />
      <!-- 十字线 -->
      <line
        :x1="center"
        :y1="center - radius"
        :x2="center"
        :y2="center + radius"
        stroke="#2EB74E"
        stroke-width="1" />
      <line
        :x1="center - radius"
        :y1="center"
        :x2="center + radius"
        :y2="center"
        stroke="#2EB74E"
        stroke-width="1" />
      <!-- 扫描扇形 -->
      <path :d="scanPath" fill="url(#scanGradient)" :style="{ transition: 'd 0.1s linear' }" />
      <defs>
        <radialGradient :id="'scanGradient'" :cx="center / size" :cy="center / size" r="1">
          <stop offset="0%" stop-color="rgba(46,183,78,0.5)" />
          <stop offset="100%" stop-color="rgba(46,183,78,0.05)" />
        </radialGradient>
      </defs>
      <!-- 点和坐标 -->
      <g v-for="(p, idx) in points" :key="idx">
        <circle
          :cx="center + p.x"
          :cy="center + p.y"
          :r="p.radius || 5"
          :fill="p.color || 'green'"
          stroke="#fff" />
        <text :x="center + p.x + 8" :y="center + p.y - 8" font-size="12" fill="#333">
          ({{ p.x }},{{ p.y }})
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

const props = defineProps({
  points: {
    type: Array,
    default: () => [],
  },
  gridCount: {
    type: Number,
    default: 5,
  },
  size: {
    type: Number,
    default: 400,
  },
  scanAngle: {
    type: Number,
    default: 60, // 扫描扇形角度，单位度
  },
  scanSpeed: {
    type: Number,
    default: 0.02, // 每帧弧度
  },
});

const center = computed(() => props.size / 2);
const radius = computed(() => center.value * 0.9);
const scanRadian = computed(() => (props.scanAngle * Math.PI) / 180);
const scanStart = ref(0);
let animationId = null;

const scanPath = computed(() => {
  // 计算SVG扇形路径
  const c = center.value;
  const r = radius.value;
  const start = scanStart.value;
  const end = start + scanRadian.value;
  const x1 = c + r * Math.cos(start);
  const y1 = c + r * Math.sin(start);
  const x2 = c + r * Math.cos(end);
  const y2 = c + r * Math.sin(end);
  const largeArc = scanRadian.value > Math.PI ? 1 : 0;
  return `M${c},${c} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
});

function animate() {
  scanStart.value += props.scanSpeed;
  if (scanStart.value > Math.PI * 2) scanStart.value = 0;
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  animate();
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
});

watch(
  () => [props.points, props.gridCount, props.size],
  async () => {
    await nextTick();
  }
);
</script>

<style scoped>
.radar-container {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
svg {
  display: block;
}
</style>
