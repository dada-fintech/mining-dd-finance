import React from 'react'
import './style.scss'

const commentsList = [
    {
        id: 1,
        address: '0x987...324f',
        description: `PIP-3 voted with 1,579 DUSD`,
        date: 'October 03, 2020'
    },
    {
        id: 2,
        address: '0x987...324f',
        description: `PIP-3 voted with 1,579 DUSD`,
        date: 'October 03, 2020'
    },
    {
        id: 3,
        address: '0x987...324f',
        description: `PIP-3 voted with 1,579 DUSD`,
        date: 'October 03, 2020'
    },


]

export default function Comments() {

    return (<div className="comments-module">
        {commentsList.map(item => (
            <div className="comment-item">
                <div className="top">
                    <div className="id">
                        #{item.id}
                    </div>
                    <div className="address">
                        {item.address}
                    </div>
                </div>
                <div className="description">
                    {item.description}
                </div>
                <div className="date">
                    {item.date}
                </div>
            </div>
        ))}
    </div>)
}
