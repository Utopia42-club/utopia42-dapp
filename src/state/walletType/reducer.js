import { createReducer } from '@reduxjs/toolkit'
import {
  ADD_WALLET_TYPE,
  removeWalletType
} from './actions'

const initialState = {
  type_: {}
}

export default createReducer(initialState, (builder) => {
  // add  wallet type
  builder.addCase(ADD_WALLET_TYPE, (state, action) => {
    console.log(action.payload)
    return { ...state, type_: action.payload }
  })


  // remove bridge
  builder.addCase(removeWalletType, () => {
    return {
      type_: {},
    }
  })
})
