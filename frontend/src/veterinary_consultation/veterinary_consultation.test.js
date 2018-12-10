import React from 'react';
import { shallow } from 'enzyme';
import Veterinary_consultation from './veterinary_consultation';

describe('<Veterinary_consultation />', () => {
  test('renders', () => {
    const wrapper = shallow(<Veterinary_consultation />);
    expect(wrapper).toMatchSnapshot();
  });
});
