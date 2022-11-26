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
	handleJump=(event)=>{
		console.log(event)
		const isWeapp = process.env.TARO_ENV === 'weapp'
		let type=isWeapp? event.target.dataset.type: event.target['data-type']
		let url=`/comPackages/zz${type}Page/index`
		Taro.navigateTo({
			url,
		
		})
	}

  render () {
    return (
      <View className='index'>
       <Button data-type='Arrow' onClick={this.handleJump}>Arrow组件</Button>
			 <Button data-type='Input' onClick={this.handleJump}>Input组件</Button>
			 <Button data-type='Popup' onClick={this.handleJump}>Popup组件</Button>
			 <Button data-type='Dialog' onClick={this.handleJump}>Dialog组件</Button>
			 <Button data-type='LRNotice' onClick={this.handleJump}>LRNotice组件</Button>
			 <Button data-type='CodeInput' onClick={this.handleJump}>CodeInput组件</Button>
      </View>
    )
  }
}
