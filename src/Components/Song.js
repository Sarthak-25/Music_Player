import React from "react";


const Song = ({currentSong}) =>{
    return (
        <div className="song-container">
            <img alt = {currentSong.name} src={currentSong.cover}  />
            <h3>{currentSong.name}</h3>
            <h4>{currentSong.artist}</h4>
        </div>
    );
};
export default Song;