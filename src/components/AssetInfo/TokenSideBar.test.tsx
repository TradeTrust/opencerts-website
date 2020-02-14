import React from "react";
import { mount } from "enzyme";
import TokenSideBar from "./TokenSideBar";

jest.mock("react-redux", () => ({
  useSelector: () => ({
    metamaskNotFound: false,
    networkIdVerbose: "ropsten"
  })
}));

describe("tokenSideBar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  it("should have a Manage Asset heading", () => {
    const wrapper = mount(
      <TokenSideBar
        adminAddress=""
        isSideBarExpand={true}
        holderAddress=""
        beneficiaryAddress=""
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );
    expect(wrapper.find("h2").text()).toStrictEqual("Manage Asset");
  });

  // holder === bene
  it("should show holder and beneficiary role, holder view, only 3 correct fields", () => {
    const wrapper = mount(
      <TokenSideBar
        adminAddress="0xA"
        isSideBarExpand={true}
        holderAddress="0xA"
        beneficiaryAddress="0xA"
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );

    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Holder and Beneficiary");
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(3);

    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");

    expect(wrapper.find("#sec-changebeneficiary h4").text()).toStrictEqual("Change Beneficiary");
    expect(wrapper.find("#sec-changebeneficiary button").text()).toStrictEqual("Change");

    expect(wrapper.find("#sec-surrenderdocument h4").text()).toStrictEqual("Surrender Document");
    expect(wrapper.find("#sec-surrenderdocument button").text()).toStrictEqual("Surrender");
  });

  // admin address === holder
  it("should show holder role, holder view, only 1 correct field", () => {
    const wrapper = mount(
      <TokenSideBar
        adminAddress="0xA"
        isSideBarExpand={true}
        holderAddress="0xA"
        beneficiaryAddress=""
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );
    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Holder");
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(1);

    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");
  });

  // admin address === holder, endorse change of bene exists
  it("should show holder role, holder view, only 2 correct fields", () => {
    const wrapper = mount(
      <TokenSideBar
        adminAddress="0xA"
        isSideBarExpand={true}
        holderAddress="0xA"
        beneficiaryAddress=""
        approvedBeneficiaryAddress="0xB"
        handler={() => {}}
      />
    );

    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Holder");
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(2);

    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");

    expect(wrapper.find("#sec-changebeneficiary h4").text()).toStrictEqual("Change Beneficiary");
    expect(wrapper.find("#sec-changebeneficiary button").text()).toStrictEqual("Change");
  });

  // admin address === bene
  it("should show bene role, bene view, only 1 correct field", () => {
    const wrapper = mount(
      <TokenSideBar
        adminAddress="0xA"
        isSideBarExpand={true}
        holderAddress=""
        beneficiaryAddress="0xA"
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );
    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Beneficiary");
    expect(wrapper.find("TokenSideBarBeneficiary")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarBeneficiary section")).toHaveLength(1);

    expect(wrapper.find("#sec-approvechangebeneficiary h4").text()).toStrictEqual("Endorse Change of Beneficiary");
    expect(wrapper.find("#sec-approvechangebeneficiary button").text()).toStrictEqual("Endorse");
  });

  // admin !== bene and admin !== holder
  it("should show no match view, no access text", () => {
    const wrapper = mount(
      <TokenSideBar
        adminAddress="0xA"
        isSideBarExpand={true}
        holderAddress="0xC"
        beneficiaryAddress=""
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );
    expect(wrapper.find("TokenSideBarNoMatch")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarNoMatch h4").text()).toStrictEqual("Oops!");
    expect(wrapper.find("TokenSideBarNoMatch p").text()).toStrictEqual(
      "It seems that you do not have access to manage assets."
    );
  });
});
