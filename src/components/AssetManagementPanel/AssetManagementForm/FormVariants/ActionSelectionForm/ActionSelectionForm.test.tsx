import "@testing-library/jest-dom";
import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { ActionSelectionForm } from "./ActionSelectionForm";

describe("ActionSelectionForm", () => {
  it("should display the non-editable beneficiary & holder", () => {
    const container = render(
      <ActionSelectionForm
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={false}
        onConnectToWallet={() => alert("Login to Metamask")}
        canChangeHolder={true}
        canEndorseBeneficiary={false}
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

  it("should fire login to browser wallet if user is not logged in", () => {
    const mockOnConnectToWallet = jest.fn();

    const container = render(
      <ActionSelectionForm
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account=""
        canSurrender={false}
        onConnectToWallet={mockOnConnectToWallet}
        canChangeHolder={false}
        canEndorseBeneficiary={false}
      />
    );

    fireEvent.click(container.getByTestId("connectToWallet"));
    expect(mockOnConnectToWallet).toHaveBeenCalled();
  });

  it("should display the Manage Assets dropdown if user is logged in", () => {
    const container = render(
      <ActionSelectionForm
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={true}
        onConnectToWallet={() => alert("Login to Metamask")}
        canChangeHolder={true}
        canEndorseBeneficiary={false}
      />
    );

    const manageAssetsDropdown = container.getByTestId("manageAssetDropdown");
    expect(manageAssetsDropdown).not.toBeNull();
  });

  it("should allow the selection of Surrender if user can surrender", async () => {
    const container = render(
      <ActionSelectionForm
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={true}
        onConnectToWallet={() => alert("Login to Metamask")}
        canChangeHolder={true}
        canEndorseBeneficiary={false}
      />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    expect(container.queryByTestId("surrenderDropdown")).not.toBeNull();
  });

  it("should not display the selection of Surrender if user cannot surrender", () => {
    const container = render(
      <ActionSelectionForm
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={true}
        onConnectToWallet={() => alert("Login to Metamask")}
        canChangeHolder={true}
        canEndorseBeneficiary={false}
      />
    );

    expect(container.queryByTestId("SurrenderDropdown")).toBeNull();
  });

  it("should change the state of the application to TransferHolder when we clicked on TransferHolder", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm
        onSetFormAction={mockOnSetFormAction}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={true}
        onConnectToWallet={() => alert("Login to Metamask")}
        canChangeHolder={true}
        canEndorseBeneficiary={false}
      />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    await act(async () => {
      fireEvent.click(container.getByTestId("transferHolderDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalled();
  });

  it("should change the state of the application to EndorseBeneficiary when we clicked on EndorseBeneficiary", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm
        onSetFormAction={mockOnSetFormAction}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={true}
        onConnectToWallet={() => alert("Login to Metamask")}
        canChangeHolder={true}
        canEndorseBeneficiary={true}
      />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    await act(async () => {
      fireEvent.click(container.getByTestId("endorseBeneficiaryDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalled();
  });
});
