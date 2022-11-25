import React, { Component } from 'react'
import { View,  } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzLRNotice from '@/components/ZzLRNotice/ZzLRNotice'

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
			<View className='zz_lr_notice_page'>
				<ZzLRNotice message='容祖儿什么时候开演唱会'/>
		
			
			</View>
		)
	}
}
