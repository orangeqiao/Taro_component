import { View, } from '@tarojs/components'
import classNames from 'classnames';
import React from 'react';
import Taro from '@tarojs/taro';
import { useState, useEffect, useMemo, useCallback } from 'react';
import './ZzPopup.scss';
import { mergeStyle } from '@/utils/tool';
import ZzOverlay from '../ZzOverlay/ZzOverlay';

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	customStyle?: object | string,
	show: boolean,   //显示
	overlay?: boolean, //遮罩层
	childHtml?: any, //插槽
	arrow?: 'right' | 'left' | 'top' | 'bottom',
	zIndex?: number, //层级
	duration?: number,//ms
	round?: boolean, //圆角
	onDidpath?: () => void,
	onClose?: (type?: string) => void
}
function ZzPopup({
	customStyle,
	customClass,
	show = false,
	childHtml,
	zIndex = 1,
	arrow = 'left',
	duration = 300,
	overlay = true,
	round=true,
	onDidpath,
	onClose
}: IPageOwnProps) {
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
			str = show ? { ...str, 'opacity': 1 } : { ...str, 'opacity': 0 }
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
	const handleClose = useCallback(() => {
		onClose && onClose('overlay')
	}, [onClose, show])


	return (
		<React.Fragment>
			{inited ?
				<React.Fragment>
					{
						overlay && <ZzOverlay show={show} onDidpath={handleClose} />
					}
					<View className={classNames(
						'zz_popup',
						{
							[`zz_popup_${arrow}_default`]: true,
							[`zz_popup_${arrow}`]: true,
							'zz_left_right_active': ['right', 'left'].includes(arrow) && isReady && show,
							'zz_top_bottom_active': ['top', 'bottom'].includes(arrow) && isReady && show,
							'zz_popup_round': round,
						},
						customClass && customClass['class-name']
					)}
						style={mergeStyle(customStyle, isTransitionEnd ? { ...style, 'display': 'none' } : style)}
						onTransitionEnd={overlayTransitionEnd}>
						{childHtml}
						dsd
					</View>
				</React.Fragment>

				: null}
		</React.Fragment>
	)

}
export default React.memo(ZzPopup)