import React from 'react';

class Room extends React.Component {
    constructor(props){
        super(props);
    }
    /**
         * call parent component method to update adult state.
         * @param {Object} event 
         */
    adultSelect = (event) => {
        this.props.adultSelect(event.target.value, this.props.room.no);
    }

    /**
     * call parent component method to update children state.
     * @param {Object} event 
     */
    childerenSelect = (event) => {
        this.props.childerenSelect(event.target.value, this.props.room.no);
    }

    /**
     * call parent component method to update disable state.
     * @param {Object} event 
     */
    checkboxClick = (event) => {
        this.props.checkboxClick(this.props.room.no);
    }

    render() {
        return (
            <div className={"room " + (this.props.room.disable ? "disable" : "")}>
                <div className={"checkbox " + (this.props.room.disable ? "disable" : "")}>
                    {this.props.room.no !== 0 ?
                        (<input
                            id='checkbox'
                            type='checkbox'
                            name='Room'
                            onChange={this.checkboxClick}
                            checked={!this.props.room.disable
                            } />) : ''
                    }
                    <span> Rooms {this.props.room.no + 1}</span>
                </div>

                <div>
                    <div className="dropdown">
                        <p> adults</p>
                        <p> (18+)</p>
                        <select id="adult"
                            onChange={this.adultSelect}
                            value={this.props.room.adult}
                            disabled={this.props.room.disable}>
                            <option value="1"> 1</option>
                            <option value="2"> 2</option>
                        </select>
                    </div>
                    <div className="dropdown">
                        <p> childeren</p>
                        <p> (0-17)</p>
                        <select id="children"
                            onChange={this.childerenSelect}
                            value={this.props.room.childeren}
                            disabled={this.props.room.disable}>
                            <option value="0"> 0</option>
                            <option value="1"> 1</option>
                            <option value="2"> 2</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
export default Room;