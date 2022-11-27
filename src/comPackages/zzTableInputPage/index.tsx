import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import ZzTableInput from '@/components/ZzTableInput/ZzTableInput'

interface IPageOwnProps {
}
interface IPageState {
	table: Array<any>,
	table_origin: Array<any>
	showColumn: Array<any>
	onlyView: boolean,//读or写
	maxLength:number

}
export default class Index extends Component<IPageOwnProps, IPageState>  {
	private table_origin: Array<any> = []
	constructor(props: IPageOwnProps) {


		super(props)
		this.state = {
			table: [{
				name: '陈芷侨',
				age: 16,
				sex: '女',
				phone: '123',
				desc: '美女'

			}, {
				name: '熊凡一',
				age: 26,
				sex: '女',
				phone: '2223',
				desc: '靓女'
			}, {
				name: '熊凡一',
				age: 26,
				sex: '女',
				phone: '2223',
				desc: '靓女'
			},],
			showColumn: [{ id: 'name', name: '姓名' }, { id: 'age', name: '年龄' }, { id: 'sex', name: '性别' }, { id: 'phone', name: '手机号' }],
			onlyView: false,
			table_origin: [{
				name: '陈芷侨',
				age: 16,
				sex: '女',
				phone: '123',
				desc: '美女'

			}, {
				name: '熊凡一',
				age: 26,
				sex: '女',
				phone: '2223',
				desc: '靓女'
			},{
				name: '熊凡一',
				age: 26,
				sex: '女',
				phone: '2223',
				desc: '靓女'
			},],
			maxLength:5


		}
	}

	componentWillMount() { }

	componentDidMount() {
		this.table_origin = this.state.table

	}

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }
	changeTable = (table) => {
		console.log(table);
		this.setState({
			table: [...table]
		})
	}
	changeView = () => {
		this.setState({
			onlyView: !this.state.onlyView
		})
	}
	checkModify(newValue, oldValue) {
		console.log(newValue, oldValue);
		// console.log(typeof newValue === 'object' && typeof oldValue === 'object');
		if (typeof newValue === 'object' && typeof oldValue === 'object') {
			let newValue_keys = Object.keys(newValue)
			let oldValue_keys = Object.keys(oldValue)
			if (newValue_keys.length !== oldValue_keys.length) {
				return true
			}
			for (let i = 0; i < newValue_keys.length; i++) {
				let propsName = newValue_keys[i]
				let propsType = Object.prototype.toString.call(propsName).slice(8, -1)
				if (propsType === "Object") {
					if (this.checkModify(newValue[propsName], oldValue[propsName])) {
						return true
					}
				} else {
					if (newValue[propsName] !== oldValue[propsName]) {
						return true
					}
				}
			}
		}
		return false


	}
	checkEmpty(newValue, propsList) {
		// 判断对象是否为空
		// propsList  需要检验的字段
		console.log(newValue);
		let isEmpty = true
		let newValueProp = Object.prototype.toString.call(newValue).slice(8, -1)
		if (newValueProp === "Object") {
			let newValue_keys = Object.keys(newValue)
			for (let i = 0; i < newValue_keys.length; i++) {
				let propsName = newValue_keys[i]
				if (!!newValue[propsName] && propsList.includes(propsName)) {
					isEmpty = false
					return isEmpty
				}
			}
		}
		return isEmpty
	}
	handleAdd = (index, objectDedault) => {
		let { table ,maxLength} = this.state
		let tbLength=table.length
		if(tbLength===maxLength){
			return false
			console.log('最大行数了，不能增加');
		}
		const r = table.map((e, i) => {
			return this.checkEmpty(e, ['name', 'age'])
		})
		let isEmpty = r.some(e => e) // 是否存在一个对象全为空值
		console.log(isEmpty, r);
		if (!isEmpty) {
			table.splice(index + 1, 0, objectDedault)
			this.setState({
				table: [...table]
			})
		} else { console.log('存在某一行为空值') }
	}
	handleCheCK = () => {
		let { table, table_origin } = this.state
		let isModify = false //是否存在修改
		let r:Array<any>=[] 
		if (table.length !== table_origin.length) {
			isModify = true
		} else {
			 r = table.map((e, i) => {
				return this.checkModify(e, table_origin[i])
			})
			isModify = r.some(e => e)
		}
		console.log(isModify,r);
		if (isModify) {
			console.log('被修改');
		} else {
			console.log('没有被修改')
		}

	}
	render() {
		let { table, showColumn, onlyView,maxLength } = this.state
		return (
			<View className='zz_innput_page'>
				<Button className='btn' onClick={this.changeView}>读or写</Button>
				<Button className='btn' onClick={this.handleCheCK}>检测有没有被修改</Button>


				<ZzTableInput maxLength={maxLength} onAdd={this.handleAdd} onlyView={onlyView} table={table} showColumn={showColumn} onChange={this.changeTable} />
			</View>
		)
	}
}
