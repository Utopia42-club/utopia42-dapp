import { settingAbi } from '../ABI/ABI'
import {settingContractAddress} from '../ContractsAddresses'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
// import useUserHasAccessToken from './useUserHasAccessToken'
// import Swal from 'sweetalert2'
// import useBrightIdApi from './useBrightIdApi'

const useUpdateSetting = () => {
  const web3 = useWeb3()
  // const hasToken = useUserHasAccessToken()
  // const brightIdData = useBrightIdApi()
  let status = 'Updated'
  const updateSetting = async (address, keys, values, citizenID) => {
    // console.log(address, keys, values, citizenID)
    // let data = await brightIdData()
    const contract = getContract(settingAbi, settingContractAddress, web3)
    // console.log(contract)
    // console.log(address, keys, values)
    // const tokenId = await contract.methods.userToken(address).call()
    // let res = await hasToken(address, data)
    // console.log(res.res)
    // if(!res.res){
    //   return Swal.fire({
    //     text: "You can't update avatar",
    //     icon: 'error',
    //     showConfirmButton: false,
    //     timer: 2500
    //   })
    // }
    // console.log(contract)
    if (!contract) {
      console.error('contract is null')
      return
    }
  
    // console.log(res.methodName, citizenID, keys, values)
    return sendTransaction(
      status,
      contract,
      'updateSettings',
      [citizenID, keys, values],
      address,
    )
  }

  return updateSetting
}

export default useUpdateSetting
