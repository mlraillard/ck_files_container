import create from 'zustand'
import { devtools } from "zustand/middleware"
import { SINGLE_DIRECTORY_FILES_INFO, DIRECTORIES_NAMES } from './routes'

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
    const response = await fetch(SINGLE_DIRECTORY_FILES_INFO)
    const filesText = await response.text()
    const filesJson = JSON.parse(filesText)
    set({ asyncFiles: filesJson, loading: false })
  }
})

const asyncDirsSlice = (set) => ({
  asyncDirs: [],
  dirsLoading: true,
  fetchDirs: async () => {
    const response = await fetch(DIRECTORIES_NAMES)
    const dirsText = await response.text()
    const dirsJson = JSON.parse(dirsText)
    set({ asyncDirs: dirsJson, dirsLoading: false })
  }
})

const rootSlice = (set, get) => ({
  ...asyncFilesSlice(set, get),
  ...asyncChuckSlice(set, get),
  ...asyncDirsSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
