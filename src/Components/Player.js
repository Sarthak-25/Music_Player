import React , {useEffect} from "react";
//Import font awesome libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay , faAngleLeft , faAngleRight , faPause } from "@fortawesome/free-solid-svg-icons";
//import { playAudio } from "../util";
//we can't directly use the audio html tag here..instead we can use reference here
const Player = ({currentSong , isPlaying , setIsPlaying , audioRef ,setSongInfo , songInfo , songs , setCurrentSong,setSongs}) =>{
    //State
    //UseEffect
    //Add active state
    useEffect  (() =>{
        const newSongs = songs.map((song) =>{
            if(song.id === currentSong.id){
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
    },[currentSong])
    
    

    

    //play song handler
    //Event Handler
    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    

    const dragHandler = (e) =>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo , currentTime : e.target.value});
    };
    const skipTrackHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
        if(direction === 'skip-back'){
            if(currentIndex - 1 === -1){
                await setCurrentSong(songs[songs.length - 1]);
            }
            else{
                await setCurrentSong(songs[currentIndex - 1]);
            }

        }
        if(isPlaying)audioRef.current.play();
        //another way of using it
        //playAudio(isPlaying , audioRef);

    }

    //Now we want to play the song but when to pause and play will be decided on basis of isPlaying state

    //function
    const getTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>

                <input type="range"
                    min = {0}
                    max = {songInfo.duration || 0}//it is done because at the time loading it doesn't instantly load the song duration that's why there was an error(default max value)
                    value = {songInfo.currentTime}
                    onChange = {dragHandler}

                />

                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')}      className="skip-backward" size = "2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick = {playSongHandler} className="play" size = "2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')}     className="skip-forward" size = "2x" icon={faAngleRight}/>
            </div>
            
        </div>
    );
};
export default Player;