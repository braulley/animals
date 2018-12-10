import React from 'react';
import { shallow } from 'enzyme';
import Veterinary_consultations from './veterinary_consultations';

describe('<Veterinary_consultations />', () => {
  test('renders', () => {
    const wrapper = shallow(<Veterinary_consultations />);
    expect(wrapper).toMatchSnapshot();
  });
});
