import React, { useContext } from "react";
import { Book } from "react-feather";
import { ExternalLinkEtherscanAddress } from "../../../../UI/ExternalLink";
import { InputEditableAssetTitle, InputError } from "../../../../UI/Input";
import { AssetTitle } from "../../../AssetTitle";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import { AddressBook } from "./../../../../../components/UI/Overlay/OverlayContent/AddressBook";
import { ButtonIconOrangeWhite } from "./../../../../UI/Button";

interface EditableAssetTitleProps {
  role: string;
  value?: string;
  isEditable: boolean;
  newValue?: string;
  onSetNewValue?: (newValue: string) => void;
  error?: boolean;
}

export const EditableAssetTitle = ({
  role,
  value,
  newValue,
  isEditable,
  onSetNewValue,
  error,
}: EditableAssetTitleProps) => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(<AddressBook title="Address Book" onAddressSelected={onSetNewValue} />);
  };

  if (!value) return <SkeletonPlaceholder />;
  if (!isEditable)
    return (
      <AssetTitle role={role} address={value}>
        <ExternalLinkEtherscanAddress
          name={value}
          address={value}
          data-testid={`non-editable-input-${role.toLowerCase()}`}
        />
      </AssetTitle>
    );
  return (
    <AssetTitle role={role} address={newValue || ""}>
      <div className="flex items-start">
        <div className="w-64 mr-2">
          <InputEditableAssetTitle
            data-testid={`editable-input-${role.toLowerCase()}`}
            value={newValue}
            hasError={error}
            placeholder={`Input ${role}'s address`}
            onChange={(event) => {
              if (!onSetNewValue) return;
              onSetNewValue(event.target.value);
            }}
          />
          {error && (
            <InputError data-testid={"error-msg"}>Unidentified address. Please check and input again.</InputError>
          )}
        </div>
        <div className="w-auto">
          <ButtonIconOrangeWhite onClick={onOverlayHandler}>
            <Book />
          </ButtonIconOrangeWhite>
        </div>
      </div>
    </AssetTitle>
  );
};
