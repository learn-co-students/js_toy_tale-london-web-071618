const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitToyForm = document.getElementsByClassName('add-toy-form')[0]
const submitToyButton = submitToyForm.lastElementChild
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

submitToyForm.addEventListener('submit', function(event){
    event.preventDefault();    //stop form from submitting
    console.log("form here")
    let userGivenName = document.getElementsByClassName('input-text')[0].value
    let userGivenImg = document.getElementsByClassName('input-text')[1].value
    let postData = [userGivenName, userGivenImg, 0]
    addNewToy(postData)
    location.reload();
})

//   e.preventDefault();

//   console.log(postData)
// })

function makeCard(obj) {
  let newDiv = document.createElement('div')
  newDiv.className = "card"
  newDiv.innerHTML = `<h2>${obj.name}</h2><img src=${obj.image} class="toy-avatar" /><p>Likes: ${obj.likes}</p><button class="like-btn" onclick="addLike(this, ${obj.id})">Like <3</button>`
  document.getElementById('toy-collection').appendChild(newDiv)
}

function addLike(element, objId) {
    let currentLikes = parseInt(element.previousElementSibling.innerText.split(" ")[1]) + 1
    element.previousElementSibling.innerText = `Likes: ${currentLikes}`
    console.log(currentLikes)
    likePatch(currentLikes, objId)
}

function likePatch(objLikes, objId) {
  fetch(`http://localhost:3000/toys/${objId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
    {likes: objLikes}
    )
  }).then(res => res.json()).
  then(json => console.log(json))
}

function getToys() {
  const repo = 'http://localhost:3000/toys';
fetch(repo, {
  method: 'GET',
}).then(res => res.json()).
  then(json => json.forEach(obj => makeCard(obj)))
}

function addNewToy(postData) {
  console.log(postData)
  let toyName = postData[0]
  let toyImg = postData[1]
  let toyLikes = postData[2]
  const repo = 'http://localhost:3000/toys';
  fetch(repo, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    name: toyName,
    image: toyImg,
    likes: toyLikes
    })
  }).then(res => res.json()).
    then(json => makeCard(json))
}

getToys()





// OR HERE!
