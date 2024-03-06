export interface Category {
  id: number
  name: string
  imgUrl: string
  items: CategoryItem[]
}

export interface CategoryItem {
  id: number
  category: string
  isBorrowed: boolean
  name: string
  borrowedTimes: number
  borrowedDate: string | null
  returnDate: string | null
  imgUrl: string
}
export interface CategoyData {
  id: number
  name: string
  items: CategoryItem[]
}

export interface MostBorrowedItem extends CategoryItem {
  category: string
}

export interface UserResponse {
  accessToken: string
  user: User
}

export interface User {
  email: string
  id: string
  firstname: string
  lastname: string
  imgUrl: string
}
