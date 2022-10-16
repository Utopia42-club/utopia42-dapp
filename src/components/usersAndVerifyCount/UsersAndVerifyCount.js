import React, { useEffect, useState } from 'react'
import useCitizenIDVerifications from '../../hooks/useCitizenIDVerifications'
import useGetTotalSupply from '../../hooks/useGetTotalSupply'

const UsersAndVerifyCount = () => {
  const [citizenIDVerifications, setCitizenIDVerifications] = useState()
  const [totalSupply, setTotalSupply] = useState()
  const itemsCount = useCitizenIDVerifications()
  const getTotalSupply = useGetTotalSupply()

  const getCount = async () => { 
    setCitizenIDVerifications(await itemsCount());
    setTotalSupply(await getTotalSupply());
  }

  useEffect(() => {
    getCount()
  }, [])

  return (
      <>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%', marginTop:'20px', color:'#814f8c', borderTop:'2px solid #fff', textAlign:'left'}}>
          <div style={{display:'flex', columnGap: '5px', marginTop:'10px', alignItems:'left', justifyContent:'left',minWidth:'150px'}}>
              Utopia42 Citizens:
              <div>
                {totalSupply}
              </div>
          </div>
          <div style={{display:'flex', columnGap: '5px',alignItems:'center', justifyContent:'left',minWidth:'150px'}}>
            Verified Citizens:
            <div>
              {citizenIDVerifications}
            </div>
          </div>
        </div>
      </>

  )
}

export default UsersAndVerifyCount
