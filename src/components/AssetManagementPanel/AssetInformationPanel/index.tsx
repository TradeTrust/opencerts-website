import React, { FunctionComponent } from "react";
import { AddressInfo } from "../../AddressInfo";
import { ExternalLinkEtherscanAddress } from "../../UI/ExternalLink";

interface AssetInformationPanelProps {
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
  className?: string;
}

export const AssetInformationPanel: FunctionComponent<AssetInformationPanelProps> = ({
  tokenRegistryAddress,
  setShowEndorsementChain,
  className,
}) => {
  return (
    <div className={`py-4 ${className}`}>
      <AddressInfo title="BL information" name="" resolvedBy="" source="">
        <div>
          <ExternalLinkEtherscanAddress
            name="View BL Registry"
            address={tokenRegistryAddress}
            className="text-cerulean-200 font-bold"
          />
        </div>
        <div
          onClick={() => setShowEndorsementChain(true)}
          className="text-cerulean-200 font-bold cursor-pointer transition-colors duration-300 ease-out hover:text-cerulean"
          id="endorsement-chain-button"
        >
          View Endorsement Chain
        </div>
      </AddressInfo>
    </div>
  );
};
