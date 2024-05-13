<script setup lang="ts">
import { type MenuProps } from 'ant-design-vue'
import { h, ref } from 'vue'
import { WindowsOutlined, RedditOutlined } from '@ant-design/icons-vue'
import { RouterView } from 'vue-router'
const current = ref<string[]>(['snake'])
const items = ref<MenuProps['items']>([
  {
    key: 'snake',
    icon: () => h(WindowsOutlined),
    label: '贪吃蛇',
    title: '贪吃蛇',
  },
  {
    key: 'transform',
    icon: () => h(RedditOutlined),
    label: '动画',
    title: '动画',
    children: [
      {
        label: 'Item 1',
        key: 'setting:3',
      },
      {
        label: 'Item 2',
        key: 'setting:4',
      },
    ],
  },
])
const push = ({ key }: { key: string }) => {
  current.value = [key]
  console.log(key)
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
  padding: 12px 25vw;
  display: flex;
  flex-direction: column;
  height: 100%;
  nav {
    padding-bottom: 24px;
  }
  section {
    flex: 1;
    overflow: hidden;
  }
}
</style>
