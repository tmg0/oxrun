import type { createContext } from './context'

export interface Options {
  scripts: string[]
  ignore: string[]
  watch: false | string[]
}

export type OxrunContext = ReturnType<typeof createContext>
