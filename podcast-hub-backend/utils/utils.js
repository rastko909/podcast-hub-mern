const faker = require('faker')

let genres = [ 'comedy', 'drama', 'thriller', 'action']

const createThisManyFakeBooks = (numberOfBooks) => {
  let books = []
  for(i = 0; i < numberOfBooks; i++){
    let randomNum = Math.floor(Math.random() * 4)
    let newBook = {
      id: i + 1,
      title: faker.random.words(),
      genre: genres[randomNum],
      author: faker.name.findName(),
      price: (faker.finance.amount() / 10).toFixed(2)
    }
    books.push(newBook)
  }
  return books
}

module.exports = {
  createThisManyFakeBooks
}
