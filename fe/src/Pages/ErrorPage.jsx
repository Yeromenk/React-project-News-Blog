import React from 'react'
import { Navigation } from './UIComponents.js'
export default function ErrorPage() {
    return (
        <>
            <Navigation />
            <div className={'text-center'}>
                <h1>Error: requested content can not be found</h1>
            </div>
        </>
    )
}
