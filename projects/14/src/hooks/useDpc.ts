import { useContext } from 'react'
import { Context } from '../contexts/DpcProvider'

const useDpc = () => {
  const { dpc } = useContext(Context)
  return dpc
}
export default useDpc
