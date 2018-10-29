const orderData = []
const orderCartData = []

// 選單切換toggleclass
function menuSwitchActive(container, eventTarget, className) {
	container.querySelector(`.${className}`).classList.remove(className)
	eventTarget.classList.add(className)
}


//初始化訂餐菜單的選單數量
function initOrderMenu(data) {
  document.querySelector('.order-menu li[data-type="all"]').dataset.amount = ` (${data.length})`

  data.reduce((typeSet, item) => typeSet.add(item.type), new Set())
    .forEach(type => {
      document.querySelector(`.order-menu li[data-type='${type}']`).dataset.amount =
        ` (${data.filter(item => item.type === type).length})`
    })
}


//渲染訂餐清單
function renderOrderList(data) {
  const fragment = document.createDocumentFragment()
  const ul = document.querySelector('.order-content>ul')
  ul.innerHTML = ''

  data.forEach((item, index) => {
    const li = document.createElement('li')
    li.dataset.type = item.type

    const top = document.createElement('div')
    const bottom = document.createElement('div')
    top.classList.add('top')
    bottom.classList.add('bottom')

    //上區塊top內容： 愛心按鈕love-btn、圖片img
    const loveBtn = document.createElement('div')
    const img = document.createElement('div')
    loveBtn.classList.add('love-btn')
    //資料中是否為喜好商品
    if (item.love) loveBtn.classList.add('love')
    img.classList.add('img')
    img.style.backgroundImage = `url(${item.imgUrl})`

    //下區塊bottom內容： h4商品名稱name、h6英文name-english、hr分隔線、h4價格price、加入購物車按鈕add-cart-btn
    const name = document.createElement('h4')
    const nameEng = document.createElement('h6')
    const hr = document.createElement('hr')
    const price = document.createElement('h4')
    const addCartBtn = document.createElement('div')
    name.classList.add('name')
    nameEng.classList.add('name-english')
    price.classList.add('price')
    addCartBtn.classList.add('add-cart-btn')
    name.appendChild(document.createTextNode(item.name))
    nameEng.appendChild(document.createTextNode(item.nameEng))
    price.appendChild(document.createTextNode(item.price))
    addCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> 加入購物車'

    //組合dom
    top.appendChild(loveBtn)
    top.appendChild(img)
    //熱門商品加上緞帶
    if (item.hot) {
      const hot = document.createElement('div')
      const ribbon = document.createElement('div')
      hot.classList.add('hot')
      ribbon.classList.add('ribbon')
      ribbon.appendChild(document.createTextNode('熱銷美食'))
      hot.appendChild(ribbon)
      top.appendChild(hot)
    }

    bottom.appendChild(name)
    bottom.appendChild(nameEng)
    bottom.appendChild(hr)
    bottom.appendChild(price)
    bottom.appendChild(addCartBtn)

    li.appendChild(top)
    li.appendChild(bottom)

    fragment.appendChild(li)
  })
  ul.appendChild(fragment)
}


//購物車數量
function addCartAmount() {
  document.querySelector('.cart-amount').textContent = orderCartData.length
}


fetch('./js/orderData.json')
  .then( response => response.json())
  .then( responseJSON => {
    responseJSON.forEach(data => orderData.push(data))

    //初始化訂餐菜單的選單數量
    initOrderMenu(responseJSON)
    //初始載入訂餐清單
    renderOrderList(responseJSON)
  })
  .catch( err => {
    console.log(err);
  })


//監聽區
document.addEventListener('DOMContentLoaded', function () {
  //訂餐菜單點擊事件
  document.querySelector('.order-menu ul').addEventListener('click', function (ev) {
    const target = ev.target
    if (target.nodeName !== 'LI') return

    menuSwitchActive(this, target, 'active')

    target.dataset.type === 'all' ? renderOrderList(orderData) : renderOrderList(orderData.filter(item => item.type === target.dataset.type))
  })

  //篩選按鈕點擊事件
  document.querySelector('.filter .search-btn').addEventListener('click', function () {
    const filterValue = document.querySelector('.filter>input').value.trim()

    if (!filterValue) {
      renderOrderList(orderData)
    } else {
      if (orderData.filter(item => item.name.match(filterValue)).length === 0) {
        document.querySelector('.order-content ul').innerHTML = `
            <li style="
                flex: 1;
                text-align: center;
                padding: 10px;
                letter-spacing: 1px;
                background: none;
                box-shadow: none
            ">--查無結果--</li>
        `
      } else {
        renderOrderList(orderData.filter(item => item.name.match(filterValue)))
      }
    }
  })

  //訂購清單點擊事件 按愛心 加入購物車
  document.querySelector('.order-content ul').addEventListener('click', function (ev) {
    const targetClass = ev.target.classList
    const isLoveBtn = [...targetClass].find(className => className === 'love-btn')
    const isCartBtn = [...targetClass].find(className => className === 'add-cart-btn')
    if (!isLoveBtn && !isCartBtn) return

    function findData() {
      const name = ev.target.parentNode.parentNode.querySelector('.name').textContent
      return orderData.find(item => item.name === name)
    }

    if (isLoveBtn) {
      findData().love = !findData().love
        ;[...targetClass].find(className => className === 'love') ? targetClass.remove('love') : targetClass.add('love')
    } else if (isCartBtn) {
      //原本沒有購物車數量，所以加入節點
      if (orderCartData.length === 0) {
        const cartAmount = document.createElement('div')
        cartAmount.classList.add('cart-amount')
        document.querySelector('.cart-btn').appendChild(cartAmount)
      }
      orderCartData.push(findData())
      addCartAmount()
    }
  })
})