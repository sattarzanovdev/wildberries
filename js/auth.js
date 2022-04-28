const BASE_URL = 'https://pbasics.pythonanywhere.com'

// auth/users/ --- Регистрация (POST)
// auth/token/login --- Авторизация (POST)

const $form = document.querySelector('.form')
const $username = document.querySelector('.username')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
const $file = document.querySelector('.file') 
const $submit = document.querySelector('.submit')
const $have = document.querySelector('.haventAccount')

$form.addEventListener('submit', e => {
  e.preventDefault()

  fetch(`${BASE_URL}/auth/token/login`, {
    method: 'POST', 
    body: JSON.stringify({
      username: $username.value,
      password: $password.value.trim(),
      email: $email.value
    }),
    headers: {
      'Content-type':'application/json',
    }
})
  .then(res => res.json())
  .then(res => {
    const token = localStorage.getItem('token')
    localStorage.setItem('token', res.auth_token, `${res.auth_token === token ? window.open('./index.html', '_self') : alert('ЖОГОЛЧУ Э')}`)
    localStorage.setItem('email', $email.value)
  })
})


$have.addEventListener('click' , () => {
  window.open('./register.html', '_self')
})

