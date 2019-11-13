import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../redux/actions/counter'
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
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
}))
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    // const EE = Taro.getApp().emitter
    // EE.on('hello', (hello)=> {
    //   console.log('on ', hello)
    //   this.setState({
    //     hello: `hello ${hello}`
    //   })
    // })
  }

  // componentWillUnmount () { 
  //   const EE = Taro.getApp().emitter
  //   EE.removeAllListeners()
  // }

  // componentDidShow () { 
  //   const hello = Taro.getStorageSync('hello_key')
  //   this.setState({
  //     hello: `hello ${hello}`
  //   })
  //   Taro.clearStorageSync()
  // }

  // componentDidShow () { 
  //   const hello = Taro.getApp().hello

  //   this.setState({
  //     hello: `hello ${hello}`
  //   })
  // }

  // componentDidShow () { 
  //   const hello = get('hello') || 'current page'

  //   this.setState({
  //     hello: `hello ${hello}`
  //   })
  // }

  state: {
    hello: string
  } = {
    hello: 'orignal'
  }

  componentDidHide () { }

  push() {
    Taro.navigateTo({
      url: '/pages/detail/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='push' onClick={this.push}> Push </Button>
        {/* <View><Text>{this.state.hello}</Text></View> */}
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

export default Index as ComponentClass<PageOwnProps, PageState>
