import React from 'react';
import { shallow } from 'enzyme';
import Sales from './sales';

describe('<Sales />', () => {
  test('renders', () => {
    const wrapper = shallow(<Sales />);
    expect(wrapper).toMatchSnapshot();
  });
});
