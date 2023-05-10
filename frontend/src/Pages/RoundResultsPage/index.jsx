import React from "react";
import "./index.css";
import PlayerProfile from "../../components/player-profile";
import StartIcon from "../../assets/start-icon.png";
import placeholder from "../../assets/placeholder-img.png";
import firstMedal from "../../assets/1st.png";
import secondMedal from "../../assets/2nd.png";
import thirdMedal from "../../assets/3rd.png";

function RoundResults() {

    const styleFirst = {
        transform: "scale(1.2)"
    }

    const styleSecond = {
        transform: "scale(1)"
    }

    const styleThird = {
        transform: "scale(0.8)"
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <h1>Round # Results</h1>
            </div>

            <div className="first-place">
                <div className="first-image">
                    <PlayerProfile style={styleFirst} picture={placeholder} name={"aden"} random="false" />
                </div>
                <img className="first-medal" src={firstMedal} />
                <p>Placeholder Text Placeholder Text  Placeholder Text Placeholder Text Placeholder Text Placeholder Text Placeholder Text Placeholder Text </p>
            </div>

            <div className="second-place">
                <div className="second-image">
                    <PlayerProfile style={styleSecond} picture={placeholder} name={"aden"} random="false" />
                </div>
                <img className="second-medal" src={secondMedal} />
                <p>Placeholder Text</p>
            </div>

            <div className="third-place">
                <div className="third-image">
                    <PlayerProfile style={styleThird} picture={placeholder} name={"aden"} random="false" />
                </div>
                <img className="third-medal" src={thirdMedal} />
                <p>Placeholder Text</p>
            </div>

            <div className="page-footer">
                <h1>Timer goes here</h1>
            </div>
        </div>
    );
}

export default RoundResults;
