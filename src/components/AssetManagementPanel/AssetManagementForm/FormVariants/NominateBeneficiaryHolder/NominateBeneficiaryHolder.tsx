import React, { useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { isEthereumAddress } from "../../../../../utils";
import { ButtonSolidOrangeWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "./../../../../../components/UI/Overlay/OverlayContent/DocumentTransferMessage";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface NominateBeneficiaryHolderFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleNomination: (newBeneficiary: string, newHolder: string) => void;
  nominationState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const NominateBeneficiaryHolderForm = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleNomination,
  nominationState,
  setFormActionNone,
  setShowEndorsementChain,
}: NominateBeneficiaryHolderFormProps) => {
  const [newBeneficiary, setNewBeneficiary] = useState("");
  const isPendingConfirmation = nominationState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = nominationState === FormState.CONFIRMED;
  const isEditable = nominationState !== FormState.PENDING_CONFIRMATION && nominationState !== FormState.CONFIRMED;
  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.NOMINATE_BENEFICIARY_HOLDER_SUCCESS, {
          isSuccess: true,
        })
      );
      setFormActionNone();
    }
  }, [isConfirmed, newBeneficiary, showOverlay, setFormActionNone]);

  const isInvalidNomination =
    !newBeneficiary || !holder || newBeneficiary === beneficiary || !isEthereumAddress(newBeneficiary);

  return (
    <div className="flex flex-wrap py-4">
      <div className="w-full">
        <AssetManagementTitle
          setFormActionNone={setFormActionNone}
          formAction={formAction}
          disabled={isPendingConfirmation}
        />
        <div className="flex flex-wrap mb-4">
          <div className="w-full lg:flex-grow">
            <AssetInformationPanel
              setShowEndorsementChain={setShowEndorsementChain}
              tokenRegistryAddress={tokenRegistryAddress}
            />
          </div>
          <div className="w-full lg:flex-grow">
            <EditableAssetTitle
              role="Owner"
              value={beneficiary}
              newValue={newBeneficiary}
              isEditable={isEditable}
              onSetNewValue={setNewBeneficiary}
              error={nominationState === FormState.ERROR}
            />
          </div>
          <div className="w-full lg:flex-grow">
            <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-auto ml-auto">
            <div className="flex flex-wrap">
              <div className="w-auto">
                <ButtonSolidWhiteGrey
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelNominationBtn"}
                >
                  Cancel
                </ButtonSolidWhiteGrey>
              </div>
              <div className="w-auto ml-2">
                <ButtonSolidOrangeWhite
                  disabled={isInvalidNomination || isPendingConfirmation}
                  onClick={() => {
                    if (holder === undefined) return;
                    // holder is used instead of 'NewHolder' because we do not want to change the value on the UI when nominating beneficiary.
                    handleNomination(newBeneficiary, holder);
                  }}
                  data-testid={"nominationBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Nominate</>}
                </ButtonSolidOrangeWhite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
