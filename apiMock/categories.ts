export interface Category {
  id: number
  name: string
  imgUrl?: string
}

export interface CategoyData {
  id: number
  name: string
  items: CategoryItem[]
}

export interface CategoryItem {
  id: number
  name: string
  isBorrowed: boolean
  borrowedDate: number | null
  returnDate: number | null
  imgUrl?: string
}

export interface MostBorrowedItem extends CategoryItem {
  category: string
}

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Games',
    imgUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    name: 'Tech',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1681426669771-d2113672a49b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFyZHdhcmV8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'Real state',
    imgUrl:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMHN0YXRlfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    name: 'Vehicles',
    imgUrl:
      'https://images.unsplash.com/photo-1630165356623-266076eaceb6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlaGljbGVzfGVufDB8fDB8fHww',
  },
  {
    id: 5,
    name: 'Gardening',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1679681351799-24e563512cc9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FyZGVuaW5nfGVufDB8fDB8fHww',
  },
  {
    id: 6,
    name: 'Books',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJvb2tzfGVufDB8fDB8fHww',
  },
]

export const MOST_BORROWED: MostBorrowedItem[] = [
  {
    id: 1,
    category: 'Tech',
    name: 'MacBook Pro 2021',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,},
  {
    id: 2,
    category: 'Tech',
    name: 'Razer DeathAdder Mouse',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
    imgUrl:
      'https://images.unsplash.com/photo-1705332112231-4dff35a9587c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmF6ZXIlMjBtb3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 3,
    category: 'Tech',
    name: 'Custom keyboard',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
    imgUrl:
      'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGtleWJvYXJkfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    category: 'Tech',
    name: 'HyperX Mic',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
    imgUrl:
      'https://images.unsplash.com/photo-1590602846581-7d3eec520d07?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pY3xlbnwwfHwwfHx8MA%3D%3D',
  },
]

export const TECH_ITEMS: CategoryItem[] = [
  {
    id: 1,
    name: 'MacBook Pro 2021',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
    imgUrl:
      'https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 2,
    name: 'PC Gamer',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
  },
  {
    id: 3,
    name: 'Razer DeathAdder Mouse',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
  },
  {
    id: 4,
    name: 'HyperX Mic',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
  },
  {
    id: 5,
    name: 'Custom Keyboard',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
  },
  {
    id: 6,
    name: 'Alexa 10"',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 7,
    name: 'Alexa 8"',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 8,
    name: 'Sound card',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 9,
    name: 'RTX 4090',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 10,
    name: 'Logitech speakers',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 11,
    name: 'HDMI cable',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 12,
    name: 'USB cable extension',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 13,
    name: 'Printer HP 420X',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 14,
    name: 'Asus router',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 15,
    name: 'VGA cable',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
]

export const GAMES_ITEMS: CategoryItem[] = [
  {
    id: 1,
    name: 'League of Legends',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 2,
    name: 'World of Warcraft',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
  {
    id: 3,
    name: 'Test game 3',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
  },
  {
    id: 4,
    name: 'Test game 4',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
  },
  {
    id: 5,
    name: 'Test game 5',
    isBorrowed: true,
    borrowedDate: 1704697200,
    returnDate: 1725778800,
  },
  {
    id: 6,
    name: 'Test game 6',
    isBorrowed: false,
    borrowedDate: null,
    returnDate: null,
  },
]

export const CATEGORY_DATA: CategoyData[] = [
  {
    id: 1,
    name: 'Games',
    items: GAMES_ITEMS,
  },
  {
    id: 2,
    name: 'Tech',
    items: TECH_ITEMS,
  },
]
