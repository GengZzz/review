<template>
  <div class="snake_container">
    <a-button type="dashed" block @click="snakeStatus = snakeStatus === 'start' ? 'pause' : 'start'"
      >{{ snakeStatus === 'start' ? '暂停' : '开始' }}游戏</a-button
    >
    <a-divider
      ><a-tag color="success" style="transform: scale(1.4)">
        <template #icon>
          <AccountBookOutlined />
        </template>
        {{ score }}
      </a-tag></a-divider
    >
    <!-- <section style="width: 100%">
      <a-alert message="Warning" type="warning" show-icon />
    </section> -->
    <canvas id="ctx" :width="config.w" :height="config.h"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { AccountBookOutlined } from '@ant-design/icons-vue'
import { NotificationPlacement, notification } from 'ant-design-vue'
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { ref, Ref, onMounted, computed, watch } from 'vue'
import vertical from './vertical'
// ==================================== 四、API类  ====================================
vertical.setup()

type TX = number
type TY = number
type TWidth = number
type THeight = number

function fillRect(ctx, bgc, range: [TX, TY, TWidth, THeight]) {
  ctx.fillStyle = bgc
  ctx.fillRect(...range)
}

function bindFillRect(ctx) {
  return fillRect.bind(null, ctx)
}

let config = {
  snake: [
    [0, 100],
    [10, 100],
    [20, 100],
    [30, 100],
    [40, 100],
  ],
  headColor: '#ff5732',
  bodyColor: '#3cb056',
  foodColor: '#ff5732',
  time: 15,
  w: 800,
  h: 600,
}

let FR: any

type TDirection = 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown'
type TStatus = 'unStart' | 'start' | 'pause'

// 定义变量
let canvas: any = null
let ctx: any = null
let direction: Ref<TDirection> = ref('ArrowRight')
let score: Ref<number> = ref(0)
let speed = computed(() => {
  if (score.value <= 0) return 1
  if (score.value >= 10) return 10
  return score.value
})
const elSize: number = 10
let snakeStatus: Ref<TStatus> = ref('unStart')
let snakeList: Array<[number, number]> = []
let foodPosition: Ref<Array<number>> = ref([0, 0])
let stopTime = () => {}

const initCtx = () => {
  if (!ctx) {
    canvas = document.getElementById('ctx')
    ctx = canvas?.getContext('2d')
  }
  FR = bindFillRect(ctx)
  FR('#eee', [0, 0, config.w, config.h])
}

const authorityMap = new Map([
  ['ArrowRight', ['ArrowUp', 'ArrowDown']],
  ['ArrowLeft', ['ArrowUp', 'ArrowDown']],
  ['ArrowUp', ['ArrowLeft', 'ArrowRight']],
  ['ArrowDown', ['ArrowLeft', 'ArrowRight']],
])

document.addEventListener('keydown', (e) => {
  e.preventDefault()
  const targetDir = e.code as TDirection
  dealDir(targetDir)
})

function dealDir(targetDir) {
  if (
    ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(targetDir) &&
    snakeStatus.value === 'start' &&
    authorityMap.get(direction.value)?.includes(targetDir)
  ) {
    direction.value = targetDir
  }
}

// 方法
// 渲染食物
function renderFood() {
  FR(config.foodColor, [...foodPosition.value, elSize, elSize])
}

// 渲染蛇
function renderSnake() {
  snakeList.forEach((item, index) => {
    FR(index === snakeList.length - 1 ? config.headColor : config.bodyColor, [...item, elSize, elSize])
  })
}

// 计算食物
function foodComp() {
  foodPosition.value[0] = (((Math.random() * (config.w - 9)) / 10) | 0) * 10
  foodPosition.value[1] = (((Math.random() * (config.h - 9)) / 10) | 0) * 10
}

// 计算蛇行进
function snakeRun() {
  if (snakeStatus.value !== 'start') return
  const dir = direction.value
  const currentLocation = snakeList[snakeList.length - 1]
  const nextLocation: [number, number] = [currentLocation[0], currentLocation[1]]
  if (dir === 'ArrowRight' || dir === 'ArrowLeft') {
    nextLocation[0] = nextLocation[0] + 10 * (dir === 'ArrowRight' ? 1 : -1)
  } else {
    nextLocation[1] = nextLocation[1] + 10 * (dir === 'ArrowDown' ? 1 : -1)
  }
  if (nextLocation[0] < 0) nextLocation[0] = config.w - 10
  if (nextLocation[1] < 0) nextLocation[1] = config.h - 10
  if (nextLocation[0] > config.w - 10) nextLocation[0] = 0
  if (nextLocation[1] > config.h - 10) nextLocation[1] = 0
  snakeList.push(nextLocation)
  if (!eatFood(nextLocation)) {
    const traceLocation: any = snakeList.shift()
    FR('#eee', [traceLocation[0], traceLocation[1], elSize, elSize])
  }
}

// 检验吃
function eatFood(headLocation) {
  if (headLocation[0] === foodPosition.value[0] && headLocation[1] === foodPosition.value[1]) {
    score.value++
    restTime.value += speed.value <= 5 ? 10 - speed.value : 5
    stopTime()
    stopTime = runTime() // 加速
    foodComp()
    return true
  }
  return false
}

// 进行
function runTime() {
  const timeId = setInterval(
    () => {
      if (snakeStatus.value === 'start') {
        // initCtx();
        snakeRun()
        renderFood()
        renderSnake()
      }
    },
    110 - speed.value * 10,
  )
  return () => {
    clearInterval(timeId)
  }
}

// 剩余时间
let restTime = ref(10)
let stopReduceTime = () => {}

function reduceTime() {
  const timeId = setInterval(() => {
    restTime.value--
  }, 1000)
  return () => {
    clearInterval(timeId)
  }
}

watch(
  () => restTime.value,
  (newRestTime) => {
    if (newRestTime <= 0) {
      snakeStatus.value = 'unStart'
      alert('游戏结束,你的得分是' + score.value)
      ctx.clearRect(0, 0, config.w, config.h)
      initCtx()
    }
  },
)

watch(
  () => snakeStatus.value,
  (newStatus) => {
    switch (newStatus) {
      case 'start':
        stopReduceTime = reduceTime()
        break
      case 'unStart':
        stopReduceTime()
        resetGame()
        break
      case 'pause':
        stopReduceTime()
        break
    }
  },
)

// 重置游戏
function resetGame() {
  snakeList = JSON.parse(JSON.stringify(config.snake))
  restTime.value = config.time
  foodComp()
  score.value = 0
  direction.value = 'ArrowRight'
  stopTime()
  stopTime = runTime()
}

onMounted(() => {
  initCtx()
  resetGame()
})
</script>
<style scoped lang="less">
@import 'index';
</style>
