import create from 'zustand'
import { devtools } from "zustand/middleware"
import { SERVER_HOST, SERVER_PORT} from './constants'

const CKFILES_API_URL = `${SERVER_HOST}\:${SERVER_PORT}\/ckFiles`

const asyncCkFilesSlice = (set) => ({
  asyncCkFiles: [],
  loading: true,
  fetchCkFiles: async () => {
    const response = await fetch(CKFILES_API_URL)
    const ckFilesText = await response.text()
    const ckFilesJson = JSON.parse(ckFilesText)
    set({ asyncCkFiles: ckFilesJson, loading: false })
  }
})

const rootSlice = (set, get) => ({
  ...asyncCkFilesSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
