import { createVNode, render } from 'vue'
import Settings from './Settings.vue'

let mountNode = null
export default (options) => {

  //确保只存在一个弹框，如果前一个弹窗还在，就移除
  if (mountNode) {
    document.body.removeChild(mountNode)
    mountNode = null
  }
  //将options参数传入，并将Settings组件转换成虚拟DOM，并赋值给app
  const app = createVNode(Settings, {
    data: options
  })

  mountNode = document.createElement('div')
  //render函数的作用就是将Settings组件的虚拟DOM转换成真实DOM并插入到mountNode元素里
  render(app, mountNode)
  //然后把转换成真实DOM的Settings组件插入到body里
  document.body.appendChild(mountNode)
};