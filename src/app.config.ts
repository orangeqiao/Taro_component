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
    ]
  }

	],
}
