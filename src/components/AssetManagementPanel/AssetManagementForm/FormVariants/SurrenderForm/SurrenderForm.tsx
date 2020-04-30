import React from "react";
import { ButtonSolidGreenWhite, ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface SurrenderFormProps {
  formAction: AssetManagementActions;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleSurrender: () => void;
  surrenderingState: string;
}

export const SurrenderForm = ({
  formAction,
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleSurrender,
  surrenderingState,
}: SurrenderFormProps) => {
  const isPendingConfirmation = surrenderingState === "PENDING_CONFIRMATION";
  const isConfirmed = surrenderingState === "CONFIRMED";

  const onBackHandler = () => {
    if (isPendingConfirmation) return;
    onSetFormAction(AssetManagementActions.None);
  };

  return (
    <div className="row py-3">
      <div className="col-12">
        {!isConfirmed && (
          <AssetManagementTitle onBack={onBackHandler} formAction={formAction} disabled={isPendingConfirmation} />
        )}
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} onSetNewValue={() => {}} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Holder" value={holder} isEditable={false} onSetNewValue={() => {}} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            {isConfirmed ? (
              <div className="row">
                <div className="col-auto">
                  <ButtonSolidGreenWhite disabled>Success</ButtonSolidGreenWhite>
                </div>
              </div>
            ) : (
              <div className="row no-gutters">
                <div className="col-auto">
                  <ButtonSolidWhiteGrey
                    onClick={() => onSetFormAction(AssetManagementActions.None)}
                    disabled={isPendingConfirmation}
                    data-testid={"cancelSurrenderBtn"}
                  >
                    Cancel
                  </ButtonSolidWhiteGrey>
                </div>
                <div className="col-auto ml-2">
                  <ButtonSolidRedWhite
                    onClick={handleSurrender}
                    disabled={isPendingConfirmation}
                    data-testid={"surrenderBtn"}
                  >
                    {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Surrender Document</>}
                  </ButtonSolidRedWhite>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
