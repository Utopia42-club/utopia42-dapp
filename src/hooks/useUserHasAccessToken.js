import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { UNBCNFTContractAddress } from '../ContractsAddresses';

const useUserHasAccessToken = () => {
    const web3 = useWeb3()
    const hasToken = async (account, data) => {
        if (account != undefined){
            const contract = getContract(unbcNFTAbi, UNBCNFTContractAddress, web3)
            
            if (data.error) {
                return {res: false}
                // console.log(data.error)
                // const tokenId =  await contract.methods.usersTokenRegistered(account).call();
                // console.log(tokenId)
                // if(tokenId != '0'){
                //     const res =  await contract.methods.userHasRegisteredToken(account, tokenId).call();
                //     return {res: res, tokenId:tokenId, methodName: 'updateSettings'}
                // }
                // else{
                //     const res = false
                //     return {res: res, tokenId:tokenId}
                // }
            }
            else{
                let lastContextId = data.contextIds[0]
                console.log(lastContextId)
                const tokenId = await contract.methods.getUserCitizenID(account).call()
    
                const res =  await contract.methods.userHasAccessToken(account, tokenId).call();
                return {res: res, tokenId:tokenId, methodName: 'updateSettings'}
            }
            // console.log(tokenId)
            // console.log(res)
        }
    }

    return hasToken
}

export default useUserHasAccessToken