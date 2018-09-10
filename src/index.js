const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
const nameInput = document.querySelector('#nameInput')
const imageInput = document.querySelector('#imageInput')

let toys = []
let addToy = false

// Get the initial toys from the server
// and put them on the page
getToys()
  .then(toysData => {
    toys = toysData
    appendToys(toys)
  })

// Show/hide the form when clicking the "Add Toy" button
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

/*** PAGE INTERACTIONS ***/

// This appends a single toy
function appendToy(toy) {
  const toyElement = document.createElement('div')
  toyElement.className = "card"
  toyElement.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  `
  const buttonElement = toyElement.querySelector('button')
  const likesElement = toyElement.querySelector('p')
  buttonElement.addEventListener('click', event => {
    toy.likes++
    likesElement.innerText = `${toy.likes} Likes`
    updateToy(toy)
  })
  toyContainer.appendChild(toyElement)
}

// This appends several toys, using the above function
function appendToys(toys) {
  toys.forEach(toy => appendToy(toy))
}

// Attach a 'submit' listener to the form
// that will create a new toy when triggered
addToyForm.addEventListener('submit', event => {
  event.preventDefault()
  const name = nameInput.value
  const image = imageInput.value
  const likes = 0
  const toy = {
    name: name,
    image: image,
    likes: likes
  }
  appendToy(toy)
  createToy(toy)
})


/*** SERVER INTERACTIONS ***/

// Get toys from the server and return
// an array of toys wrapped in a Promise
function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
}

// POST a new toy to the server
function createToy(toy) {
  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  }
  return fetch("http://localhost:3000/toys", options)
}

// Update an existing toy on the server
function updateToy(toy) {
  const options = {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  }
  return fetch(`http://localhost:3000/toys/${toy.id}`, options)
}
