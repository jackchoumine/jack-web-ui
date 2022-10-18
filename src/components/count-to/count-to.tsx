/*
 * @Date        : 2022-10-18 09:18:17
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQijun
 * @LastEditTime: 2022-10-18 13:04:23
 * @Description : 计时器
 */
import {
  Component,
  Host,
  h,
  Prop,
  Method,
  Event,
  Watch,
  EventEmitter,
} from '@stencil/core'

import { CountUp } from 'countup.js'
@Component({
  tag: 'count-to',
  styleUrl: 'count-to.css',
  shadow: true,
})
export class CountTo {
  @Prop({ reflect: true }) endValue: number
  @Prop() duration: number = 1
  @Prop() separator: string = ','
  /**
   * 精度：几位小数
   */
  @Prop() precision: number = 2
  @Prop() decimal: string = '.'

  @Event({ eventName: 'on-end' }) onEnd: EventEmitter<number>

  @Watch('endValue')
  endValueChange(newValue: number) {
    this.countUp.update(newValue)
    setTimeout(() => {
      this.onEnd.emit(newValue)
    }, this.duration * 1000 + 2)
  }
  spanDOM: HTMLElement
  countUp: CountUp

  componentWillLoad() {
    console.log(this.spanDOM) //undefined
    console.log('componentWillLoad')
  }
  componentWillRender() {
    console.log(this.spanDOM) //undefined
    console.log('componentWillRender')
  }
  componentDidRender() {
    console.log(this.spanDOM) // 有值
    console.log('componentDidRender')
    const options = {
      duration: this.duration,
      separator: this.separator,
      decimalPlaces: this.precision,
      decimal: this.decimal,
      enableScrollSpy: true,
    }
    this.countUp = new CountUp(this.spanDOM, this.endValue, options)
    this.countUp.start()
  }
  componentDidLoad() {
    console.log(this.spanDOM) // 有值
    console.log('componentDidLoad')
  }

  @Method()
  async reset() {
    this.countUp.reset()
    return true
  }

  @Method()
  async pauseResume() {
    this.countUp.pauseResume()
    return true
  }
  render() {
    return (
      <Host>
        <slot name="left"></slot>
        <span ref={el => (this.spanDOM = el)}></span>
        <slot name="right"></slot>
      </Host>
    )
  }
}
