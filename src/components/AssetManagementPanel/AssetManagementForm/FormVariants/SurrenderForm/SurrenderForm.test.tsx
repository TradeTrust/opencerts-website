import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { SurrenderForm } from "./SurrenderForm";

describe("Surrender", () => {
  it("should display the non-editable beneficiary & holder", () => {
    const container = render(
      <SurrenderForm
        formAction={AssetManagementActions.Surrender}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        surrenderingState="UNINITIALIZED"
        handleSurrender={() => {}}
      />
    );
    const beneficiaryComponent = container.getByTestId("asset-title-beneficiary");
    const beneficiaryText = container.getByText("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C");
    const holderComponent = container.getByTestId("asset-title-holder");
    const holderText = container.getByText("0xa61B056dA0084a5f391EC137583073096880C2e3");

    expect(beneficiaryComponent).not.toBeNull();
    expect(beneficiaryText).not.toBeNull();
    expect(holderComponent).not.toBeNull();
    expect(holderText).not.toBeNull();
  });

  it("should have the surrender button and cancel button", () => {
    const container = render(
      <SurrenderForm
        formAction={AssetManagementActions.Surrender}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        surrenderingState="UNINITIALIZED"
        handleSurrender={() => {}}
      />
    );

    expect(container.queryByTestId("cancelSurrenderBtn")).not.toBeNull();
    expect(container.queryByTestId("surrenderBtn")).not.toBeNull();
  });

  it("should change the state of the application to Surrender when we clicked on Surrender", () => {
    const mockHandleSurrender = jest.fn();

    const container = render(
      <SurrenderForm
        formAction={AssetManagementActions.Surrender}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        surrenderingState="UNINITIALIZED"
        handleSurrender={mockHandleSurrender}
      />
    );

    fireEvent.click(container.getByTestId("surrenderBtn"));
    expect(mockHandleSurrender).toHaveBeenCalled();
  });

  it("should change the state of the application to None when we clicked on Cancel", () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <SurrenderForm
        formAction={AssetManagementActions.Surrender}
        onSetFormAction={mockOnSetFormAction}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        surrenderingState="UNINITIALIZED"
        handleSurrender={() => {}}
      />
    );

    fireEvent.click(container.getByTestId("cancelSurrenderBtn"));
    expect(mockOnSetFormAction).toHaveBeenCalled();
  });

  it("should show a loader when the surrender state is in PENDING_CONFIRMATION", () => {
    const container = render(
      <SurrenderForm
        formAction={AssetManagementActions.Surrender}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        surrenderingState="PENDING_CONFIRMATION"
        handleSurrender={() => {}}
      />
    );

    expect(container.queryByTestId("loader")).not.toBeNull();
  });

  it("should disable surrender button when the surrender state is in INITIALIZED or PENDING_CONFIRMATION", () => {
    const mockHandleSurrender = jest.fn();

    const container = render(
      <SurrenderForm
        formAction={AssetManagementActions.Surrender}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        surrenderingState="PENDING_CONFIRMATION"
        handleSurrender={mockHandleSurrender}
      />
    );

    fireEvent.click(container.getByTestId("surrenderBtn"));
    expect(mockHandleSurrender).not.toHaveBeenCalled();
  });
});
