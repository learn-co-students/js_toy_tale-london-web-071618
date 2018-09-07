const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const toyCollectionDivElement = document.querySelector('#toy-collection')
let toyArray = []

//Toy form variables
const toyFormNameField = toyForm.querySelector('#toy-field-name')
const toyFormImageField = toyForm.querySelector('#toy-field-image')
const toyFormSubmit = toyForm.querySelector('.submit')

getToys().then( toys => {
  toyArray = toys
  appendToys(toyArray)
})

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

toyForm.addEventListener('submit', ev => {
  
  ev.preventDefault()

 
  let toyName = toyFormNameField.value
  let toyImage = toyFormImageField.value

  if (toyName === "" || toyImage === "") {
    return
  }

  createNewToy (toyName, toyImage) 

})


// OR HERE!

// Gets the toys from API
function getToys() {
   return fetch("http://localhost:3000/toys").then(resp => resp.json())
}

// Posts the toys

function appendToys (toyArray) {

  toyArray.forEach( toy => {

    createToy(toy)

  })
}

function createToy (toy) {
  
  let divElement = document.createElement('div')
      divElement.innerHTML = 
        `<div class="card" id="toy-${toy.id}">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar">
          <p>${toy.likes} Likes <p>
          <button class="like-btn">Like <3</button>
        </div>`

        toyCollectionDivElement.append(divElement)

  
    let likeButton = divElement.querySelector('.like-btn')
    likeButton.addEventListener('click', e => {
      console.log("I'm being clicked!")
      ++toy.likes
      console.log( divElement.querySelector('p').innerHTML = `${toy.likes} Likes`)
      patchToy (toy)

    })

          
}

function createNewToy (toyName, toyImage) {
  
  let divElement = document.createElement('div')
      divElement.innerHTML = 
        `<div class="card" id="toy-${++toyArray.length}">
          <h2>${toyName}</h2>
          <img src=${toyImage} class="toy-avatar">
          <p>${0} Likes <p>
          <button class="like-btn">Like <3</button>
        </div>`

  toyCollectionDivElement.append(divElement)

  let toy = {
        name: `${toyName}`,
        image: `${toyImage}`,
        likes: 0
    }

  
  let likeButton = divElement.querySelector('.like-btn')
  likeButton.addEventListener('click', e => {
    console.log("I'm being clicked!")
    ++toy.likes
    console.log( divElement.querySelector('p').innerHTML = `${toy.likes} Likes`)
    patchToy (toy)

  })

        postNewToy(toy)
}

function postNewToy (toy) {

  console.log(JSON.stringify(toy))

  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  }

  return fetch(`http://localhost:3000/toys`, options)

}

function patchToy (toy) {

  const options = {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  }

  return fetch(`http://localhost:3000/toys/${toy.id}`, options)


}

// JSON.stringify(obj) this turns json object back into a string to be passed back to the server