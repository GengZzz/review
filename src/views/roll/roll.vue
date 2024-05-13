<template>
  <main ref="scrollElement">
    <a-float-button @click="handleClick" type="primary">
      <template #icon>
        <LogoutOutlined />
      </template>
    </a-float-button>
    <div class="container">
      <section id="img-one" class="img">
        <h1 class="animate__animated animate__swing">TIME</h1>
      </section>
      <section class="content-one">
        <div class="text-box">
          <div class="cnt">
            <h2>THE TIME</h2>
            <p class="animate__animated">
              Time is an illusion. Lunchtime doubly so. Time would heal almost all wounds . If your wounds have not been
              healed up , please wait for a short while. Life isn't about waiting for the storm to pass . it's about
              learning to dance in the rain.
            </p>
            <p class="animate__animated">
              <a href="#" class="btn">TAKE <strong>CARE OF</strong><em>YOURSEFL</em></a>
            </p>
          </div>
        </div>
      </section>
      <section class="content-two">
        <div class="text-box">
          <div class="cnt">
            <h2>LIVING</h2>
            <p class="animate__animated">
              Some of us get dipped in flat, some in satin, some in gloss. But every once in a while you find someone
              who"s iridescent, and when you do, nothing will ever compare. We accept both the good and the bad,
              andwithout uttering a sound, we continue living.
            </p>
            <p class="animate__animated">
              <a href="#" class="btn">BEST <strong>WISHS</strong><em>FOR YOU</em></a>
            </p>
          </div>
        </div>
      </section>
      <section class="content-three">
        <div class="text-box">
          <div class="cnt">
            <h2>HAPPY ENDING</h2>
            <p class="animate__animated">
              Nobody can go back and start a new beginning , but anyone can start today and make a new ending. The
              minute you think of giving up , think of the reason why you held on so long .
            </p>
            <p class="animate__animated">
              <a href="#" class="btn">TAKE <strong>CARE OF</strong><em>YOURSEFL</em></a>
            </p>
          </div>
        </div>
      </section>
      <section id="img-two" class="img">
        <h1 class="animate__animated">THOUGHTS</h1>
      </section>
      <section id="footer">FOOTER</section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { LogoutOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import animateScroll from './data'
import { ref, onMounted } from 'vue'
const router = useRouter()
const handleClick = () => {
  router.push('/')
}
onMounted(() => {
  animateScroll()
})
</script>
<style lang="less" scoped>
@import 'index';
</style>
