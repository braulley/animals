import React from 'react';
import { shallow } from 'enzyme';
import FormRow from './FormRow';

describe('<FormRow />', () => {
  test('renders', () => {
    const wrapper = shallow(<FormRow />);
    expect(wrapper).toMatchSnapshot();
  });
});
