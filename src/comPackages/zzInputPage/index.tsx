import React, { Component } from 'react'
import { View,  } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzInput from '@/components/ZzInput/ZzInput'

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

	

	render() {
		let {  } = this.state
		return (
			<View className='zz_innput_page'>
				<View style={{paddingRight:'20px'}}>输入框:</View>
		
			<ZzInput  maxlength={5}/>
			</View>
		)
	}
}
