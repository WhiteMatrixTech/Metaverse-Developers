import { useContext } from 'react'
import { Context as FavsContext } from '../contexts/Favs'

const useFavs = () => {
  const { favs } = useContext(FavsContext)
  return [favs]
}

export default useFavs
