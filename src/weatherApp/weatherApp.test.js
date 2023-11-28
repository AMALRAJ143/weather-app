import React from "react";
import { shallow } from "enzyme";
import WeatherApp from "./weatherApp";

describe("WeatherApp", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<WeatherApp />);
    expect(wrapper).toMatchSnapshot();
  });
});
