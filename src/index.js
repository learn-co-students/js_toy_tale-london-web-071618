  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false
  let listOfToys = new ToyList()

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

  toyForm.addEventListener("submit", (e) =>{
    e.preventDefault();
      let inputs = document.querySelectorAll(".input-text")
      let newToy = new Toy({name: inputs[0].value, image: inputs[1].value})
      newToy.postToy()
    } )
