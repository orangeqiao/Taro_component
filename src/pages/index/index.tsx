import React,{ Component } from 'react'
import { View, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
	handleJump=()=>{
		Taro.navigateTo({
			url: '/comPackages/showComPage/index',
		
		})
	}

  render () {
    return (
      <View className='index'>
       <Button onClick={this.handleJump}>组件</Button>
			
      </View>
    )
  }
}
