import { View, } from '@tarojs/components'
import classNames from 'classnames';
import React from 'react';
import Taro from '@tarojs/taro';
import { useState, useEffect, useMemo, useCallback } from 'react';
import './ZzDialog.scss';
import { mergeStyle } from '@/utils/tool';
import ZzOverlay from '../ZzOverlay/ZzOverlay';

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	customStyle?: object | string,
	show: boolean,   //显示
	overlay?: boolean, //遮罩层
	containerHtml?: any, //内容插槽
	headerHtml?: any, //内容插槽
	footerHtml?: any, //内容插槽
	showClose?: boolean,//关闭按钮
	zIndex?: number, //层级
	duration?: number,//ms
	onDidpath?: () => void,
	title?: string,
	onClose?: (type?: string) => void
}
function ZzPopup({
	customStyle,
	customClass,
	show = false,
	containerHtml,
	headerHtml,
	footerHtml,
	zIndex = 1,
	duration = 300,
	overlay = true,
	title,
	showClose=true,
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
		console.log('关闭');
		onClose && onClose()
	}, [onClose, show])
	return (
		<React.Fragment>
			{inited ?
				<React.Fragment>
					{
						overlay && <ZzOverlay show={show} onDidpath={handleClose} />
					}
					<View className={classNames(
						'zz_dialog',
						{
							'zz_dialog_active': isReady && show
						},
						customClass && customClass['class-name']
					)}
						style={mergeStyle(customStyle, isTransitionEnd ? { ...style, 'display': 'none' } : style)}
						onTransitionEnd={overlayTransitionEnd}>
						{
							showClose && <View className='zz_dialog_close' onClick={handleClose} >X</View>
						}

						<View className='zz_dialog_header'>
							{
								headerHtml ? headerHtml : title 
							}
						</View>
						<View className='zz_dialog_container'>
							{
								containerHtml ? containerHtml : null
							}
						</View>
						<View className='zz_dialog_footer'>
							{
								footerHtml ? footerHtml : null
							}
						</View>
					</View>
				</React.Fragment>

				: null}
		</React.Fragment>
	)

}
export default React.memo(ZzPopup)