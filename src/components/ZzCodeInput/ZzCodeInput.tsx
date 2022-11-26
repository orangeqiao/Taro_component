import { View, Button, Input } from '@tarojs/components'
import classNames from 'classnames';
import Taro from '@tarojs/taro';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ZzCodeInput.scss'

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	showType?: 'number' | 'password',
	value?: number
	onInput?: (event: any, value: string) => void
}
function ZzCodeInput({
	onInput,
	customClass,
}: IPageOwnProps) {
	const _inputVal = useRef()
	const [codeList,setCodeList]=useState(['', '', '', '', '', ''] as Array<any>)
	const [inputVal, setInputVal] = useState()
	const handleInput = useCallback((event) => {
		let { value } = event.detail
		setInputVal(value)
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
						return <View key={index} className='list_item'>{e}</View>
					})
				}
			</View>
			<Input className='zz_input'  type='digit' value={inputVal} onInput={handleInput}></Input>
		</View>
	)

}
export default React.memo(ZzCodeInput)