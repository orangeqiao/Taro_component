import { View, Button } from '@tarojs/components'
import classNames from 'classnames';
import React from 'react';
import styles from './ZzArrow.module.scss'

interface IPageOwnProps{
 color?:string,
 lineWidth?:number, //线的宽度
 breadth?:number, //箭头的大小
 unfold?:boolean,  //是否展开
 fixedAngle?:number,  //固定角度
  onDidpath?:() => void
}
function ZzArrow({
	color='#000',
	lineWidth=2,
	breadth=10,
	unfold=false,
	fixedAngle=0,
  onDidpath
}: IPageOwnProps){
	return (<View style={{
		width:`${breadth}px`,
		height:`${breadth}px`,
		borderTop:`${lineWidth}px ${color} solid`,
		borderRight:`${lineWidth}px ${color} solid`,
		transform:`rotate(${fixedAngle || (unfold?-45:135)}deg)`,
		transition:'all 1s ease-out',
		boxSizing:`border-box`,
		marginLeft:`${breadth}px`,

	}}>
		
		</View>)

}
export default React.memo(ZzArrow)