let toyId = 0

class Toy {
  constructor(obj){
    this.id = ++toyId
    this.name = obj.name
    this.image = obj.image
    this.likes = (obj.likes) ? obj.likes : 0;
  }


  patchLike() {
    fetch(`http://localhost:3000/toys/${this.id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({likes: this.likes})
      })
        .then(res => res.json())
        .then()
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
  }

  appendToy() {
    //add base card
    const collection = document.querySelector('#toy-collection')
    const container = document.createElement("div")
      container.className = "card"
      container.innerHTML = `<h2>${this.name}</h2> <img src=${this.image} class="toy-avatar"> <p id="p${this.id}" class="${this.id}">${this.likes} Likes <p> <button id="btn${this.id}" class="like-btn ${this.id}btn">Like <3</button>`
      collection.append(container)

    //add like button and update card and call patch to server
    const likeBtn = document.querySelector(`#btn${this.id}`)
    const ptag = document.querySelector(`#p${this.id}`)
      likeBtn.addEventListener("click", event => {
        ++this.likes;
        ptag.innerText = `${this.likes} Likes`
        this.patchLike()
      })
  }

  postToy(){
    let thisToy = {name: this.name, image: this.image, likes: this.likes}
      return fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(thisToy)
      })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))
      .then(this.appendToy());
  }

}
