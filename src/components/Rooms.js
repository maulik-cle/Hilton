import React from 'react';
import Room from './Room';
import update from 'immutability-helper';

class Rooms extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: [
                {
                    no: 0,
                    adult: 1,
                    childeren: 0,
                    disable: false
                },
                {
                    no: 1,
                    adult: 1,
                    childeren: 0,
                    disable: true
                },
                {
                    no: 2,
                    adult: 1,
                    childeren: 0,
                    disable: true
                },
                {
                    no: 3,
                    adult: 1,
                    childeren: 0,
                    disable: true
                }
            ]
        }
    }

    /**
     * Set state if we already store rooms value in session storage.
     */
    componentDidMount(){
        if(sessionStorage.getItem('rooms')){
            this.setState({rooms:JSON.parse(sessionStorage.getItem('rooms'))});
        }
    }

    /**
     * set room's adult value base on dropdown change.
     * @param {string} value 
     * @param {number} roomNumber 
     */
    adultSelect = (value, roomNumber) => {
        let newRooms = update(this.state.rooms, {
            [roomNumber]: {
                adult: { $set: value }
            }
        });
        this.setState({ rooms: newRooms });
    }

    /**
     * set room's childeren value base on dropdown change.
     * @param {string} value 
     * @param {number} roomNumber 
     */
    childerenSelect = (value, roomNumber) => {
        let newRooms = update(this.state.rooms, {
            [roomNumber]: {
                childeren: { $set: value }
            }
        });
        this.setState({ rooms: newRooms });
    }

    /**
     * set room's disable value base on dropdown change
     * disable all rooms after this roomNuber
     * enable all room before this roomNumber
     * @param {number} roomNumber 
     */
    checkboxClick = (roomNumber) => {
        let newRooms = update(this.state.rooms, {
            [roomNumber]: {
                disable: { $set: !this.state.rooms[roomNumber].disable }
            }
        });

        // disable all rooms after this room 
        if (newRooms[roomNumber].disable) {
            for (let i = this.state.rooms.length - 1; i >= roomNumber; i--) {
                newRooms[i].childeren = 0
                newRooms[i].adult = 1
                newRooms[i].disable = true;
            }
        }
        // enable all room before this
        else {
            for (let i = 1; i <= roomNumber; i++) {
                newRooms[i].disable = false;
            }
        }
        this.setState({ rooms: newRooms });
    }

    /**
     * set rooms value in sessionStorage after each prop change.
     */
    onSubit = (event) => {
        sessionStorage.setItem('rooms', JSON.stringify(this.state.rooms));
    }

    render() {
        /**
         * render room component base on rooms array
         * @param {Array} rooms 
         */
            const roomList = this.state.rooms.map((room)=>{
                return (
                    <Room room={room}
                        key={room.no}
                        adultSelect={this.adultSelect}
                        childerenSelect={this.childerenSelect}
                        checkboxClick={this.checkboxClick} />
                );
            })
        return (
            <div>
                <div className="roomSelect">
                    {roomList}
                </div>
                <div className="button">
                    <button onClick={this.onSubit}> Submit </button>
                </div>

            </div>
        );
    }
}
export default Rooms;