import React from 'react'
import "./playerPodiumResults.css"
import Podium from "./../assets/podium.png"
import { Avatar } from 'antd'


export default function playerPodiumResults({ avatarUrl, name, points }) {
    return (
        

        <div class="container">
            <div class="Podium">
                <img className='stage' src={Podium}></img>
            </div>
            <div class="First">
                <Avatar src={avatarUrl} />
            </div>
            <div class="Second">
                <Avatar src={avatarUrl} />
            </div>
            <div class="Third">
                <Avatar src={avatarUrl} />
            </div>
        </div>
    )
}
