import { createContext } from 'react'
import { FavsContext } from './types'

const context = createContext<FavsContext>({
  favs: [],
})

export default context
