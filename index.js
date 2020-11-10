
const username = localStorage.getItem('username')
if (username) {
  window.location.href = '/posts.html'
} else {
  const loginForm = document.querySelector('#loginForm')
  const usernameInput = document.querySelector('#usernameInput')

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const username = usernameInput.value
    const clean = DOMPurify.sanitize(username)

    localStorage.setItem('username', clean)
    window.location.href = '/posts.html'
  })
}
