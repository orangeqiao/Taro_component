import React, { Component } from 'react'
import { View,  } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzCodeInput from '@/components/ZzCodeInput/ZzCodeInput'

interface IPageOwnProps {
}
interface IPageState {

}
export default class Index extends Component<IPageOwnProps, IPageState>  {
	constructor(props: IPageOwnProps) {
		super(props)
		this.state = {


		}
	}

	componentWillMount() { }

	componentDidMount() { }

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }
	handleInput=(event,value)=>{
		console.log(value)
	

	}

	

	render() {
		let {  } = this.state
		return (
			<View className='zz_lr_notice_page'>
				<ZzCodeInput showType='number' onInput={this.handleInput}/>
			</View>
		)
	}
}
