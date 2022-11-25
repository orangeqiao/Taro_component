import React, { Component } from 'react'
import { View,  } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzDialog from '@/components/ZzDialog/ZzDialog'

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
			<View className='zz_popup_page'>
				<ZzDialog
				 show={true}
				 containerHtml={'ddd'}
				 title={'标题'}
				 footerHtml={'我是底部'}
				
				/>
			</View>
		)
	}
}
