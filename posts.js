const ENDPOINT = 'https://jz-messageboard.herokuapp.com/'
let posts = []

const postInputLabel = document.querySelector('#postInputLabel')
const postForm = document.querySelector('#postForm')
const messageInput = document.querySelector('#messageInput')
const postsList = document.querySelector('#postsList')
const postSubmitButton = document.querySelector('#postSubmitButton')

const username = localStorage.getItem('username')

const handleGetPosts = () => {
  return axios.get(ENDPOINT)
}

const submitPost = async (username, message) => {
  postSubmitButton.disabled = true
  const res = await axios.post(ENDPOINT, {
    username,
    message,
  })
  postSubmitButton.disabled = false
  return res
}

const clearForm = () => {
  messageInput.value = ''
}

const writePostsToList = (posts) => {
  const html = posts
    .map((post) => {
      return `<li class="list-group-item d-flex flex-column post-item">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-light">${post.username}</span>
        <span class="font-italic">${Date(post.timestamp).toString().slice(0, 24)}</span>
      </div>
      <h5>${post.message}</h5>
    </li>`
    })
    .join('')
  postsList.innerHTML = html
  postsList.scrollTop = postsList.offsetHeight * posts.length
}

if (!username) {
  window.location.href = '/index.html'
}

postInputLabel.innerHTML = `Post as ${username}`
handleGetPosts().then((res) => {
  console.log(res.data)
  posts = res.data
  writePostsToList(res.data)
})

postForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const message = messageInput.value
  const cleanMessage = DOMPurify.sanitize(message)
  submitPost(username, cleanMessage).then((res) => {
    posts.push(res.data)
    writePostsToList(posts)
    clearForm()
  })
})
