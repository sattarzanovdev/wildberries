const BASE_URL = 'https://pbasics.pythonanywhere.com'

// auth/users/ --- Регистрация (POST)
// auth/token/login --- Авторизация (POST)

const $form = document.querySelector('.form')
const $username = document.querySelector('.username')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
const $file = document.querySelector('.file') 
const $submit = document.querySelector('.submit')
const $have = document.querySelector('.haveAccount')

$form.addEventListener('submit', e => {
  e.preventDefault()

  fetch(`${BASE_URL}/auth/users/`, {
    method: 'POST', 
    body: JSON.stringify({
      username: $username.value,
      password: $password.value.trim()
    }),
    headers: {
      'Content-type':'application/json',
    }
})
  .then(res => res.json())
  .then(res => {
    localStorage.setItem('token', res.token)
  })
  .then(res => console.log(res))
})

window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token')

  if(token){
    window.open('./auth.html', '_self')
  }
})

$have.addEventListener('click' , e => {
  e.preventDefault()

  window.open('./auth.html', '_self')
})