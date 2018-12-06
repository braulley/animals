import React from 'react';
import { shallow } from 'enzyme';
import Pet from './pet';

describe('<Pet />', () => {
  test('renders', () => {
    const wrapper = shallow(<Pet />);
    expect(wrapper).toMatchSnapshot();
  });
});
