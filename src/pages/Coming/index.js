import React from 'react'
import { useParams } from 'react-router-dom'
import Header from 'components/Header'
import './style.scss'

export default function Homepage() {
    const { page } = useParams()
    return (<div className={`coming-page ${page}`}>
        <Header hideAction={true} />
        <div className="coming-text">
            COMING SOON
        </div>
    </div >)
}