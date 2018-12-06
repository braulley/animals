import React from 'react';
import { shallow } from 'enzyme';
import Users from './users';

describe('<Users />', () => {
  test('renders', () => {
    const wrapper = shallow(<Users />);
    expect(wrapper).toMatchSnapshot();
  });
});
