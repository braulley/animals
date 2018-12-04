import React from 'react';
import { shallow } from 'enzyme';
import Client from './Client';

describe('<Client />', () => {
  test('renders', () => {
    const wrapper = shallow(<Client />);
    expect(wrapper).toMatchSnapshot();
  });
});
