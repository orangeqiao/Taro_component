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
		console.log(event.target.dataset.type)
		let type=event.target.dataset.type
		let url=''
		switch (type){
			case 'arrow':
				url='/comPackages/zzArrrowPage/index'
				break
				case 'input':
				url='/comPackages/zzInputPage/index'
				break


		}
		Taro.navigateTo({
			url,
		
		})
	}

  render () {
    return (
      <View className='index'>
       <Button data-type='arrow' onClick={this.handleJump}>arrow组件</Button>
			 <Button data-type='input' onClick={this.handleJump}>input组件</Button>
			
      </View>
    )
  }
}
