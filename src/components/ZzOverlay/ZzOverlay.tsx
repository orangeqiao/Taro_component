import { View, } from '@tarojs/components'
import classNames from 'classnames';
import React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import './ZzOverlay.scss';
import { mergeStyle } from '@/utils/tool';

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	customStyle?: object | string,
	show: boolean,   //显示
	childHtml?: any, //插槽
	zIndex?: number, //层级
	duration?: number,//ms
	onDidpath?: () => void
}
function ZzOverlay({
	customStyle,
	customClass,
	show = false,
	childHtml,
	zIndex = 1,
	duration = 300,
	onDidpath
}: IPageOwnProps) {
	const isWeapp = process.env.TARO_ENV === 'weapp'
	//节点挂载完成准备执行动画
	const [isReady, setIsReady] = useState(false as boolean)
	// 卸载动画结束
	const [isTransitionEnd, setIsTransitionEnd] = useState(false as boolean)
	// 初始化节点
	const [inited, setInited] = useState(false as boolean)
	useEffect(() => {
		if (show) {
			setIsTransitionEnd(false)
			setInited(true)
			Taro.nextTick(() => {
				setTimeout(() => {
					setIsReady(true) 
				}, 0)
			})
		} else {
			setIsReady(false)
		}
	}, [show])
	const style = useMemo(() => {
		let str: Object = {
			'transition-duration': duration + 'ms',
			'-webkit-transition-duration': duration + 'ms',
			'z-index': zIndex
		}
		if (isReady) {
			str = show ? { ...str, 'opactity': 1 } : str = { ...str, 'opactity': 0 }
		}
		return str
	}, [show, isReady, duration, zIndex])
	const overlayTransitionEnd = useCallback(
		() => {
			if (!show) {
				setIsTransitionEnd(true)
			}
		},
		[show],
	)
	const touchmove = useCallback((e) => {
		if (isWeapp) {
			e.preventDefault() 
			e.stopPropagation()
		}
	}, [])
	const touchStart = useCallback((e) => {
		if (isWeapp) {
			e.preventDefault()
			e.stopPropagation()
		}
	}, [])
	const handleClick=useCallback(()=>{
		onDidpath&&onDidpath()
	},[onDidpath])
	return (
		<React.Fragment>
			{inited ? <View className={classNames(
				'zz_overlay',
				customClass && customClass['class-name']
			)}
				style={mergeStyle(customStyle, isTransitionEnd ? { ...style, 'display': 'none' } : style)}
				onTransitionEnd={overlayTransitionEnd}
				onClick={handleClick}
				onTouchMove={touchmove}
				onTouchStart={touchStart}
				catchMove>
					 {childHtml}
			</View>
				: null}
		</React.Fragment>
	)

}
export default React.memo(ZzOverlay)