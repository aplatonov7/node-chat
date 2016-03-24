(function() {
  let socket = io()
  let form = document.chatForm

  const pad = n => ('00' + n).slice(-2)
  const formatTime = timestamp => {
    let d = new Date(timestamp)
    return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds())
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    let input = e.currentTarget.querySelector('.chat__input')

    socket.emit('message', input.value)

    input.value = ""
    setTimeout(() => input.classList.remove('success'), 400)
  })

  socket.on('message', data => {
    let chatMessages = document.querySelector('.chat__messages')
    let messageElem = document.createElement('div')
    let timeElem = document.createElement('div')

    let { time, msg } = JSON.parse(data)
    messageElem.classList.add('chat__message')
    messageElem.innerHTML = msg
    timeElem.classList.add('chat__message-time')
    timeElem.innerHTML = formatTime(time)
    messageElem.appendChild(timeElem)
    chatMessages.appendChild(messageElem)
    chatMessages.scrollTop = chatMessages.scrollHeight
  })
})()