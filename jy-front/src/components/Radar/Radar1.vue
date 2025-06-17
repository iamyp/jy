<template>
  <canvas ref="canvasRef" :width="size" :height="size" style="width: 100%; height: 100%"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

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
});

const canvasRef = ref(null);
let ctx = null;
let animationId = null;
let angle = 0;

function drawRadar() {
  if (!ctx) return;
  const { size, gridCount } = props;
  ctx.clearRect(0, 0, size, size);
  const center = size / 2;
  const radius = center * 0.9;

  // 画雷达圆环
  ctx.save();
  ctx.strokeStyle = "#2EB74E";
  ctx.lineWidth = 2;
  for (let i = 1; i <= gridCount; i++) {
    ctx.beginPath();
    ctx.arc(center, center, (radius / gridCount) * i, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();

  // 画十字线
  ctx.save();
  ctx.strokeStyle = "#2EB74E";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(center, center - radius);
  ctx.lineTo(center, center + radius);
  ctx.moveTo(center - radius, center);
  ctx.lineTo(center + radius, center);
  ctx.stroke();
  ctx.restore();

  // 画点
  props.points.forEach((p) => {
    const px = center + p.x;
    const py = center + p.y;
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, p.radius || 5, 0, 2 * Math.PI);
    ctx.fillStyle = p.color || "green";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.font = "12px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText(`(${p.x},${p.y})`, px + 8, py - 8);
    ctx.restore();
  });
}

function drawScan() {
  if (!ctx) return;
  const { size } = props;
  const center = size / 2;
  const radius = center * 0.9;
  // 画扫描扇形
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(center, center, radius, angle, angle + Math.PI / 6);
  ctx.closePath();
  const grad = ctx.createRadialGradient(center, center, 0, center, center, radius);
  grad.addColorStop(0, "rgba(46,183,78,0.5)");
  grad.addColorStop(1, "rgba(46,183,78,0.05)");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

function animate() {
  drawRadar();
  drawScan();
  angle += 0.02;
  if (angle > Math.PI * 2) angle = 0;
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  animate();
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
});

watch(
  () => [props.points, props.gridCount, props.size],
  async () => {
    await nextTick();
    drawRadar();
    drawScan();
  }
);
</script>

<style scoped>
canvas {
  background: rgba(0, 0, 0, 0.8);
  display: block;
  border-radius: 50%;
}
</style>
