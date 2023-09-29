import create from 'zustand'
import { devtools } from "zustand/middleware"
import { SERVER_HOST, SERVER_PORT} from './constants'

const CKFILES_API_URL = `${SERVER_HOST}\:${SERVER_PORT}\/ckFiles`

const asyncChuckSlice = (set) => ({
  Chuck: null,
  chuckLoading: true,
  fetchTheChuck: async () => {
    import('../src/chuckContent/chuckSrc/wc-bundle.js').then(async (module) => { 
      set({ Chuck: module.Chuck, chuckLoading: false })
    });
  }
})

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
  ...asyncChuckSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
