/// <reference types="vite/client" />
// 解决引入爆红问题
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-router'
// declare module 'vue'
