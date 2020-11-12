import React from 'react'
import './style.scss'

export default function VoteStatus(props) {
    const { approve, object } = props
    return (
        <div className="vote-status">
            <div className="votes-bar">
                <div className="approve" style={{ width: (approve / (approve + object)) * 100 + '%' }}></div>
                <div className="object" style={{ width: (object / (approve + object)) * 100 + '%' }}></div>
            </div>
            <div className="votes-analyze">
                <div>
                    {approve} approve
        </div>
                <div>
                    {object} object
        </div>
            </div>
        </div>

    )
}