const fs = require('fs')
const { faker } = require('@faker-js/faker')

const defaultUser = {
  id: '0',
  email: 'powder@arcane.com',
  password: '$2a$10$2WwIIqWtUP1oRwW26uLy.u3AOe19qnORfAAfV3W6VJUv0S/DbxsJe',
  firstname: 'Powder',
  lastname: 'Jinx',
  imgUrl: 'https://i.pinimg.com/474x/b4/44/06/b44406b163f1e54aa7408fb86d31bfb1.jpg',
}

const data = {
  categories: [],
  'featured-items': [],
  users: [defaultUser],
}

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

function generateData() {
  for (let i = 0; i < 10; i++) {
    // const user = {
    //   id: i,
    //   name: faker.person.fullName(),
    //   email: faker.internet.email(),
    //   imgUrl: faker.image.avatar(),
    // }

    const category = faker.commerce.department()

    const categories = {
      id: i,
      name: category,
      imgUrl: faker.image.urlPicsumPhotos(),
      items: generateCategoryItem(category),
    }

    // data.users.push(user)
    data.categories.push(categories)
  }

  generateMostBorrowedItems()

  fs.writeFileSync('db.json', JSON.stringify(data), (err) => {
    if (err) throw err

    console.log('Done writing')
  })

  return data
}

generateData()
