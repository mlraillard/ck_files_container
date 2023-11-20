import create from 'zustand'
import { devtools } from 'zustand/middleware'
import Deque  from 'double-ended-queue'
import structuredClone from '@ungap/structured-clone';
import { DIRECTORIES_NAMES, DIRECTORIES_LABELS, DIRECTORY_FILES_INFO } from './routes'
import { MAX_TRACKS } from './constants.js'

const q = new Deque(MAX_TRACKS);
/*
Deque functions:

push(dynamic items...)
unshift(dynamic items...)
pop()
shift()
toArray()
peekBack()
peekFront()
get(int index)
isEmpty()
clear()
*/

function qAfter(command) {
  console.log(`q after ${command}: ${JSON.stringify(q.toArray(), null, 2)}`)
}

const qSlice = (set) => ({
  activeDirFilenames: [],
  selectedFilename: '',
  associatedDir: '',
  associatedDirCount: -1,
  setSelectedFilename: () => {
    const track = q.peekBack()
    if (track) {
      set({
        selectedFilename: track.filename,
        associatedDir: track.dir,
        associatedDirCount: track.associatedDirCount
      })
    }
    else {
      set({
        selectedFilename: '',
        associatedDir: '',
        associatedDirCount: -1
      })
    }
  },
  setActiveDirFilenames: () => {
    set({
      activeDirFilenames: (q.toArray()).map(obj => `${obj.dir} ${obj.filename}`)
    })
  },
  resetActiveDirFilenames: (cArray, cDir, cFilename) => {
    const s = `${cDir} ${cFilename}` + ''
    const index = cArray.findIndex(function(o) {return o === s})
    cArray.splice(index, 1)
    set({
      activeDirFilenames: cArray.length === 0 ? [] : cArray
    })
  },
  qPush: (sel) => { q.push(sel) },
  removeByDirAndFilename: (dr,fn) => {
    const arr = q.toArray()
    const track = arr.find((o) => o.dir === dr && o.filename === fn )
    if (track) {
      track.aChuck.removeLastCode()
      const newArray = arr.filter(obj => obj !== track)
      q.clear()
      for (const element of newArray) {q.push(element)}
    }
  },
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
  asyncDirsX: [],
  dirsLoading: true,
  fetchDirs: async (setSelectedDir) => {
    const response = await fetch(DIRECTORIES_NAMES)
    const labelsResponse = await fetch(DIRECTORIES_LABELS)
    const dirsText = await response.text()
    const labelsResponseText = await labelsResponse.text()

    if (!dirsText.includes('Error')) {
      const dirsJson = JSON.parse(dirsText)
      let ad = JSON.parse(labelsResponseText)
      let tempX = structuredClone(JSON.parse(labelsResponseText))
      set({
        asyncDirs: ad,
        asyncDirsX: tempX,
        dirsLoading: false
      })
      setSelectedDir(ad[0].value)
    }
  }
})

const rootSlice = (set, get) => ({
  ...qSlice(set, get),
  ...dirSlice(set,get),
  ...asyncChuckSlice(set, get),
  ...asyncChuckSlice(set, get),
  ...asyncDirsSlice(set, get),
  ...asyncDirFilesSlice(set, get),
})

export const useStore = create(devtools(rootSlice))
