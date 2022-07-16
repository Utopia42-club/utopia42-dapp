import { settingAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { settingContractAddress } from '../ContractsAddresses'

const useGetAvatarLink = () => {
    const web3 = useWeb3()
    const getAvatarLink = async (account) => {
        const contract = await getContract(settingAbi, settingContractAddress, web3)
        const avatarLink = await contract.methods.userInfo(account, ['avatar']).call()
        console.log(avatarLink)
        return avatarLink[0]
    }

    return getAvatarLink
}

export default useGetAvatarLink