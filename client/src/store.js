import create from 'zustand'
import { devtools } from 'zustand/middleware'
import Deque  from 'double-ended-queue'
import { DIRECTORIES_NAMES, DIRECTORY_FILES_INFO } from './routes'
import { MAX_TRACKS } from './constants.js'
import { addLabelsToDirsArray } from './utils'

const q = new Deque(MAX_TRACKS);
// let activeDirFilenames = [];
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
  console.log(`q after ${command}: ${JSON.stringify(q.toArray())}`)
}

/*
track = {
  shredId: id, //string
  filename: 'fn', //string
  dir: 'dir' //string
}
*/
const qSlice = (set) => ({
  activeDirFilenames: [],
  setActiveDirFilenames: () => {
    set({
      activeDirFilenames: (q.toArray()).map(obj => `${obj.dir} ${obj.filename}`)
    })
    // console.log(`st.activeDirFilenames: ${JSON.stringify(activeDirFilenames)}`)
  },
  print: () => {
    console.log(`st.activeDirFilenames: ${JSON.stringify(activeDirFilenames)}`)
  },
  addActiveDirFilename: (dirFilename) => {
    activeDirFilenames.push(dirFilename)
    //qAfter('add one')
    console.log(`add1: ${JSON.stringify(activeDirFilenames)}`)
  },
  removeActiveDirFilename: (dirFilename) => {
    const index = activeDirFilenames.findIndex(dirFilename)
    activeDirFilenames.splice(index, 1)
    //qAfter('rmv one')
    console.log(`rmv1: ${JSON.stringify(activeDirFilenames)}`)
  },
  getActiveDirFilenames: () => { return activeDirFilenames },
  qPush: (sel) => { 
    q.push(sel); 
    //qAfter('push')
    // activeDirFilenames.push(dirFilename)
  },
  trackByDirAndFilename: (dr, fn) => {
    console.log(`q: ${q}`)
    console.log(`arr: ${q.toArray}`)
    //return q.toArray().find((o) => o.dir === dr && o.filename === fn) 
  },
  removeByDirAndFilename: (dr,fn) => {
    const arr = q.toArray()
    const track = arr.find((o) => o.dir === dr && o.filename === fn )
    if (track) {
      track.aChuck.removeLastCode()
      const newArray = arr.filter(obj => obj !== track)
      q.clear()
      q.push(newArray)
      //qAfter('remove')

      // const index = activeDirFilenames.findIndex(`${dr} ${fn}`)
      // activeDirFilenames.splice(index, 1)
    }
  },
})

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

    if (!dirsText.includes('Error')) {
      const dirsJson = JSON.parse(dirsText)
      const expandedJson = addLabelsToDirsArray(dirsJson)
      set({ asyncDirs: expandedJson, dirsLoading: false })
      setSelectedDir(expandedJson[0].value)
    }
  }
})

const rootSlice = (set, get) => ({
  ...qSlice(set, get),
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
