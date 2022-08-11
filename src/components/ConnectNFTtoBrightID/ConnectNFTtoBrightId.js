import React from 'react';
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Swal from 'sweetalert2';


const ConnectNFTtoBrightId = (props) => {
    const { account } = useWeb3React()
    const [checked, setChecked] = useState(false);
    const handleChange = async () => {
        if (!account) {
            return Swal.fire({
                text: 'Wallet is not connected',
                timer:1500,
                icon: 'error',
                showConfirmButton: false,
            })
        }
        setChecked(!checked);
        props.isChecked(!checked)
    };

    return (
        <div>
            <div style={{display:"flex", marginBottom:"100px", marginTop:"20px"}}>
                <label style={{marginRight:"10px"}}>
                    Connect NFT to BrightID
                </label>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange} 
                />
            </div>
        </div>
    )
}

export default ConnectNFTtoBrightId
