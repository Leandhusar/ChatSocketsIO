const socket = io()

//Obtenemos todos los elementos del DOM
const chat = document.querySelector('#chat')
const form = document.querySelector('form')
const name = form.name
const message = form.message
const send = form.send

form.addEventListener('submit', e => {
  e.preventDefault()

  //Mientras el mensaje se esté enviando, el botón de Enviar se deshabilita
  send.classList.remove('bg-red-600')
  send.classList.add('cursor-not-allowed', 'bg-red-600')

  socket.emit('sendMessage', {
    name: name.value,
    message: message.value
  })

  message.value = ''
  message.focus()
})

//Se muestra el mensaje y se rehabilita el botón de enviar
//Primero muestra el usuario y luego el mensaje
socket.on('showMessage', message => {
  const newMessage = document.createElement('div')
  const user = document.createElement('h3')
  const text = document.createElement('p')

  newMessage.classList.add('flex', 'items-center', 'mt-5')
  user.classList.add('bg-red-600', 'p-3', 'mr-10', 'w-40', 'rounded', 'self-start')
  user.innerHTML = message.name
  text.classList.add('w-4/5')
  text.innerHTML = message.message

  newMessage.appendChild(user)
  newMessage.appendChild(text)
  chat.appendChild(newMessage)
  send.classList.remove('cursor-not-allowed', 'bg-red-600')
  send.classList.add('bg-red-600')
})