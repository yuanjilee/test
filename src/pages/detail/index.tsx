import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { minus } from '../../redux/actions/counter'
import { get, set } from '../globalData'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  dec: () => void
}

type IProps = PageStateProps & PageDispatchProps

interface Detail {
  props: IProps;
}

/**
 * mapStateToProps 函数类型, 
 * 接受最新的 state 作为参数，用于将 state 映射到组件的 props
 * 
 * mapDispatchToProps 函数类型，
 * 接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
 */
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  dec () {
    dispatch(minus(3))
  },
}))
class Detail extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: 'Detail'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  sayHello() {
    // Taro.setStorageSync('hello_key', 'from detailPG')
    const EE = Taro.getApp().emitter
    EE.emit('hello', 'page ddddetail')
  }

  // sayHello() {
  //   Taro.getApp().hello = 'page_detail'
  // }

  // sayHello() {
  //   set('hello', 'page detail')
  // }

  render () {
    return (
      <View className='index'>
        {/* <Button className='dec_btn' onClick={this.sayHello.bind(this)}>sayHello</Button> */}
        <Button className='dec_btn' onClick={this.props.dec}>dec 3</Button>
        <View><Text>{this.props.counter.num}</Text></View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Detail as ComponentClass
