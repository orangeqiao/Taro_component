import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzArrow from '@/components/ZzArrow/ZzArrow'

interface IPageOwnProps {
}
interface IPageState {
	unfold: boolean

}
export default class Index extends Component<IPageOwnProps, IPageState>  {
	constructor(props: IPageOwnProps) {
		super(props)
		this.state = {
			unfold: false

		}
	}

	componentWillMount() { }

	componentDidMount() { }

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	changeUnfold = () => {
		let { unfold } = this.state
		this.setState({
			unfold: !unfold
		})
	}

	render() {
		let { unfold } = this.state
		return (
			<View className='zzArrowPage'>
				<View className='section'>
					<View className='section_title'>操作区域</View>
					<Button className='btn' onClick={this.changeUnfold}>切换</Button>
				</View>
				<View className='section'>
					<View className='section_title'>展示区域</View>
					<View className="section_container">
						<ZzArrow unfold={unfold} />
					</View>
				</View>
			</View>
		)
	}
}
