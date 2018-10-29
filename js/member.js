document.addEventListener('DOMContentLoaded',function(){
  //註冊與登入按鈕事件
	document.querySelector('.login .cancel').addEventListener('click', function () {
		document.querySelector('.register').style.display = 'block'
		document.querySelector('.login').style.display = 'none'
	})
	document.querySelector('.register .have-account').addEventListener('click', function () {
		document.querySelector('.register').style.display = 'none'
		document.querySelector('.login').style.display = 'block'
	})
})