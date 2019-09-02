import React from 'react';

const Room = (props) => {
    /**
     * call parent component method to update adult state.
     * @param {Object} event 
     */
    const adultSelect = (event) =>{
        props.adultSelect(event.target.value, props.room.no);
    }

    /**
     * call parent component method to update children state.
     * @param {Object} event 
     */
    const childerenSelect = (event) =>{
        props.childerenSelect(event.target.value, props.room.no);
    }
    
    /**
     * call parent component method to update disable state.
     * @param {Object} event 
     */
    const checkboxClick = (event) =>{
        props.checkboxClick(props.room.no);
    }
        return (
            <div className={"room " + (props.room.disable?"disable":"")}> 
                <div className={"checkbox " + (props.room.disable?"disable":"")}>
                {props.room.no !==0 ? 
                    (<input 
                        type='checkbox' 
                        name='Room' 
                        onChange={checkboxClick} 
                        checked = {!props.room.disable
                        }/>):'' 
                }
                <span> Rooms {props.room.no + 1}</span>
                </div>

                <div>
                    <div className="dropdown">
                        <p> adults</p>
                        <p> (18+)</p>
                        <select onChange={adultSelect} 
                                value={props.room.adult} 
                                disabled={props.room.disable}>
                            <option value="1"> 1</option>
                            <option value="2"> 2</option>
                        </select>
                    </div>
                    <div  className="dropdown">
                        <p> childeren</p>
                        <p> (0-17)</p>
                        <select onChange={childerenSelect} 
                                value={props.room.childeren} 
                                disabled={props.room.disable}>
                            <option value="0"> 0</option>    
                            <option value="1"> 1</option>
                            <option value="2"> 2</option>
                        </select>    
                    </div>
                </div>
            </div>
        );
}
export default Room;