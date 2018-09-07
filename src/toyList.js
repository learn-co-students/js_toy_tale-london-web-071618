class ToyList {

  constructor(){
    this.allToys = []
    this.getAllToys()
  }

  appendAllToys() {
    this.allToys.forEach(toy => toy.appendToy())
  }

  getAllToys() {
      return fetch('http://localhost:3000/toys')
        .then(resp => resp.json())
        .then(toys => {
            const toyInstances = toys.map(toy => new Toy(toy))
            this.allToys = toyInstances
        })
        .then(() => this.appendAllToys() )
  }

}
