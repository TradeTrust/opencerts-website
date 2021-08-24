import { BackArrow } from "@govtechsg/tradetrust-ui-components";
// import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { Info } from "react-feather";
import { TitleEscrowEvent, TradeTrustErc721Event } from "../../../types";
import { TooltipIcon } from "../../UI/SvgIcon";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";
import styled from "@emotion/styled";

const EndorsementChainDataStyle = styled.div`
  & > *:first-of-type {
    .dot-path {
      bottom: 0;
      height: 50%;
    }
  }

  & > *:last-of-type {
    // for desktop scren
    .dot-path {
      height: 50%;
    }

    // for mobile screen
    .path {
      height: 0;
    }
  }
`;

type EndorsementChain = (TradeTrustErc721Event | TitleEscrowEvent)[];
interface EndorsementChainLayout {
  endorsementChain?: EndorsementChain;
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

enum EventType {
  TRANSFER = "Transfer",
  SURRENDER = "Surrender",
  BURNT = "Burnt",
  TRANSFER_TO_WALLET = "Transfer to Wallet",
}

enum ActionType {
  INITIAL = "Document has been issued",
  ENDORSE = "Endorse change of ownership",
  TRANSFER = "Transfer holdership",
  SURRENDERED = "Document surrendered to issuer",
  SURRENDER_REJECTED = "Surrender of document rejected",
  SURRENDER_ACCEPTED = "Surrender of document accepted", // burnt token
  TRANSFER_TO_WALLET = "Transfer to Wallet",
}

interface HistoryChain {
  action: ActionType;
  isNewBeneficiary: boolean;
  isNewHolder: boolean;
  documentOwner?: string;
  beneficiary?: string;
  holder?: string;
  timestamp?: number;
}

interface AddressResolvedNameProps {
  address: string;
}

const AddressResolvedName: React.FunctionComponent<AddressResolvedNameProps> = ({ address }) => {
  console.log("AddressResolvedName", address);
  // const { identityName } = useIdentifierResolver(address);
  // return <>{identityName && <div>{identityName}</div>}</>;
  return <div className="mr-2">Bank of China</div>; // TODO don't hardcode later
};

interface DetailsEntityProps {
  title: string;
  address: string;
  documentOwner: string;
}

const getHistoryChain = (endorsementChain?: EndorsementChain) => {
  const historyChain: HistoryChain[] = [
    {
      action: ActionType.INITIAL,
      isNewBeneficiary: true,
      isNewHolder: false,
    },
  ];

  let previousBeneficiary = "";
  let previousHolder = "";

  endorsementChain?.forEach((endorsementChainEvent) => {
    const chain = endorsementChainEvent as TitleEscrowEvent;
    const documentOwner = chain.documentOwner;
    const beneficiary = chain.beneficiary;
    const chainEventTimestamp = chain.eventTimestamp;

    switch (chain.eventType) {
      case EventType.TRANSFER:
        chain.holderChangeEvents.forEach((holderEvent) => {
          const holder = holderEvent.holder;
          const holderEventTimestamp = holderEvent.timestamp;
          const isNewBeneficiary = beneficiary !== previousBeneficiary;
          const isNewHolder = holder !== previousHolder;

          if (previousBeneficiary === beneficiary && previousHolder === holder) {
            historyChain.push({
              action: ActionType.SURRENDER_REJECTED,
              isNewBeneficiary,
              isNewHolder,
              documentOwner,
              beneficiary,
              holder,
              timestamp: holderEventTimestamp,
            });
          } else if (previousBeneficiary != beneficiary) {
            historyChain.push({
              action: ActionType.ENDORSE,
              isNewBeneficiary,
              isNewHolder,
              documentOwner,
              beneficiary,
              holder,
              timestamp: holderEventTimestamp,
            });
          } else if (previousHolder !== holder) {
            historyChain.push({
              action: ActionType.TRANSFER,
              isNewBeneficiary,
              isNewHolder,
              documentOwner,
              beneficiary,
              holder,
              timestamp: holderEventTimestamp,
            });
          }

          previousHolder = holder;
          previousBeneficiary = beneficiary;
        });
        break;
      case EventType.SURRENDER:
        historyChain.push({
          action: ActionType.SURRENDERED,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp: chainEventTimestamp,
        });
        // not reassigning previousBeneficiary and previousHolder so that it takes the addresses from the point just before it was surrendered
        break;
      case EventType.BURNT:
        historyChain.push({
          action: ActionType.SURRENDER_ACCEPTED,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp: chainEventTimestamp,
        });
        previousHolder = "";
        previousBeneficiary = "";
        break;
      case EventType.TRANSFER_TO_WALLET:
        historyChain.push({
          action: ActionType.TRANSFER_TO_WALLET,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp: chainEventTimestamp,
          documentOwner,
          beneficiary,
        });
        previousHolder = "";
        previousBeneficiary = beneficiary;
        break;
      default:
        throw Error("eventType not matched");
    }
  });

  return historyChain;
};

const DetailsEntity: React.FunctionComponent<DetailsEntityProps> = ({ title, address, documentOwner }) => {
  const tooltipContent = (
    <div className="relative flex flex-col">
      <div className="text-white font-bold text-base">Title Escrow:</div>
      <div className="text-white text-base">{documentOwner}</div>
    </div>
  );

  return (
    <div className="w-full lg:w-1/3">
      <div className="flex flex-nowrap pr-8">
        <div className="flex-shrink-0 lg:hidden" style={{ width: "40px" }}>
          <div className="relative h-full">
            <div className="path border-l border-dashed border-cerulean absolute top-0 left-1/2 h-full" />
          </div>
        </div>
        <div className="pb-4 lg:pb-0">
          <h5 className="text-gray-400 mr-2 lg:hidden">{title}</h5>
          <div className="flex flex-wrap items-center">
            <div className="w-auto">
              <AddressResolvedName address={address} />
            </div>
            <div className="w-auto">
              <TooltipIcon className="h-5 w-5 block" content={tooltipContent} placement="top">
                <Info />
              </TooltipIcon>
            </div>
          </div>
          <h6 className="text-cerulean break-all">{address}</h6>
        </div>
      </div>
    </div>
  );
};

const EndorsementChainData: React.FunctionComponent<any> = ({ data }) => {
  return (
    <div className="flex flex-wrap items-center">
      <div className="w-full lg:w-1/3">
        <div className="flex flex-nowrap">
          <div className="flex-shrink-0 lg:order-2" style={{ width: "40px" }}>
            <div className="relative h-full">
              <div className="dot-path border-l border-dashed border-cerulean absolute left-1/2 h-full" />
              <div className="flex justify-center items-center h-full">
                <div className="rounded-full bg-cerulean h-3 w-3 mx-auto" />
              </div>
            </div>
          </div>
          <div className="lg:ml-auto lg:order-1">
            <div className="lg:text-right py-6 lg:py-4">
              <h4 className="text-cloud-900">{data.action}</h4>
              {data.timestamp && (
                <h6 className="text-gray-400">{format(new Date(data.timestamp ?? 0), "do MMM yyyy, hh:mm aa")}</h6>
              )}
            </div>
          </div>
        </div>
      </div>
      {data.beneficiary && (
        <DetailsEntity title="Owner" address={data.beneficiary} documentOwner={data.documentOwner} />
      )}
      {data.holder && <DetailsEntity title="Holder" address={data.holder} documentOwner={data.documentOwner} />}
    </div>
  );
};

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  endorsementChain,
  setShowEndorsementChain,
  error,
  pending,
}) => {
  const historyChain = getHistoryChain(endorsementChain);

  return (
    <div className="">
      <div className="">
        <div className="cursor-pointer" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
          <BackArrow />
        </div>
        <div data-testid="endorsement-chain-title">
          <h3>Endorsement Chain</h3>
        </div>
        <div className="bg-white rounded-xl shadow-xl px-3 py-8 lg:px-8">
          <div className="hidden lg:block mb-8">
            <div className="flex text-gray-400">
              <h5 className="w-1/3">Action/Date</h5>
              <h5 className="w-1/3">Owner</h5>
              <h5 className="w-1/3">Holder</h5>
            </div>
            <div className="border-t" />
          </div>

          {pending && !endorsementChain && !error && <EndorsementChainLoading />}
          {!pending && endorsementChain && !error && (
            <EndorsementChainDataStyle>
              {historyChain.map((item, key) => (
                <EndorsementChainData data={item} key={key} />
              ))}
            </EndorsementChainDataStyle>
          )}
          {!pending && !endorsementChain && error && <EndorsementChainError error={error} />}
        </div>
      </div>
    </div>
  );
};
