import React from "react";
//import { playAudio } from "../util";
const LibrarySong = ({song , setCurrentSong , songs , id , key , isPlaying , audioRef ,setSongs}) =>{
    const songSelectHandler = async () =>{
        const selectedSong = songs.filter((state) => state.id === id);
        await setCurrentSong(selectedSong[0]);
        //Add active state
        const newSongs = songs.map((song) =>{
            if(song.id === id){
                return{
                    ...song,
                    //keep the remaining properties same just change the active state of it.
                    active : true,
                }
            }
            else{
                return {
                    ...song,
                    active : false,
                }
            }
        });
        setSongs(newSongs);
        //check if the song is playing
        if(isPlaying)audioRef.current.play();
        //playAudio(isPlaying , audioRef);
    }
    return (
        
        <div onClick = {songSelectHandler} className={`Library-song ${song.active ? "selected" : ""}`}>
            <img alt = {song.name} src={song.cover}  />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            
        </div>
    );
};
export default LibrarySong;