import React from "react";
import { mount } from "enzyme";
import TokenSideBar from "./TokenSideBar";

describe("tokenSideBar", () => {
  it("should have a Manage Asset heading", () => {
    const wrapper = mount(<TokenSideBar isSideBarExpand={true} handler={() => {}} />);
    expect(wrapper.find("h2").text()).toStrictEqual("Manage Asset");
  });
});
