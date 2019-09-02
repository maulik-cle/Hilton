import React,{ useState } from 'react';
import Room from './Room';
import update from 'immutability-helper';

const Rooms = ()=> {
    const initialRoom = [
        {
            no:0,
            adult:1,
            childeren:0,
            disable:false
        },
        {
            no:1,
            adult:1,
            childeren:0,
            disable:true
        },
        {
            no:2,
            adult:1,
            childeren:0,
            disable:true
        },
        {
            no:3,
            adult:1,
            childeren:0,
            disable:true
        }
    ];

    // set room's value for  intial and on refresh.
    const [rooms, setRooms] = useState(
        JSON.parse(sessionStorage.getItem('rooms')) || initialRoom
    );
    
    /**
     * set room's adult value base on dropdown change.
     * @param {string} value 
     * @param {number} roomNumber 
     */
    const adultSelect = (value,roomNumber) =>{
        let newRooms = update(rooms, {
            [roomNumber]: {
                 adult: { $set:value}
             }
        });
        setRooms(newRooms);
    }

    /**
     * set room's childeren value base on dropdown change.
     * @param {string} value 
     * @param {number} roomNumber 
     */
    const childerenSelect = (value,roomNumber) =>{
        let newRooms = update(rooms, {
            [roomNumber]: {
                 childeren: { $set:value}
             }
        });
        setRooms(newRooms);
       
    }

    /**
     * set room's disable value base on dropdown change
     * disable all rooms after this roomNuber
     * enable all room before this roomNumber
     * @param {number} roomNumber 
     */
    const checkboxClick = (roomNumber) =>{
        setRooms(preState => {
            let newRooms = update(rooms, {
                [roomNumber]: {
                    disable: { $set: !preState[roomNumber].disable }
                }
            });

            // disable all rooms after this room 
            if(newRooms[roomNumber].disable){
                for (let i = rooms.length -1 ; i>=roomNumber; i-- ){
                    newRooms[i].childeren = 0
                    newRooms[i].adult = 1
                    newRooms[i].disable = true;
                }
            }
            // enable all room before this
            else{
                for (let i = 1; i <=roomNumber; i++ ){
                    newRooms[i].disable = false;
                }
            }
            return newRooms;
        });
    }

    /**
     * set rooms value in sessionStorage after each prop change.
     */
    const onSubit = (event)=>{
        sessionStorage.setItem('rooms', JSON.stringify(rooms));
    }
    /**
     * render room component base on rooms array
     * @param {Array} rooms 
     */
    const roomList = rooms.map((room)=>{
        return(
            <Room room={room}
                key={room.no}
                adultSelect = {adultSelect} 
                childerenSelect={childerenSelect}
                checkboxClick = {checkboxClick}/>
        );
    });

        return (
            <div>
                <div className="roomSelect">
                    {roomList}
                </div>
                <div className="button">
                    <button onClick={onSubit}> Submit </button>
                </div>
                
            </div>  
        );
}
export default Rooms;