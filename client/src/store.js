import create from 'zustand'
import { devtools } from "zustand/middleware"
import { SINGLE_DIRECTORY_FILES_INFO, DIRECTORIES_NAMES, DIRECTORY_FILES_INFO } from './routes'

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

const asyncDirFilesSlice = (set) => ({
  asyncDirFiles: [],
  loadingDirFiles: true,
  fetchDirFiles: async (dir) => {
    console.log(`going thru fetchDirFiles: ${dir}`)
    const url = `${DIRECTORY_FILES_INFO}${dir}`
    console.log(`url: ${url}`)
    const response = await fetch(url)
    const dirFilesText = await response.text()
    const dirFilesJson = JSON.parse(dirFilesText)
    console.log(`json: ${JSON.stringify(dirFilesJson)}`)
    set({ asyncDirFiles: dirFilesJson, loadingDirFiles: false })
  }
})

const asyncDirsSlice = (set) => ({
  asyncDirs: [],
  dirsLoading: true,
  defaultDir: "",
  fetchDirs: async (setSelectedDir) => {
    const response = await fetch(DIRECTORIES_NAMES)
    const dirsText = await response.text()
    const dirsJson = JSON.parse(dirsText)
    set({ asyncDirs: dirsJson, defaultDir: dirsJson[0], dirsLoading: false })
    setSelectedDir(dirsJson[0])
  }
})

const rootSlice = (set, get) => ({
  ...asyncFilesSlice(set, get),
  ...asyncChuckSlice(set, get),
  ...asyncDirsSlice(set, get),
  ...asyncDirFilesSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
