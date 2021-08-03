import { VerificationFragment } from "@govtechsg/oa-verify";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import { Button, MessageTitle, OverlayContext, showDocumentTransferMessage } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { DocumentStatus } from "../../../../DocumentStatus";
import { ObfuscatedMessage } from "../../../../ObfuscatedMessage";
import { TagBorderedLg } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTags } from "../../../AssetManagementTags";
import { AssetManagementDropdown } from "../../AssetManagementDropdown";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface ActionSelectionFormProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  account?: string;
  canSurrender: boolean;
  canHandleSurrender?: boolean;
  onConnectToWallet: () => void;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  canNominateBeneficiaryHolder: boolean;
  canEndorseTransfer: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
  isTitleEscrow: boolean;
  document: WrappedDocument<v2.OpenAttestationDocument>;
  verificationStatus: VerificationFragment[];
}

export const ActionSelectionForm: FunctionComponent<ActionSelectionFormProps> = ({
  onSetFormAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  canHandleSurrender,
  onConnectToWallet,
  canChangeHolder,
  canEndorseBeneficiary,
  isSurrendered,
  isTokenBurnt,
  canNominateBeneficiaryHolder,
  canEndorseTransfer,
  setShowEndorsementChain,
  isTitleEscrow,
  document,
  verificationStatus,
}) => {
  const canManage =
    canHandleSurrender ||
    canSurrender ||
    canChangeHolder ||
    canEndorseBeneficiary ||
    canNominateBeneficiaryHolder ||
    canEndorseTransfer;

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
    <>
      <DocumentStatus verificationStatus={verificationStatus} />
      <ObfuscatedMessage document={document} />
      <AssetManagementTags />
      <div className="flex flex-wrap justify-between pb-4 -mx-4">
        <div className="w-full px-4 lg:w-1/3">
          <AssetInformationPanel
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
          />
        </div>
        {isSurrendered && (
          <div className="w-full px-4 lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedLg id="surrender-sign" className="bg-white rounded-xl text-rose border-rose">
                <h3 className="text-4xl">Surrendered To Issuer</h3>
              </TagBorderedLg>
            </div>
          </div>
        )}
        {isTokenBurnt && (
          <div className="w-full px-4 lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedLg id="surrendered-sign" className="bg-white rounded-xl text-rose border-rose">
                <h3 className="text-4xl">Surrendered</h3>
              </TagBorderedLg>
            </div>
          </div>
        )}
        {!isSurrendered && !isTokenBurnt && isTitleEscrow && (
          <>
            <div className="w-full px-4 lg:w-1/3">
              <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} />
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
          </>
        )}
      </div>
      {!isTokenBurnt && (
        <div className="flex flex-wrap pb-4">
          {/* {isSurrendered && (
            <div className="w-full lg:w-auto self-end">
              <TagBorderedLg id="surrender-sign" className="text-rose border-none font-ubuntu pt-0 pb-0 pl-0 pr-0">
                Surrendered To Issuer
              </TagBorderedLg>
            </div>
          )} */}
          <div className="w-auto lg:ml-auto">
            {account ? (
              <>
                {canManage ? (
                  <AssetManagementDropdown
                    onSetFormAction={onSetFormAction}
                    canSurrender={canSurrender}
                    canChangeHolder={canChangeHolder}
                    canEndorseBeneficiary={canEndorseBeneficiary}
                    canNominateBeneficiaryHolder={canNominateBeneficiaryHolder}
                    canEndorseTransfer={canEndorseTransfer}
                    canHandleSurrender={canHandleSurrender}
                  />
                ) : (
                  <Button
                    className="bg-cerulean text-white rounded-xl text-lg py-2 px-3 hover:bg-cerulean-300"
                    onClick={handleNoAccess}
                  >
                    No Access
                  </Button>
                )}
              </>
            ) : (
              <Button
                className="bg-cerulean text-white rounded-xl text-lg py-2 px-3 hover:bg-cerulean-300"
                data-testid={"connectToWallet"}
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
