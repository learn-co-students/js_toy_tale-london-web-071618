
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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

function showToy(toy) {
  const toysContainer = document.querySelector("#toy-collection")
  const toyEl = document.createElement("div")
  toyEl.className = "card"
  toyEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p>${toy.likes} Likes <p>
    <button class="like-btn">Like <3</button>
  `

  const likeBtn = toyEl.querySelector("button")

  likeBtn.addEventListener("click", () => {
    let likesNumber = ++toy.likes
    const likesOnPage = toyEl.querySelector("p")
    likesOnPage.innerHTML = `${likesNumber} Likes `

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: likesNumber})
    })
  })
  toysContainer.append(toyEl)
}

function appendToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => data.forEach(toy => showToy(toy)))
}

appendToys()

const form = document.querySelector(".add-toy-form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  let nameInput = document.querySelector("#nameInput").value
  let imageInput = document.querySelector("#imageInput").value
  addNewToy(nameInput, imageInput)
})

function addNewToy(name, image) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: name, image: image, likes: 0})
    })
      .then(res => res.json())
      .then(toy => showToy(toy))
}
