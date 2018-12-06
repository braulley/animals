import React from 'react';
import { shallow } from 'enzyme';
import Clients from './clients';

describe('<Clients />', () => {
  test('renders', () => {
    const wrapper = shallow(<Clients />);
    expect(wrapper).toMatchSnapshot();
  });
});
