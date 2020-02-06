import React from "react";
import { mount } from "enzyme";
import TokenSideBarContent from "./TokenSideBarContent";

describe("tokenSideBarContent", () => {
  it("should render TokenSideBarHolder view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="0xA" beneficiaryAddress="" approvedBeneficiaryAddress="" />
    );
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
  });

  it("should render TokenSideBarBeneficiary view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="0xA" approvedBeneficiaryAddress="" />
    );
    expect(wrapper.find("TokenSideBarBeneficiary")).toHaveLength(1);
  });

  it("should render TokenSideBarBeneficiary view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="0xC" approvedBeneficiaryAddress="" />
    );
    expect(wrapper.find("TokenSideBarNoMatch")).toHaveLength(1);
  });
});
