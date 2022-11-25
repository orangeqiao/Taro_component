import React, { Component } from 'react'
import { View,Button  } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzDialog from '@/components/ZzDialog/ZzDialog'

interface IPageOwnProps {
}
interface IPageState {
	show:boolean

}
export default class Index extends Component<IPageOwnProps, IPageState>  {
	constructor(props: IPageOwnProps) {
		super(props)
		this.state = {
			show:false
		}
	}

	componentWillMount() { }

	componentDidMount() { }

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }
	changePopup=()=>{
		this.setState({
			show:!this.state.show
		})
	}

	

	render() {
		let { show } = this.state
		return (
			<View className='zz_popup_page'>
				<Button onClick={this.changePopup}>打开popup</Button>
				<ZzDialog
				 show={show}
				 containerHtml={'ddd'}
				 title={'标题'}
				 footerHtml={'我是底部'}
				 onClose={this.changePopup}
				
				/>
			</View>
		)
	}
}
