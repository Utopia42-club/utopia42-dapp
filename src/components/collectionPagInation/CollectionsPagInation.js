import { useState } from 'react'
import { useEffect } from 'react'
import {Button} from './btn.style'

const CollectionsPagInation = (props) => {
    const {
        totalVerses, 
        pagInationItems, 
        lastCreateTime,
        pageNumber
    } = props

    const totalPages =  totalVerses / 5


    const checkThis = () => { 
        console.log('ok')
    }

    window.addEventListener('click', checkThis )

    
    const increase = (pageNumber) => {
        // console.log(pageNumber, totalPages)
        pagInationItems(lastCreateTime, 'createdAt_gt', pageNumber)
    }

    const decrease = (pageNumber) => {
        // console.log(pageNumber)
        pagInationItems(lastCreateTime, 'createdAt_lt', pageNumber)
    }

    let btn = [];


    return (
        <>
            <div className="pagInation">
               {/* { 
                    pageNumber > 1 ?
                    <Button
                        onClick={() => {decrease(pageNumber-1)}}
                    > More
                    </Button>
                    :
                    <Button
                        
                    > {'<'}
                    </Button>
                } */}

               {/* { 
                    pageNumber < totalPages ?
                    <button className='profile-btn'
                        onClick={() => {increase(pageNumber+1)}}
                    > More
                    </button>
                    :
                    ''
                    <Button 
                    > More
                    </Button>
                } */}
            </div>
        </>
    )

}
export default CollectionsPagInation