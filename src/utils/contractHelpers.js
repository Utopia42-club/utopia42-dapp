import { MultiCall_ABI } from '../constants/ABI'
import { MULTICALL_NETWORKS } from '../constants/multicallContracts'
import { rpcConfig } from '../constants/chainsMap'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { isAddress } from './isAddress'

export const getContract = (abi, address, web3) => {
  return new web3.eth.Contract(abi, address)
}

