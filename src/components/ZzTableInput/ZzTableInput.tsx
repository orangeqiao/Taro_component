import { View, Button } from '@tarojs/components'
import classNames from 'classnames';
import { Input } from '@tarojs/components'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './ZzTableInput.scss'

interface IPageOwnProps {
	'class-name'?: string,
	customClass?: Partial<Pick<IPageOwnProps, 'class-name'>>
	table?: Array<any>,
	showColumn: Array<any>,
	onChange?: (table: Array<any>) => void
	showAdd?: boolean
	showDel?: boolean
	maxLength?: number
	onlyView?: boolean
	onDel?: (value: object) => void
	onAdd?: (index:any,tableObject:any) => void

}
function ZzTableInput({
	table = [],
	showColumn = [],
	showAdd = true,
	showDel = true,
	customClass,
	maxLength = 3,
	onlyView = true,
	onChange,
	onDel,
	onAdd,
}: IPageOwnProps) {
	const isWeapp = process.env.TARO_ENV === 'weapp'
	const _table = useRef([] as Array<any>)
	const _table_object = useRef({} as object)

	useEffect(() => {
		_table.current = table


	}, [table])
	useEffect(() => {
		let tableItem = table[0]
		for (let key in tableItem) {
			_table_object.current[key] = ''
			// console.log(_table_object);
		}
	}, [])
	const inputChange = useCallback((event) => {
		let { value } = event.detail

		let index = isWeapp ? event.target.dataset.index : event.target['data-index']
		let column = isWeapp ? event.target.dataset.column : event.target['data-column']
		console.log(value, index, column);
		_table.current[index][column] = value
		onChange && onChange(_table.current)
	}, [table, onChange])
	const changeOperater = useCallback((event) => {
		let index = isWeapp ? event.target.dataset.index : event.target['data-index']
		let type = isWeapp ? event.target.dataset.type : event.target['data-type']
		switch (type) {
			case 'add':
				if (onAdd) {
					onAdd(index,_table_object.current)
				} else {
					_table.current.splice(index + 1, 0, _table_object.current)
					onChange && onChange(_table.current)
				}
				break
			case 'del':
				if (onDel) {
					onDel(index)
				} else {
					_table.current.splice(index, 1)
					onChange && onChange(_table.current)
				}
				break
		}
	}, [onChange, onDel, onAdd, table])
	return (
		<View className='zz_table'>
			{
				showColumn && showColumn.length > 0 ?
					<View className='zz_table_row zz_table_hd'>
						{
							showColumn.map((e) => {
								return <View key={e.id} className='zz_table_column'>
									{e.name}
								</View>
							})
						}
						{
							showAdd && showDel && !onlyView ? <View className='zz_table_column'>
								操作
							</View> : null
						}

					</View> : null

			}
			{
				table.map((tItem, tIndex) => {
					return <View key={tIndex} className='zz_table_row'>
						{
							showColumn.map((e) => {
								return <View key={tIndex + '-' + e.id} className='zz_table_column'>
									{
										onlyView ? <View>{tItem[e.id]}</View> : <Input
											className={classNames(
												'zz_input',
												customClass && customClass['class-name']
											)}
											data-index={tIndex}
											data-column={e.id}
											onInput={inputChange}
											value={tItem[e.id]}
										/>
									}
								</View>


							})
						}
						{
							(showAdd || showDel) && !onlyView ? <View key={tIndex + '-op'} className='zz_table_column operater_column'>
								{
									showAdd && tIndex < maxLength - 1 ? <View className='operater_column_item' data-type={'add'} data-index={tIndex} onClick={changeOperater}>
										增加
									</View> : null
								}
								{
									showDel && table.length > 1 ? <View className='operater_column_item' data-type={'del'} data-index={tIndex} onClick={changeOperater}>
										减少
									</View> : null
								}

							</View> : null
						}
					</View>
				})
			}



		</View>

	)

}
export default React.memo(ZzTableInput)