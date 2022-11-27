import { View, Button, Input } from '@tarojs/components'
import classNames from 'classnames';
import Taro from '@tarojs/taro';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ZzCodeInput.scss'

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	showType?: 'number' | 'password',
	value?: string
	onInput?: (event: any, value: string) => void
	maxLength?: number
}
function ZzCodeInput({
	onInput,
	customClass,
	maxLength = 3,
	showType='password',
	value,
	
}: IPageOwnProps) {
	const _inputVal = useRef('' as string)
	const [codeList, setCodeList] = useState([] as Array<any>)
	const [inputVal, setInputVal] = useState('' as string)
	useEffect(() => {
		codeList.length = maxLength
		if(value){
			setInputVal(value)
			let valueArr:Array<any> = [...value]
			for (let i = 0; i < codeList.length; i++) {
				codeList[i] = valueArr[i]
			}
		}
		setCodeList([...codeList])

	}, [maxLength,value])
	const handleInput = useCallback((event) => {
		let { value } = event.detail
		setInputVal(value)
		_inputVal.current = value
		if (maxLength !== undefined && _inputVal.current.length > maxLength) {
			_inputVal.current = _inputVal.current.substr(0, maxLength)
		}
		setTimeout(() => {
			setInputVal(_inputVal.current)
		}, 0)
		let valueArr = [...value]
		for (let i = 0; i < codeList.length; i++) {
			codeList[i] = valueArr[i]
		}
		console.log(codeList, event.detail);

		setCodeList([...codeList])

		onInput && onInput(event, value)
	}, [onInput])


	return (
		<View className={classNames(
			customClass,
			'zz_code_Input',
		)}>
			<View className='code_list_container'>
				{
					codeList.map((e, index) => {
						return <View key={index} className='list_item'>{
							showType === 'password' ? '●' :
								e}</View>
					})
				}
			</View>
			<Input className='zz_input' type='digit' value={inputVal} onInput={handleInput}></Input>
		</View>
	)

}
export default React.memo(ZzCodeInput)