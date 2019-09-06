import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Room from '../Room';

describe('<Room /> testing', () => {
    let fackpropsroom=
            {
                no: 1,
                adult: 1,
                childeren: 0,
                disable: false
            }
    it('check checkbox checked', () => {
        const wrapper = shallow(<Room room={fackpropsroom}/>);
        expect(wrapper.find('#checkbox').prop('checked')).toBe(true)
    });

    it('check adult dropdown value and disable props', () => {
        const wrapper = shallow(<Room room={fackpropsroom}/>);
        expect(wrapper.find('#adult').prop('value')).toBe(1)
        expect(wrapper.find('#adult').prop('disabled')).toBe(false)
    });

    it('check children dropdown value and disable props', () => {
        const wrapper = shallow(<Room room={fackpropsroom}/>);
        expect(wrapper.find('#children').prop('value')).toBe(0)
        expect(wrapper.find('#children').prop('disabled')).toBe(false)
    });
});

