import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import React, { createContext, useContext, useEffect, useState, useCallback, FunctionComponent } from "react";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useProviderContext } from "../provider";
import { useSupportsInterface } from "../../hooks/useSupportsInterface";
import { useTokenRegistryContract } from "../../hooks/useTokenRegistryContract";
import { TradeTrustErc721 } from "@govtechsg/token-registry/types/TradeTrustErc721";
import { useRestoreToken } from "../../hooks/useRestoreToken";
import { ContractFunctionState, useContractFunctionHook } from "./hooks/ethers-contract-hook";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GetURIStub = (params: Record<string, unknown>): Promise<string | undefined> => {
  return Promise.resolve("");
};

interface TokenInformationContext {
  tokenRegistryAddress?: string;
  tokenId?: string;
  beneficiary?: string;
  holder?: string;
  documentOwner?: string;
  approvedBeneficiary?: string;
  approvedHolder?: string;
  changeHolder: typeof GetURIStub;
  changeHolderState: ContractFunctionState;
  transferTo: typeof GetURIStub;
  transferToState: ContractFunctionState;
  endorseBeneficiary: TitleEscrow["endorseBeneficiary"];
  endorseBeneficiaryState: ContractFunctionState;
  approveNewTransferTargets: typeof GetURIStub;
  approveNewTransferTargetsState: ContractFunctionState;
  transferToNewEscrow: typeof GetURIStub;
  transferToNewEscrowState: ContractFunctionState;
  initialize: (tokenRegistryAddress: string, tokenId: string) => void;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  isTitleEscrow?: boolean;
  resetStates: () => void;
  destroyToken: typeof GetURIStub;
  destroyTokenState: ContractFunctionState;
  restoreToken: TradeTrustErc721["restoreToken"];
  restoreTokenState: ContractFunctionState;
}

const contractFunctionStub = () => {
  return undefined as any;
};

export const TokenInformationContext = createContext<TokenInformationContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize: () => {},
  changeHolder: GetURIStub,
  changeHolderState: "UNINITIALIZED",
  transferTo: GetURIStub,
  transferToState: "UNINITIALIZED",
  endorseBeneficiary: GetURIStub,
  endorseBeneficiaryState: "UNINITIALIZED",
  isSurrendered: false,
  isTokenBurnt: false,
  documentOwner: "",
  approveNewTransferTargets: GetURIStub,
  approveNewTransferTargetsState: "UNINITIALIZED",
  transferToNewEscrow: GetURIStub,
  transferToNewEscrowState: "UNINITIALIZED",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetStates: () => {},
  destroyToken: GetURIStub,
  destroyTokenState: "UNINITIALIZED",
  restoreToken: contractFunctionStub,
  restoreTokenState: "UNINITIALIZED",
});

interface TokenInformationContextProviderProps {
  children: React.ReactNode;
}

