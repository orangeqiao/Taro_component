import { View, Button } from '@tarojs/components'
import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { Input } from '@tarojs/components'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ZzLRNotice.scss'

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	message?: string,
	marqueePace?: number //滚动速度
	size?: number //字体大小
}
function ZzLRNotice({
	message,
	size = 14,
	customClass,
	marqueePace = 1,
}: IPageOwnProps) {
	const [marqueeDistance, setMarqueeDistance] = useState(0 as number)
	const timer = useRef(null as any)
	const _noticeLen = useRef(0 as number)
	const _windowWidth = useRef(0 as number)
	const _marqueeDistance = useRef(0 as number)
	useEffect(() => {
		if (message) {
			size = size > 0 ? size : 12
			console.log(Taro.getSystemInfoSync().windowWidth);

			_noticeLen.current = message.length * size
			_windowWidth.current = Taro.getSystemInfoSync().windowWidth
			_marqueeDistance.current = _windowWidth.current
			setMarqueeDistance(_windowWidth.current)
			runScroll()
		}
	}, [])
	const runScroll = useCallback(() => {
		timer.current = setInterval(() => {
			if (-_marqueeDistance.current < _noticeLen.current) {
				let newMarquee = _marqueeDistance.current - marqueePace
				setMarqueeDistance(newMarquee)
				_marqueeDistance.current = newMarquee
			} else {
				setMarqueeDistance(_windowWidth.current)
				_marqueeDistance.current = _windowWidth.current
				runScroll()
				clearInterval(timer.current)
			}
		}, 20)

	}, [message, size])
	return (
		<View className={classNames(
			customClass,
			'zz_lr_notice',
		)}>
			<View className='sccroll_wrap' style={{ left: marqueeDistance + 'px' }}>{message}</View>

		</View>
	)

}
export default React.memo(ZzLRNotice)