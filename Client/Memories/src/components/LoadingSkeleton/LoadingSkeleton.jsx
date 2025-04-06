import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import './LoadingSkeleton.css'

const LoadingSkeleton = ({cards}) => {
    return (
        <div className="skeleton-container">
       {Array(cards).fill(0).map((item, index) => (
            <div key={index} className='card-skeleton'>
                <div className='skeleton-img'>
                    <Skeleton width={350} height={250} borderRadius={20} />
                </div>
                <div className='skeleton-text'>
                    <Skeleton count={4} width={350} height={13} borderRadius={4} />
                </div>

            </div>
        ))}
        </div>

    )
}

export default LoadingSkeleton