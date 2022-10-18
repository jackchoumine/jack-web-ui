/*
 * @Description :
 * @Date        : 2021-11-21 02:31:00 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-18 22:46:24 +0800
 * @LastEditors : JackChou
 */

import {
  Component,
  h,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter,
  Method,
  VNode,
} from '@stencil/core'
export type Person = { name: string; age?: number }
export type RenderH1 = (h: any, person: Person) => VNode
export type MethodFromParent = (value: number, person: Person, maxValue: number) => number
@Component({
  tag: 'my-rating',
  styleUrl: 'my-rating.css',
  shadow: true,
})
export class MyRating {
  constructor() {
    console.log('this.value')
    console.log(this.value)
    console.log(typeof this.value)
    console.log('this.maxValue')
    console.log(this.maxValue)
    console.log('this.isShow')
    console.log(this.isShow)
    console.log(typeof this.isShow)
    console.log('this.person')
    console.log(this.person)
    console.log(typeof this.person)
  }
  @Prop({ mutable: true }) value: number = 0
  @Prop({ mutable: true }) maxValue: number = 5
  @Prop({ reflect: true, attribute: 'show' }) isShow: boolean = false
  @Prop() person: object = {}
  @Prop({ mutable: true }) personArray: Person[] = [{ name: 'John' }]
  @Prop() renderH1: RenderH1
  @Prop() methodFromParent: MethodFromParent

  @Event()
  ratingChange: EventEmitter
  // FIXME 不支持这种写法
  // @Event()
  // 'rating-change': EventEmitter;
  @Method()
  async setPerson(params: any) {
    this.person = params
    // this.maxValue = params.maxValue;
    // this.createStarList();
    return true
  }
  @Method()
  async setPersonArray(persons: []) {
    this.personArray = persons
    return true
  }
  @Method()
  async getValue(params: any) {
    console.log(params)
    this.maxValue = params.maxValue
    this.createStarList()
    return this.value
  }

  @State()
  starList: object[] = []

  @Watch('value')
  watchValue(value: number, oldValue: number) {
    console.log(value, oldValue)
    this.createStarList()
    this.ratingChange.emit({ value })
  }

  componentWillLoad() {
    this.createStarList()
  }
  componentWillRender() {
    console.log('componentWillRender')
    console.log(this.value)
  }

  setValue(newValue) {
    this.value = newValue
    this.isShow = true
    this.createStarList()
  }

  createStarList(numberOfStars: number = this.value) {
    let starList = []

    for (let i = 1; i <= this.maxValue; i++) {
      if (i <= numberOfStars) {
        starList.push(
          <span
            class="rating"
            onMouseOver={() => this.createStarList(i)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i)}
          >
            &#x2605;
          </span>,
        )
      } else {
        starList.push(
          <span
            class="rating"
            onMouseOver={() => this.createStarList(i)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i)}
          >
            &#x2606;
          </span>,
        )
      }
    }
    this.starList = starList
  }

  onClick() {
    this.value =
      this.methodFromParent &&
      this.methodFromParent(this.value, this.personArray[0], this.maxValue)
  }

  render() {
    const span = this.isShow ? <span>isShow:{this.isShow.toString()}</span> : null
    return (
      <div>
        {this.renderH1 && this.renderH1(h, this.personArray[0])}
        {this.starList}
        <hr />
        {span}
        <p>person:{JSON.stringify(this.person)}</p>
        <p>personArray:{JSON.stringify(this.personArray)}</p>
        <button onClick={() => this.onClick()}>hello 调用标签传入的方法</button>
      </div>
    )
  }
}
