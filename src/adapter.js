import Vue from 'vue'
import { debounce } from '@/utils'

export const adaptation = () => {
  //分辨率适配函数
  //body设置了最小宽高度1280px

  const fn = () => {
    let fontSize = 16 //初始化字体
    // document.getElementsByTagName('body')[0].style.setProperty('--baseFontSize', '16px');
    // if (document.body.clientWidth >= 960 && document.body.clientWidth < 1280) {
    //   fontSize = 12
    //   document.getElementsByTagName('body')[0].style.setProperty('--baseFontSize', '12px');
    // } else if (document.body.clientWidth >= 1280 && document.body.clientWidth < 1500) {
    //   fontSize = 13
    //   document.getElementsByTagName('body')[0].style.setProperty('--baseFontSize', '13px');
    // } else if (document.body.clientWidth >= 1500 && document.body.clientWidth < 1800) {
    //   fontSize = 14
    //   document.getElementsByTagName('body')[0].style.setProperty('--baseFontSize', '14px');
    // } else if (document.body.clientWidth >= 1800) { 
    //   //设置为默认 15px
    //   fontSize = 15
    //   document.getElementsByTagName('body')[0].style.removeProperty('--baseFontSize');
    //  } else {
    //   this.$message.warn('请调整分辨率至合适的尺寸，如1920 x 1080')
    // }



    // 相对于1920像素的缩放比
    let scale = document.documentElement.clientWidth / 1920
    // 根据屏幕变化 1rem 对应的 font-size
    scale = scale > 1 ? 1 : scale;
    const realFont = fontSize * scale
    sessionStorage.setItem('fontSizeStorage', realFont)
    sessionStorage.setItem('fontSizeScale', scale)
    Vue.prototype.fontSizeScale = scale  //全局存起来
    document.documentElement.style.fontSize = realFont + 'px'
  }

  fn()
  window.addEventListener('resize', debounce(() => {
    fn()
  },200));
}