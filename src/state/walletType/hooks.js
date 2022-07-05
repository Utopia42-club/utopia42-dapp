import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {ADD_WALLET_TYPE, removeWalletType} from './actions'


export function useSaveWalletType() {
  return useAppSelector((state) => state.walletType)
}

export function useAddWalletType() {
  const dispatch = useAppDispatch()
  return useCallback(
    (type_) => {
      dispatch(ADD_WALLET_TYPE(type_))
    },
    [dispatch]
  )
}

export function useRemoveWalletType() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(removeWalletType())
  }, [dispatch])
}
