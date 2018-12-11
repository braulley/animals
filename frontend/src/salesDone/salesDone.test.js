import React from 'react';
import { shallow } from 'enzyme';
import SalesDone from './salesDone';

describe('<SalesDone />', () => {
  test('renders', () => {
    const wrapper = shallow(<SalesDone />);
    expect(wrapper).toMatchSnapshot();
  });
});
