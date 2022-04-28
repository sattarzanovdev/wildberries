const $container = document.querySelector('.container')
const $search = document.querySelector('.search')
const $modal = document.querySelector('.modal-window')
const $close = document.querySelector('.fa-times')
const $send = document.querySelector('.send')
const $modalSuccess = document.querySelector('.modal_success')
const $closeModal = document.querySelector('.close_modal')
const $address = document.querySelector('.address')
const $telephone = document.querySelector('.telephone')
const $emailModal = document.querySelector('.emailModal')
const $textModal = document.querySelector('.textModal')

const BASE_URL = 'https://pbasics.pythonanywhere.com'

window.addEventListener('load', () => {
  fetch(`${BASE_URL}/products`)    
    .then(res => res.json())    
    .then(res => cardTemplate(res))
})

function getRequest(cb){
  fetch(`${BASE_URL}/products`)    
  .then(r => r.json())    
  .then(res => cb(res))
}

$search.addEventListener('input', e => {
  let value = e.target.value.toUpperCase()
    getRequest(cb => {
      const filtered = cb.filter(item => item.title.toUpperCase().includes(value))
      cardTemplate(filtered)
    })
})

function cardTemplate(base){
  const template = base.map(({id, title, price, image, description}) => {
    return `
      <div class="card">
        <div class="card-image">
          <img src="${image}">
        </div>
        <div class="card-body">
          <div class="about"><h2>${title}:</h2><p>${description}</p></div>
          <p class="notThisPrice">${price + 100}руб</p>
          <p>${price}руб</p>
        </div>
        <div class="card-footer">
          <button onclick="Buy('${id}')">Купить</button>
        </div>
      </div>
    `
  }).join('')

  $container.innerHTML = template
}


function Buy(id){
  fetch(`${BASE_URL}/products`)
    .then(res => res.json())
    .then(res => buyTemplate(res[id - 1]))
}

function buyTemplate(base){
  const buyTemplate = `
    <button class="back" onclick="back()" ><i class="fa fa-arrow-left"></i></button>
    <div class="moreCard">
      <div class="more-image">
        <img src="${base.image}">
      </div>
      <div style="display: flex; flex-direction: column">
        <div class="more-info">
          <div style="display: flex; align-items: center">
            <h1>${base.title}: </h1> <p style="margin-left: 5px">${base.description}</p>
          </div>
          <p class="notThisPrice">${base.price + 100} руб</p>
          <p>${base.price} руб</p>
        </div>
        <div class="more-footer">
          <button onclick="modal()">Заказать одним кликом</button>
        </div>
      </div>
    </div>
  `

  $container.innerHTML = buyTemplate
}

function modal(){
  $modal.classList.add('active')
  document.body.setAttribute('style', 'background: rgba(0, 0, 0, 0.5)')
}

$close.addEventListener('click', () => {
  $modal.classList.remove('active')
  document.body.removeAttribute('style')
})

$send.addEventListener('click', e => {
  e.preventDefault()

  if($address.value.length === 0 || $telephone.value.length === 0 || $emailModal.value.length === 0){
    $textModal.innerHTML = 'Заполните!'
    $modalSuccess.classList.add('active')
    $modal.classList.remove('active')
    document.body.removeAttribute('style')
  }else{
    $textModal.innerHTML = 'Успешно!'
    $modalSuccess.classList.add('active')
    $modal.classList.remove('active')
    document.body.removeAttribute('style')
  }
})

$closeModal.addEventListener('click', e => {
  e.preventDefault()

  $modalSuccess.classList.remove('active')
})

function back(){
  window.location.reload()
}