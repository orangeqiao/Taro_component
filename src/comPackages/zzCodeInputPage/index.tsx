import React, { Component } from 'react'
import { View, Button,Input } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzCodeInput from '@/components/ZzCodeInput/ZzCodeInput'

interface IPageOwnProps {
}
interface IPageState {
	showType:'number' | 'password'
	maxLength:number
}
export default class Index extends Component<IPageOwnProps, IPageState>  {
	constructor(props: IPageOwnProps) {
		super(props)
		this.state = {
			showType:'number',
			maxLength:6

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
	changeShowType=()=>{
		this.setState({
			showType:this.state.showType==='number'?'password':'number'
		})
	}
	changeMaxLength=(event)=>{
		let {value}=event.detail
		value = value.substr(0, 1)
		this.setState({
			maxLength:value
		})
	}
	render() {
		let { showType,maxLength, } = this.state
		return (
			<View className='zz_code_input_page'>
				输入验证码长度：
					<Input className='zz_input' type='digit' value={maxLength+''} onInput={this.changeMaxLength}></Input>
					<Button className='btn' onClick={this.changeShowType}>明or密</Button>
				<ZzCodeInput value='' maxLength={maxLength} showType={showType} onInput={this.handleInput}/>
			</View>
		)
	}
}
