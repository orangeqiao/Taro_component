import { View, Button } from '@tarojs/components'
import classNames from 'classnames';
import { Input } from '@tarojs/components'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ZzInput.scss'

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	value?: string
	maxlength?: number
	onInput?: (event: any, value: string) => void //第一个taro返回的，第二个参数是处理过的value
}
function ZzInput({
	maxlength,
	value,
	customClass,
	onInput,
}: IPageOwnProps) {
	const [inputValue, setInputValue] = useState('' as string)
	const tempInputValue = useRef('' as string)
	useEffect(() => {
		if (value !== undefined) {
			tempInputValue.current = value
			setInputValue(value)
		}
	}, [value])
	const inputChange = useCallback((event) => {
		let { value } = event.detail
		setInputValue(value)
		tempInputValue.current = value
		if (maxlength !== undefined && tempInputValue.current.length > maxlength) {
			tempInputValue.current = tempInputValue.current.substr(0, maxlength)
		}
		setTimeout(() => {
			setInputValue(tempInputValue.current)
		}, 0)
	}, [onInput, maxlength])
	return (<Input
		className={classNames(
			'zz_input',
			customClass && customClass['class-name']
		)}
		onInput={inputChange}
		value={inputValue}
	/>
	)

}
export default React.memo(ZzInput)