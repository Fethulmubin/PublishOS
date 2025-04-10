import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

const CommentLoad = () => {
return (
    Array(5).fill(0).map((i, index) =>(
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Skeleton circle={true} height={40} width={40} style={{ marginRight: '1rem' }} />
        <div style={{ flex: 1 }}>
            <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={10} width="80%" />
        </div>
    </div>
    ))
 
)
}

export default CommentLoad