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


//Step 2 and 3: fetch and show andy's toys
function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => showToys(data))
}

fetchToys()

function showToys(toys) {
  const toyCollection = document.querySelector("#toy-collection")
  toys.forEach(showCreatedToy)
}

//step 4: display a newly created toy
// Wire up the add new toy button (add event listener)

let form = document.querySelector(".add-toy-form")
form.addEventListener('submit', event => {
  event.preventDefault()
  let name = event.target.name.value
  let image = event.target.image.value
  appendToy(name, image)
})

//write the function which is called by the form's submit button (post, backend)

function appendToy(name, image, likes) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  })
  .then(resp => resp.json())
  .then(data => showCreatedToy(data))
}

//write the showCreatedToy method which actually displays the added toy on the page (frontend)

const toyCollection = document.querySelector("#toy-collection")

function showCreatedToy(toy) {
  toyCollection.innerHTML +=
    `
    <div id="toy-${toy.id}" class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p id="toy-like-number-${toy.id}" >${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
    `
    setTimeout(() => {
      toyCollection
        .querySelector("#toy-"+toy.id)
        .addEventListener("click", event => {
          console.log(toy)
          if (event.target.className === "like-btn") {
            toy.likes += 1
            const numberOfToysLikes = document.querySelector(`#toy-like-number-${toy.id}`)

            numberOfToysLikes.innerText = `${toy.likes} likes`
            likeToyInBackend(toy)
          }
        })
    }, 1)
}

//STEP 5: increase toy's likes

//increase the number of likes in the backend

function likeToyInBackend(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({likes: toy.likes})
  })
  .then(res => res.json())
}
