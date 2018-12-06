import React from 'react';
import { shallow } from 'enzyme';
import Pets from './pets';

describe('<Pets />', () => {
  test('renders', () => {
    const wrapper = shallow(<Pets />);
    expect(wrapper).toMatchSnapshot();
  });
});
