(function() {
  let socket = io()
  let form = document.chatForm

  form.addEventListener('submit', e => {
    e.preventDefault()
    let input = e.currentTarget.querySelector('.chat__input')

    socket.emit('message', input.value)

    input.value = ""
    setTimeout(() => input.classList.remove('success'), 400)
  })

  socket.on('message', msg => {
    let chatMessages = document.querySelector('.chat__messages')
    let messageElem = document.createElement('div')
    messageElem.classList.add('chat__message')
    messageElem.innerHTML = msg
    chatMessages.appendChild(messageElem)
    chatMessages.scrollTop = chatMessages.scrollHeight
  })
})()