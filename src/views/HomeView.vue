<script setup lang="ts">
import { type MenuProps } from 'ant-design-vue'
import { h, ref } from 'vue'
import { WindowsOutlined, RedditOutlined, InstagramOutlined } from '@ant-design/icons-vue'
import { RouterView, useRouter } from 'vue-router'
const current = ref<string[]>(['snake'])
const items = ref<MenuProps['items']>([
  {
    key: 'snake',
    icon: () => h(WindowsOutlined),
    label: '贪吃蛇',
    title: 'snake',
  },
  {
    key: 'transform',
    icon: () => h(RedditOutlined),
    label: '动画',
    title: 'animate',
    children: [
      {
        label: '魔术小球',
        key: 'globlue',
      },
      {
        label: '弹跳小球',
        key: 'bounce',
      },
      {
        label: '时钟',
        key: 'click',
      },
    ],
  },
  {
    key: 'roll',
    icon: () => h(InstagramOutlined),
    label: '滚动翻转',
    title: 'roll',
  },
])
const router = useRouter()
const push = ({ key }: { key: string }) => {
  current.value = [key]
  router.push({ name: key })
}
</script>

<template>
  <main>
    <nav>
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="push" />
    </nav>
    <section>
      <RouterView />
    </section>
  </main>
</template>
<style lang="less" scoped>
main {
  // padding: 12px 25vw;
  display: flex;
  flex-direction: column;
  height: 100%;
  nav {
    padding-bottom: 24px;
    padding: 12px 25vw;
  }
  section {
    flex: 1;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
