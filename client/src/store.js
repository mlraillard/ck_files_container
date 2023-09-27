import create from 'zustand'
import { devtools } from "zustand/middleware"

const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos'

const asyncTodosSlice = (set) => ({
  asyncTodos: [],
  loading: true,
  fetchTodos: async () => {
    const response = await fetch(TODOS_API_URL)
    set({ asyncTodos: await response.json(), loading: false })
  }
})

const rootSlice = (set, get) => ({
  ...asyncTodosSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
