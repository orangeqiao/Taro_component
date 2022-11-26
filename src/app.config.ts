export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
	subPackages:[{
    root: 'comPackages', 
    name: 'comPackages', 
    pages: [
			'zzArrowPage/index',//展示zzArrow组件
			'zzInputPage/index',//展示zzArrow组件
			'zzPopupPage/index',//展示zzArrow组件
			'zzDialogPage/index',//展示zzArrow组件
			'zzLRNoticePage/index',//展示zzArrow组件
			'zzCodeInputPage/index',//展示zzArrow组件
    ]
  }

	],
}
