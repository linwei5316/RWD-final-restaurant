//   -----函數區-------


//切換頁面
// function switchPage(pageName) {
// 	document.querySelectorAll('.page').forEach(page => page.style.display = 'none')
// 	switch (pageName) {
// 		case 'index':
// 			document.querySelector(`#${pageName}`).style.display = 'block'
// 			break
// 		case 'order':
// 		case 'member':
// 			document.querySelector(`#${pageName}`).style.display = 'flex'
// 			break
// 		default:
// 			break
// 	}
// }



//     ----- 監聽區 -------

document.addEventListener('DOMContentLoaded', function () {
	//手機版菜單點擊事件
	document.querySelector('.menu-btn').addEventListener('click', function () {
		const nav = document.querySelector('nav')

			;[...nav.classList].find(item => item === 'menu-open') ? nav.classList.remove('menu-open') : nav.classList.add('menu-open')
	})

	//取消所有submit按鈕行為
	document.querySelectorAll('[type="submit"]').forEach(item => item.addEventListener('click', function (ev) {
		ev.preventDefault()
	}))	
})



//目前問題
// 原有切換頁面的最外層div要修掉，修完css檢查一下有沒有問題
// 

//待優化

//表單驗證正規表達
//新增購物車功能
//串接會員登入API
