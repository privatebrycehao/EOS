import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';


describe('Our test suite', () => {
  configure({adapter: new Adapter()});
  it('renders App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App')).toBeDefined();
  });
  it('renders App with new Block coming in ', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(App.prototype, 'componentDidUpdate');
    wrapper.setState({last_block_id: 20000000});
    expect(spy).toHaveBeenCalled();
  });
  it('renders App with updated blocks ', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(App.prototype, 'render');
    const spy2 = jest.spyOn(App.prototype,'getLatestBlock');
    const lastTenBlocks = [{ timestamp: 'test', blockId: 12, action: 10}, { timestamp: 'test3', blockId: 11, action: 10}, { timestamp: 'test2', blockId: 10, action: 10}];
    wrapper.setState({lastTenBlocks});
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('.rs-table-loader-wrapper')).toBeDefined();
    expect(wrapper.find('.rs-table-row')).toBeDefined();
    wrapper.find('.retry').last().simulate('click');
    expect(spy2).toHaveBeenCalled();
  });
  it('renders App with new Block coming in ', () => {
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(App.prototype,'getLatestBlock');
    wrapper.find('.retry').last().simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});