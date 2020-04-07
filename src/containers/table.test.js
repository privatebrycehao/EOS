import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tables from './table';


describe('Our test suite', () => {
    configure({adapter: new Adapter()});
    it('renders App', () => {
        const lastTenBlocks = [{ timestamp: 'test', blockId: 12, action: 10}, { timestamp: 'test3', blockId: 11, action: 10}, { timestamp: 'test2', blockId: 10, action: 10}];
        const wrapper = shallow(<Tables data={lastTenBlocks} />);
        expect(wrapper.find('.block-tables')).toBeDefined();
    });
});