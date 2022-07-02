import { settingAbi } from '../ABI/ABI'
import {settingContractAddress} from '../ContractsAddresses'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'

const useUpdateSetting = () => {
  const web3 = useWeb3()
  const updateSetting = async (address, keys, values) => {
    const contract = getContract(settingAbi, settingContractAddress, web3)
    console.log(contract)
    console.log(address, keys, values)
    const tokenId = await contract.methods.userToken(address).call()

    if (tokenId == '0'){
      console.log('not Registered')
      // return
    }

    console.log(contract)
    if (!contract) {
      console.error('contract is null')
      return
    }
  
    return sendTransaction(
      contract,
      'updateSettings',
      [tokenId, keys, values],
      address,
    )
  }

  return updateSetting
}

export default useUpdateSetting
