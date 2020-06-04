import React, { useContext } from "react";
import { ButtonSolidOrangeWhite } from "../../../../UI/Button";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { ManageAssetsDropdown } from "../../AssetManagementDropdown";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "./../../../../../components/UI/Overlay/OverlayContent/DocumentTransferMessage";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import { TagBorderedRedLarge } from "../../../../UI/Tag";

interface ActionSelectionFormProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  account?: string;
  canSurrender: boolean;
  onConnectToWallet: () => void;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  isSurrendered: boolean;
  canNominateBeneficiaryHolder: boolean;
}

export const ActionSelectionForm = ({
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  onConnectToWallet,
  canChangeHolder,
  canEndorseBeneficiary,
  isSurrendered,
  canNominateBeneficiaryHolder,
}: ActionSelectionFormProps) => {
  const canManage = canSurrender || canChangeHolder || canEndorseBeneficiary || canNominateBeneficiaryHolder;

  const { showOverlay } = useContext(OverlayContext);
  const handleNoAccess = () => {
    showOverlay(showDocumentTransferMessage(MessageTitle.NO_MANAGE_ACCESS, { isSuccess: false }));
  };

  const handleMetamaskError = (errorMesssage: string, errorCode: number) => {
    const isUserDeniedAccountAuthorization = errorCode === 4001;

    showOverlay(
      showDocumentTransferMessage(errorMesssage, {
        isSuccess: false,
        isButtonMetamaskInstall: !isUserDeniedAccountAuthorization,
      })
    ); // there is 2 type of errors that will be handled here, 1st = NO_METAMASK (error thrown from provider.tsx), 2nd = NO_USER_AUTHORIZATION (error from metamask extension itself).
  };

  const handleConnectWallet = async () => {
    try {
      await onConnectToWallet();
    } catch (error) {
      handleMetamaskError(error.message, error.code);
    }
  };

  return (
    <div className="row py-3">
      <div className="col-12">
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          {isSurrendered ? (
            <div className="col-12 col-lg-auto align-self-end">
              <div className="py-3">
                <TagBorderedRedLarge>Surrendered</TagBorderedRedLarge>
              </div>
            </div>
          ) : (
            <>
              <div className="col-12 col-lg">
                <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} />
              </div>
              <div className="col-12 col-lg">
                <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
              </div>
            </>
          )}
        </div>
        {!isSurrendered && (
          <div className="row mb-3">
            <div className="col-auto ml-auto">
              {account ? (
                <>
                  {canManage ? (
                    <ManageAssetsDropdown
                      onSetFormAction={onSetFormAction}
                      canSurrender={canSurrender}
                      canChangeHolder={canChangeHolder}
                      canEndorseBeneficiary={canEndorseBeneficiary}
                      canNominateBeneficiaryHolder={canNominateBeneficiaryHolder}
                    />
                  ) : (
                    <ButtonSolidOrangeWhite onClick={handleNoAccess}>No Access</ButtonSolidOrangeWhite>
                  )}
                </>
              ) : (
                <ButtonSolidOrangeWhite data-testid={"connectToWallet"} onClick={handleConnectWallet}>
                  Connect Wallet
                </ButtonSolidOrangeWhite>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
