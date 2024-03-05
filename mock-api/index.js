const { faker } = require('@faker-js/faker')
const data = { users: [], categories: [], 'featured-items': [] }

function generateCategoryItem(category) {
  const items = []

  for (let i = 0; i < 40; i++) {
    const isBorrowed = faker.datatype.boolean()
    const categoryItem = {
      id: i,
      category,
      isBorrowed,
      name: faker.commerce.product(),
      borrowedTimes: faker.number.int({ min: 0, max: 20 }),
      borrowedDate: isBorrowed ? faker.date.past() : null,
      returnDate: isBorrowed ? faker.date.future() : null,
      imgUrl: faker.image.urlPicsumPhotos(),
    }

    items.push(categoryItem)
  }

  return items
}

function generateMostBorrowedItems() {
  data.categories.forEach((cat) => {
    cat.items.forEach((catItem) => {
      if (catItem.borrowedTimes > 10) {
        data['featured-items'].push(catItem)
      }
    })
  })
}

module.exports = () => {
  for (let i = 0; i < 10; i++) {
    const user = {
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      imgUrl: faker.image.avatar(),
    }

    const category = faker.commerce.department()

    const categories = {
      id: i,
      name: category,
      imgUrl: faker.image.urlPicsumPhotos(),
      items: generateCategoryItem(category),
    }

    data.users.push(user)
    data.categories.push(categories)
  }

  generateMostBorrowedItems()

  return data
}
