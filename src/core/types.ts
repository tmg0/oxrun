import type { createContext } from './context'

export interface Options {
  scripts: string[]
  watch: false | string | string[]
}

export type OxrunContext = ReturnType<typeof createContext>
