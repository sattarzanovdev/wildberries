const $container = document.querySelector('.container')
const $search = document.querySelector('.search')
const $modal = document.querySelector('.modal-window')
const $send = document.querySelector('.send')
const $modalSuccess = document.querySelector('.modal_success')
const $address = document.querySelector('.address')
const $telephone = document.querySelector('.telephone')
const $emailModal = document.querySelector('.emailModal')
const $textModal = document.querySelector('.textModal')
const $titleGood = document.querySelector('.titleGood')
const $descriptionGood = document.querySelector('.descriptionGood')
const $priceGood = document.querySelector('.priceGood')
const $imageGood = document.querySelector('.imageGood')
const $categoryGood = document.querySelector('.categoryGood')
const $createGoodBtn = document.querySelector('.createGood')

const BASE_URL = 'https://pbasics.pythonanywhere.com'

if(!localStorage.getItem('token')){
  window.open('./auth.html', '_self')
}else{
  alert('Welcome')
}

window.addEventListener('load', () => {
  getRequest('products')
})

// $search.addEventListener('input', e => {
//   const value = e.target.value.toUpperCase()
//     getRequest('products', cb => {
//       const filtered = cb.filter(item => item.title.includes(value))
//       cardTemplate(filtered)
//       return filtered
//     })
// })

function getRequest(endPoint){
  fetch(`${BASE_URL}/${endPoint}`)    
  .then(r => r.json())    
  .then(res => cardTemplate(res))
}

function cardTemplate(base){
  console.log(base);
  const template = base.map(item => {
    return `
      <div class="card">
        <div class="card-image">
          <img src="${item.image ? item.image : item.image_url}">
        </div>
        <div class="card-body">
          <div class="about"><h2>${item.title}:</h2><p>${item.description}</p></div>
          <p class="notThisPrice">${item.price + 100}руб</p>
          <p>${item.price}руб</p>
        </div>
        <div class="card-footer">
          <button onclick="Edit('${item.id}')">Изменить</button>
          <button onclick="deleteProducts('${item.id}')">Удалить</button>
        </div>
      </div>
      `
  })
    $container.innerHTML = template.reverse()
}


function getProducts(){
  fetch(`${BASE_URL}/products`,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  })
  .then(r => r.json())
  .then(res => {
    cardTemplate(res)
  })
}

function createProducts(){
  fetch(`${BASE_URL}/products/create/ `, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: $titleGood.value,
      description: $descriptionGood.value,
      price: $priceGood.value,
      image_url: $imageGood.value,
      category: +$categoryGood.value,
    })
  })
  .then(res => res.json())
  .then(cardTemplate)

}

$createGoodBtn.addEventListener('click', e => {
  e.preventDefault()

  createProducts()
  window.location.reload()
})

function deleteProducts(id){
  fetch(`${BASE_URL}/products/delete/${id}`, {
    method:'DELETE',
    headers: {
      'Content-type': 'application/json',
    }
  })
  .then(cardTemplate)

  window.location.reload()

}

const $addGood = document.querySelector('.add_good')
const $addGoodBtn = document.querySelector('.add')
const $closeAddGood = document.querySelector('.fa-times')

$addGoodBtn.addEventListener('click', e => {
  e.preventDefault()

  $addGood.classList.toggle('active')
})

$closeAddGood.addEventListener('click', e => {
  e.preventDefault()

  $addGood.classList.remove('active')
})

function Edit(id){
  fetch(`${BASE_URL}/products/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type':'application/json'
    },
    body: JSON.stringify({
      title: prompt('Название товара'),
      description: prompt('Описание товара'),
      price: prompt('Цена товара'),
      category: prompt('Категория товара'),
      image: prompt('Фото товара'),
    })
  })
    .then(res => res.json())
    .then(getRequest)
}

function Edit(id){
  console.log(id);
  fetch(`${BASE_URL}/products/update/${id}`,{
    method:'PATCH',
    headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: prompt('Название товара'),
      description: prompt('Описание товара'),
      price: +prompt('Цена товара'),
      category: +prompt('Категория товара'),
      image_url: prompt('Фото товара'),
    })
  })
  .then(res => res.json())
  .then(getProducts)
}

const $signOut = document.querySelector('.signOut')

$signOut.addEventListener('click', e => {
  e.preventDefault()

  localStorage.removeItem('token')
  window.open('./auth.html', '_self')
})