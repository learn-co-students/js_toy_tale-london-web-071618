const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyCollection = document.querySelector("#toy-collection")



fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => showToys(toys))

function showToys(toys) {
  toys.forEach(toy => showToy(toy))
}

function showToy(toy){
  const toyElement = document.createElement("div")
  toyElement.className = "card"
  toyElement.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar">
  <p id="${toy.id}-likes-${toy.likes}">${toy.likes} Likes <p>
  <button id="toy-${toy.id}" class="like-btn">Like <3</button>
  `
  appendToy(toyElement)
}

function appendToy(toy) {
  toyCollection.append(toy)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  let name = event.target.name.value
  let image = event.target.image.value
  createToy(name, image)
})

function createToy(name, image) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  })
    .then(res => res.json())
    .then(toy => showToy(toy))
}
let id = 0
const likeButton = document.querySelector(`#toy-${id}`)
likeButton.addEventListener("click", event => {
  const toyLikesElement = document.querySelector(`p#${id}`)
  // "${toy.id}-likes-${toy.likes}"
  increaseToyLikes(toyLikes)
})

function increaseToyLikes(likes){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: {likes: likes}
  })
}

// OR HERE!
