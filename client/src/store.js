import create from 'zustand'
import { devtools } from "zustand/middleware"
import { DIRECTORIES_NAMES, DIRECTORY_FILES_INFO } from './routes'
import { addLabelsToDirsArray } from './utils'

const aChuckSlice = (set) => ({
  aChuck: null,
  setAChuck: (ac) => {set({ aChuck: ac })}
})

const shredIdSlice = (set) => ({
  shredId: 0,
  setShredId: (id) => {set({ shredId: id })}
})

const filenameSlice = (set) => ({
  selectedFilename: '',
  setSelectedFilename: (fn) => {set({ selectedFilename: fn })}
})

const dirSlice = (set) => ({
  selectedDir: '',
  setSelectedDir: (d) => {set({ selectedDir: d })}
})

const asyncChuckSlice = (set) => ({
  Chuck: null,
  chuckLoading: true,
  fetchTheChuck: async () => {
    import('../src/chuckContent/chuckSrc/wc-bundle.js').then(async (module) => { 
      set({ Chuck: module.Chuck, chuckLoading: false })
    });
  }
})

const asyncDirFilesSlice = (set) => ({
  asyncDirFiles: [],
  loadingDirFiles: true,
  fetchDirFiles: async (dir) => {
    const url = `${DIRECTORY_FILES_INFO}${dir}`
    const response = await fetch(url)
    const dirFilesText = await response.text()
    const dirFilesJson = JSON.parse(dirFilesText)
    set({ asyncDirFiles: dirFilesJson, loadingDirFiles: false })
  }
})

const asyncDirsSlice = (set) => ({
  asyncDirs: [],
  dirsLoading: true,
  fetchDirs: async (setSelectedDir) => {
    const response = await fetch(DIRECTORIES_NAMES)
    const dirsText = await response.text()

    //console.log(`store:text: ${dirsText}`)

    if (!dirsText.includes('Error')) {
      const dirsJson = JSON.parse(dirsText)
      const expandedJson = addLabelsToDirsArray(dirsJson)
      set({ asyncDirs: expandedJson, dirsLoading: false })
      setSelectedDir(expandedJson[0].value)
    }
  }
})

const rootSlice = (set, get) => ({
  ...aChuckSlice(set, get),
  ...shredIdSlice(set, get),
  ...dirSlice(set,get),
  ...filenameSlice(set, get),
  ...asyncChuckSlice(set, get),
  ...asyncChuckSlice(set, get),
  ...asyncDirsSlice(set, get),
  ...asyncDirFilesSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
