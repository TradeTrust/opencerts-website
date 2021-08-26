import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { EndorsementChain } from "../../../types";
import { EndorsementChainLayout } from "./EndorsementChainLayout";

jest.mock("@govtechsg/address-identity-resolver", () => ({ useIdentifierResolver: jest.fn() }));

const mockUseIdentifierResolver = useIdentifierResolver as jest.Mock;

const initialEndorsementChain: EndorsementChain = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
    ],
  },
];

const transferHolderEndorsementChain: EndorsementChain = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
      {
        blockNumber: 8283034,
        holder: "0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e",
        timestamp: 1594608809000,
      },
    ],
  },
];

const endorseBeneficiaryEndorsementChain: EndorsementChain = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
    ],
  },
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608809000,
      },
    ],
  },
];

const transferToWalletEndorsementChain: EndorsementChain = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
    ],
  },
  {
    documentOwner: "0xBee0875Ba8069ed5c48E6A670118EF1C6B1E7fC0",
    eventType: "Transfer to Wallet",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    eventTimestamp: 1594609205000,
  },
];

const surrenderEndorsementChain: EndorsementChain = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
    ],
  },
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Surrender",
    eventTimestamp: 1594609205000,
  },
];

const rejectSurrenderedEndorsementChain: EndorsementChain = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
    ],
  },
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Surrender",
    eventTimestamp: 1594609205000,
  },
  {
    documentOwner: "0xd413cF518B7aE838fbd994a653Af350AF6f72379",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8283052,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594609306000,
      },
    ],
  },
];

const acceptSurrenderedEndorsementChain: EndorsementChain = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
    ],
  },
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Surrender",
    eventTimestamp: 1594609205000,
  },
  {
    documentOwner: "0x000000000000000000000000000000000000dEaD",
    eventType: "Burnt",
    eventTimestamp: 1594609405000,
  },
];

describe("EndorsementChainLayout", () => {
  it("should render error message when error has occurred", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(<EndorsementChainLayout error={"Unknown Error"} pending={false} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByText("Unknown Error has occurred, please try again later.")).toHaveLength(1);
  });

  it("should render the loading component when pending is true", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(<EndorsementChainLayout error={""} pending={true} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByTestId("loader-skeleton")).toHaveLength(9);
  });

  it("should render 'Document has been issued' in initial endorsement chain", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={initialEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Document has been issued")).toHaveLength(1);
  });

  it("should render 'Endorse change of ownership' in initial endorsement chain after 'Document has been issued'", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={initialEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Document has been issued")).toHaveLength(1);
    expect(screen.getAllByText("Endorse change of ownership")).toHaveLength(1);
  });

  it("should render 'Transfer holdership' when there is a change in holdership from previous holder", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={transferHolderEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Transfer holdership")).toHaveLength(1);
  });

  it("should render address of new holder when there is a change in holdership from previous holder", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={transferHolderEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Transfer holdership")).toHaveLength(1);
    expect(screen.getAllByText("0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e")).toHaveLength(1);
  });

  it("should render 'Endorse change of ownership' when there is a change in ownership from previous beneficiary (new title escrow created)", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={endorseBeneficiaryEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Endorse change of ownership")).toHaveLength(2);
  });

  it("should render address of new beneficiary when there is a change in ownership from previous beneficiary (new title escrow created)", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={endorseBeneficiaryEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Endorse change of ownership")).toHaveLength(2);
    expect(screen.getAllByText("0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e")).toHaveLength(1);
  });

  it("should render 'Transferred to wallet' when there is a change in ownership to the beneficiary's address", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={transferToWalletEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Transferred to wallet")).toHaveLength(1);
  });

  it("should render address of beneficiary when there is a change in ownership to the beneficiary's address", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={transferToWalletEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("0x6FFeD6E6591b808130a9b248fEA32101b5220eca")).toHaveLength(3);
  });

  it("should render 'Document surrendered to issuer' when document is surrendered and sent to token registry", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={surrenderEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Document surrendered to issuer")).toHaveLength(1);
  });

  it("should render 'Surrender of document rejected' when surrendered document is rejected by token registry", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={rejectSurrenderedEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Surrender of document rejected")).toHaveLength(1);
  });

  it("should render addresses of previous beneficiary and holder when surrendered document is rejected by token registry", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={rejectSurrenderedEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Surrender of document rejected")).toHaveLength(1);
    expect(screen.getAllByText("0x6FFeD6E6591b808130a9b248fEA32101b5220eca")).toHaveLength(4);
  });

  it("should render 'Surrender of document accepted' when surrendered document is accepted and burnt by token registry", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={acceptSurrenderedEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Surrender of document accepted")).toHaveLength(1);
  });

  it("should fire setShowEndorsementChain when back button is clicked", async () => {
    const mockSetShowEndorsementChain = jest.fn();
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        endorsementChain={transferHolderEndorsementChain}
        setShowEndorsementChain={mockSetShowEndorsementChain}
        error={""}
        pending={false}
      />
    );
    act(() => {
      fireEvent.click(screen.getByTestId("back-button"));
    });
    expect(mockSetShowEndorsementChain).toHaveBeenCalledTimes(1);
  });
});