export const TokenInformationContextProvider: FunctionComponent<TokenInformationContextProviderProps> = ({
  children,
}) => {
  const [tokenId, setTokenId] = useState<string>();
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState<string>();
  const { getTransactor } = useProviderContext();
  const transactor = getTransactor();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, transactor);
  const { titleEscrow, updateTitleEscrow, documentOwner } = useTitleEscrowContract(transactor, tokenRegistry, tokenId);
  const isSurrendered = documentOwner === tokenRegistryAddress;
  const isTokenBurnt = documentOwner === "0x000000000000000000000000000000000000dEaD"; // check if the token belongs to burn address.

  // First check whether Contract is TitleEscrow
  const { isInterfaceType: isTitleEscrow } = useSupportsInterface(titleEscrow, "0xdcce2211"); // 0xdcce2211 is from TitleEscrow's ERC165 https://github.com/Open-Attestation/token-registry/blob/5cdc6d2ccda4fbbfcbd429ca90c3049e72bc1e56/contracts/TitleEscrow.sol#L56

  // Contract Read Functions
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedBeneficiary, value: approvedBeneficiary } = useContractFunctionHook(
    titleEscrow,
    "approvedBeneficiary"
  );
  const { call: getApprovedHolder, value: approvedHolder } = useContractFunctionHook(titleEscrow, "approvedHolder");

  const {
    getURI: destroyToken,
    // send: polldestroyToken,
    state: destroyTokenState,
    reset: resetDestroyingTokenState,
  } = useContractFunctionHook(tokenRegistry, "destroyToken");

  const { restoreToken, state: restoreTokenState } = useRestoreToken(transactor, tokenRegistry, tokenId);

  // Contract Write Functions (available only after provider has been upgraded)
  const {
    getURI: transferTo,
    // send: polltransferTo,
    state: transferToState,
    reset: resetTransferTo,
  } = useContractFunctionHook(titleEscrow, "transferTo");
  const {
    getURI: changeHolder,
    // send: pollchangeHolder,
    state: changeHolderState,
    reset: resetChangeHolder,
  } = useContractFunctionHook(titleEscrow, "changeHolder");
  const {
    getURI: endorseBeneficiary,
    // send: pollendorseBeneficiary,
    state: endorseBeneficiaryState,
    reset: resetEndorseBeneficiary,
  } = useContractFunctionHook(titleEscrow, "transferToNewEscrow");
  const {
    getURI: approveNewTransferTargets,
    // send: pollapproveNewTransferTargets,
    state: approveNewTransferTargetsState,
    reset: resetApproveNewTransferTargets,
  } = useContractFunctionHook(titleEscrow, "approveNewTransferTargets");
  const {
    getURI: transferToNewEscrow,
    // send: polltransferToNewEscrow,
    state: transferToNewEscrowState,
    reset: resetTransferToNewEscrow,
  } = useContractFunctionHook(titleEscrow, "transferToNewEscrow");

  const resetProviders = useCallback(() => {
    resetTransferTo();
    resetDestroyingTokenState();
    resetChangeHolder();
    resetEndorseBeneficiary();
    resetApproveNewTransferTargets();
    resetTransferToNewEscrow();
  }, [
    resetDestroyingTokenState,
    resetApproveNewTransferTargets,
    resetChangeHolder,
    resetEndorseBeneficiary,
    resetTransferTo,
    resetTransferToNewEscrow,
  ]);

  const resetStates = useCallback(() => {
    setTokenId(undefined);
    setTokenRegistryAddress(undefined);
  }, []);

  const initialize = useCallback((address: string, id: string) => {
    setTokenId(id);
    setTokenRegistryAddress(address);
  }, []);

  // Fetch all new information when title escrow is initialized or updated (due to actions)
  useEffect(() => {
    if (isTitleEscrow) {
      // only fetch TitleEscrow info after we determine owner is a Title Escrow contract
      getHolder();
      getApprovedHolder();
      getBeneficiary();
      getApprovedBeneficiary();
    }
  }, [getApprovedBeneficiary, getApprovedHolder, getBeneficiary, getHolder, isTitleEscrow]);

  // Update holder whenever holder transfer is successful
  useEffect(() => {
    if (changeHolderState === "CONFIRMED") getHolder();
  }, [changeHolderState, getHolder]);

  // Update entire title escrow whenever endorse is successful
  useEffect(() => {
    if (endorseBeneficiaryState === "CONFIRMED") updateTitleEscrow();
  }, [endorseBeneficiaryState, updateTitleEscrow]);

  // Update entire title escrow whenever transferTo is successful
  useEffect(() => {
    if (transferToState === "CONFIRMED") updateTitleEscrow();
  }, [transferToState, updateTitleEscrow]);

  // Update entire title escrow whenever token is burnt
  useEffect(() => {
    if (destroyTokenState === "CONFIRMED") updateTitleEscrow();
  }, [destroyTokenState, updateTitleEscrow]);

  useEffect(() => {
    if (restoreTokenState === "CONFIRMED") updateTitleEscrow();
  }, [restoreTokenState, updateTitleEscrow]);

  // Update entire title escrow whenever endorse transfer to beneficiary and holder is successful
  useEffect(() => {
    if (transferToNewEscrowState === "CONFIRMED") updateTitleEscrow();
  }, [transferToNewEscrowState, updateTitleEscrow]);

  // Reset states for all write functions when provider changes to allow methods to be called again without refreshing
  useEffect(resetProviders, [resetProviders, transactor]);

  return (
    <TokenInformationContext.Provider
      value={{
        tokenId,
        tokenRegistryAddress,
        initialize,
        holder: holder?.[0],
        beneficiary: beneficiary?.[0],
        approvedBeneficiary: approvedBeneficiary?.[0],
        approvedHolder: approvedHolder?.[0],
        changeHolder,
        endorseBeneficiary,
        transferTo,
        changeHolderState,
        endorseBeneficiaryState,
        transferToState,
        destroyTokenState,
        destroyToken,
        isSurrendered,
        isTokenBurnt,
        isTitleEscrow,
        documentOwner,
        approveNewTransferTargets,
        approveNewTransferTargetsState,
        transferToNewEscrow,
        transferToNewEscrowState,
        resetStates,
        restoreToken,
        restoreTokenState,
      }}
    >
      {children}
    </TokenInformationContext.Provider>
  );
};

export const useTokenInformationContext = (): TokenInformationContext =>
  useContext<TokenInformationContext>(TokenInformationContext);
