import React from "react";
import { FormState } from "../../../constants/FormState";
import { AssetManagementActions } from "../AssetManagementActions";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { EndorseBeneficiaryForm } from "./FormVariants/EndorseBeneficiary";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { TransferHolderForm } from "./FormVariants/TransferHolderForm";
import { NominateBeneficiaryHolderForm } from "./FormVariants/NominateBeneficiaryHolder";

interface AssetManagementFormProps {
  beneficiary?: string;
  holder?: string;
  approvedBeneficiary?: string;
  approvedHolder?: string;
  tokenId: string;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  onConnectToWallet: () => void;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder: (nextHolder: string) => void;
  onEndorseBeneficiary: (newBeneficiary: string, newHolder: string) => void;
  onApproveNewTransferTargets: (newBeneficiary: string, newHolder: string) => void;
  onSurrender: () => void;
  surrenderingState: string;
  holderTransferringState: string;
  beneficiaryEndorseState: string;
  isSurrendered: boolean;
  approveNewTransferTargetsState: string;
}

export const AssetManagementForm = ({
  account,
  formAction,
  tokenId,
  tokenRegistryAddress,
  onConnectToWallet,
  beneficiary,
  holder,
  onSetFormAction,
  surrenderingState,
  onSurrender,
  onTransferHolder,
  holderTransferringState,
  onEndorseBeneficiary,
  beneficiaryEndorseState,
  isSurrendered,
  onApproveNewTransferTargets,
  approveNewTransferTargetsState,
}: AssetManagementFormProps) => {
  const isHolder = account === holder;
  const isBeneficiary = account === beneficiary;
  const canSurrender = isBeneficiary && isHolder;
  const canEndorseBeneficiary = isBeneficiary && isHolder;
  const canNominateBeneficiaryHolder = isBeneficiary && !isHolder;

  const setFormActionNone = () => {
    if (
      surrenderingState === FormState.PENDING_CONFIRMATION ||
      holderTransferringState === FormState.PENDING_CONFIRMATION ||
      beneficiaryEndorseState === FormState.PENDING_CONFIRMATION ||
      approveNewTransferTargetsState === FormState.PENDING_CONFIRMATION
    )
      return;
    onSetFormAction(AssetManagementActions.None);
  };

  switch (formAction) {
    case AssetManagementActions.Surrender:
      return (
        <SurrenderForm
          formAction={formAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleSurrender={onSurrender}
          surrenderingState={surrenderingState}
          setFormActionNone={setFormActionNone}
        />
      );

    case AssetManagementActions.NominateBeneficiaryHolder:
      return (
        <NominateBeneficiaryHolderForm
          formAction={formAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleNomination={onApproveNewTransferTargets}
          nominationState={approveNewTransferTargetsState}
          setFormActionNone={setFormActionNone}
        />
      );

    case AssetManagementActions.EndorseBeneficiary:
      return (
        <EndorseBeneficiaryForm
          formAction={formAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleTransfer={onEndorseBeneficiary}
          beneficiaryEndorseState={beneficiaryEndorseState}
          setFormActionNone={setFormActionNone}
        />
      );

    case AssetManagementActions.TransferHolder:
      return (
        <TransferHolderForm
          formAction={formAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleTransfer={onTransferHolder}
          holderTransferringState={holderTransferringState}
          setFormActionNone={setFormActionNone}
        />
      );

    default:
      return (
        <ActionSelectionForm
          onSetFormAction={onSetFormAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          account={account}
          canSurrender={canSurrender}
          onConnectToWallet={onConnectToWallet}
          canChangeHolder={isHolder}
          canEndorseBeneficiary={canEndorseBeneficiary}
          isSurrendered={isSurrendered}
          canNominateBeneficiaryHolder={canNominateBeneficiaryHolder}
        />
      );
  }
};
