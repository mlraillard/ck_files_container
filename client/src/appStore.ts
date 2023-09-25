import create from 'zustand'

type State = {
    bears: number,
    increasePopulation: () => void
}

export const useAppStore = create<State>(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 }))
}))