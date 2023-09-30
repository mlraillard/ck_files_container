import create from 'zustand'
import { devtools } from "zustand/middleware"
import { SERVER_HOST, SERVER_PORT, FILES_DIRECTORY} from './constants'

const API_URL = `${SERVER_HOST}\:${SERVER_PORT}\/${FILES_DIRECTORY}`

const asyncChuckSlice = (set) => ({
  Chuck: null,
  chuckLoading: true,
  fetchTheChuck: async () => {
    import('../src/chuckContent/chuckSrc/wc-bundle.js').then(async (module) => { 
      set({ Chuck: module.Chuck, chuckLoading: false })
    });
  }
})

const asyncFilesSlice = (set) => ({
  asyncFiles: [],
  loading: true,
  fetchFiles: async () => {
    const response = await fetch(API_URL)
    const filesText = await response.text()
    const filesJson = JSON.parse(filesText)
    set({ asyncFiles: filesJson, loading: false })
  }
})

const rootSlice = (set, get) => ({
  ...asyncFilesSlice(set, get),
  ...asyncChuckSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
