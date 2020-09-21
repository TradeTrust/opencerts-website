import React, { useState, useEffect } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./../AssetManagementForm";
import { AssetManagementTags } from "./../AssetManagementTags";
import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

interface AssetManagementApplicationProps {
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AssetManagementApplication = ({
  tokenId,
  tokenRegistryAddress,
  setShowEndorsementChain,
}: AssetManagementApplicationProps) => {
  const {
    approvedHolder,
    holder,
    approvedBeneficiary,
    beneficiary,
    changeHolder,
    changeHolderState,
    endorseBeneficiary,
    endorseBeneficiaryState,
    transferTo,
    transferToState,
    acceptSurrenderingState,
    destroyToken,
    isSurrendered,
    isTitleEscrow,
    approveNewTransferTargets,
    approveNewTransferTargetsState,
    transferToNewEscrow,
    transferToNewEscrowState,
    titleEscrowOwner,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { upgradeProvider, account, provider } = useProviderContext();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);
  // Check if direct owner is minter
  const { call: checkIsMinter, value: isMinter } = useContractFunctionHook(tokenRegistry, "isMinter");

  useEffect(() => {
    if (isTitleEscrow === false && account) {
      checkIsMinter(account);
    }
  }, [account, checkIsMinter, isTitleEscrow]);

  const onSurrender = () => {
    // Change to surrendered state
    transferTo(tokenRegistryAddress);
  };

  const onAcceptSurrender = () => {
    destroyToken(tokenId);
  };

  const onSetFormAction = (AssetManagementActions: AssetManagementActions) => {
    setAssetManagementAction(AssetManagementActions);
  };

  return (
    <div id="title-transfer-panel">
      <div className="container-custom">
        <AssetManagementTags />
        {isTitleEscrow !== undefined && (
          <AssetManagementForm
            account={account}
            onConnectToWallet={upgradeProvider}
            beneficiary={beneficiary}
            approvedBeneficiary={approvedBeneficiary}
            holder={holder}
            approvedHolder={approvedHolder}
            titleEscrowOwner={titleEscrowOwner}
            formAction={assetManagementAction}
            tokenRegistryAddress={tokenRegistryAddress}
            onSetFormAction={onSetFormAction}
            surrenderingState={transferToState}
            acceptSurrenderingState={acceptSurrenderingState}
            onSurrender={onSurrender}
            onTransferHolder={changeHolder}
            holderTransferringState={changeHolderState}
            onEndorseBeneficiary={endorseBeneficiary}
            beneficiaryEndorseState={endorseBeneficiaryState}
            isSurrendered={isSurrendered}
            onApproveNewTransferTargets={approveNewTransferTargets}
            approveNewTransferTargetsState={approveNewTransferTargetsState}
            onTransferToNewEscrow={transferToNewEscrow}
            transferToNewEscrowState={transferToNewEscrowState}
            setShowEndorsementChain={setShowEndorsementChain}
            isTitleEscrow={isTitleEscrow}
            isMinter={isMinter?.[0]}
            onAcceptSurrender={onAcceptSurrender}
          />
        )}
      </div>
    </div>
  );
};
