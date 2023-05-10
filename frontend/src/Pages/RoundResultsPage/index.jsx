import React from "react";
import "./index.css";
import PlayerProfile from "../../components/player-profile";
import StartIcon from "../../assets/start-icon.png";
import placeholder from "../../assets/placeholder-img.png";
import firstMedal from "../../assets/1st.png";
import secondMedal from "../../assets/2nd.png";
import thirdMedal from "../../assets/3rd.png";

function RoundResults() {

    {/* <PlayerProfile picture={StartIcon} name={"aden"} random="false" /> */ }
    return (
        <div className="page-container">

            <div className="page-header">
                <h1>Round # Results</h1>
            </div>

            <div className="first-place">
                <PlayerProfile picture={placeholder} name={"aden"} random="false" />
                <p>Placeholder Text</p>
                <img className="first-medal" src={firstMedal}/>
            </div>

            <div className="second-place">
                <PlayerProfile picture={placeholder} name={"aden"} random="false" />
                <p></p>
                <img className="second-medal"src={secondMedal}/>
            </div>

            <div className="third-place">
                <PlayerProfile picture={placeholder} name={"aden"} random="false" />
                <p></p>
                <img className="third-medal"src={thirdMedal}/>
            </div>

            <div className="page-footer">
                <h1>test</h1>
            </div>
        </div>
    );
}

export default RoundResults;
