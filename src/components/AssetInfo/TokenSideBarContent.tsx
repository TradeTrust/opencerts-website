import React, { useState, useEffect } from "react";
import { getLogger } from "../../utils/logger";
import css from "./TokenSideBar.scss";
import TokenSideBarHolder from "./TokenSideBarHolder";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";
import {
  changeHolder,
  endorseBeneficiaryTransfer,
  endorseTransfer,
  surrenderToken,
  deployEscrowContract
} from "../../services/token";
import TokenTransactionSuccess from "./TokenTransactionSuccess";
import { TOKEN_ACTION_TYPES, getSuccessResponse } from "./util";
const { trace, error } = getLogger("component:TokenSideBarContent");
import getUserRoles, { UserRole } from "../../utils/UserRolesUtil";
import { useSelector } from "react-redux";
import { NETWORK_NAME } from "../../config";
interface TokenSideBarContentProps {
  adminAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
  registryAddress: string;
}

const TokenSideBarContent = ({
  adminAddress,
  beneficiaryAddress,
  holderAddress,
  registryAddress
}: TokenSideBarContentProps) => {
  const userRole = getUserRoles({ adminAddress, holderAddress, beneficiaryAddress });
  const [newHolder, setNewHolder] = useState("");
  const [approvedBeneficiary, setApprovedBeneficiary] = useState("");
  const [approvedHolder, setApprovedHolder] = useState("");

  const tokenSidebarError = { accessDenied: false, networkMismatch: false, metamaskNotFound: false };
  trace(`admin address: ${adminAddress}, holder address: ${holderAddress}, beneficiary address: ${beneficiaryAddress}`);
  const [showActionLoader, toggleActionLoader] = useState(false);
  const [actionError, setActionError] = useState<{ type: TOKEN_ACTION_TYPES; message: string } | null>(null);
  const [transactionSuccessResponse, setTransactionSuccessResponse] = useState<{
    type: TOKEN_ACTION_TYPES;
    hash: string;
    message: string;
  } | null>(null);

  const {
    networkIdVerbose,
    metamaskNotFound,
    approvedEscrowContractAddress,
    approvedBeneficiaryAddress,
    approvedHolderAddress
  } = useSelector((state: any) => ({
    networkIdVerbose: state.application.networkIdVerbose,
    metamaskNotFound: state.admin.metamaskNotFound,
    approvedBeneficiaryAddress: state.token.approvedBeneficiaryAddress,
    approvedHolderAddress: state.token.approvedHolderAddress,
    approvedEscrowContractAddress: state.token.approvedEscrowContractAddress
  }));

  const isEqualBeneficiaryAndHolder = userRole === UserRole.HolderBeneficiary;
  const showHolder = userRole === UserRole.Holder || isEqualBeneficiaryAndHolder;
  const showBeneficiary = userRole === UserRole.Beneficiary && !isEqualBeneficiaryAndHolder;
  tokenSidebarError.accessDenied = userRole === UserRole.NoMatch;
  tokenSidebarError.networkMismatch = NETWORK_NAME.toLowerCase() !== networkIdVerbose.toLowerCase();
  tokenSidebarError.metamaskNotFound = metamaskNotFound;

  trace(`config network: ${NETWORK_NAME} and metamask network: ${networkIdVerbose}`);
  trace(`error in sidebar access ${JSON.stringify(tokenSidebarError)}`);
  useEffect(() => {
    if (approvedBeneficiaryAddress) setApprovedBeneficiary(approvedBeneficiaryAddress);
    if (approvedHolderAddress) setApprovedHolder(approvedHolderAddress);
  }, [approvedBeneficiaryAddress, approvedHolderAddress]);

  const handleFormActions = async (fn: Function, actionType: TOKEN_ACTION_TYPES, value = "") => {
    try {
      setActionError(null);
      setTransactionSuccessResponse(null);
      toggleActionLoader(true);
      const hash = await fn(value);
      trace(`transaction mined hash: ${hash}`);
      setTransactionSuccessResponse({ type: actionType, hash, message: getSuccessResponse(actionType) });
      toggleActionLoader(false);
    } catch (e) {
      error(`handle action error ${JSON.stringify(e)}`);
      toggleActionLoader(false);
      setActionError({ type: actionType, message: e.message || e.reason });
    }
  };

  const deployEscrowContractAction = async () => {
    try {
      setActionError(null);
      setTransactionSuccessResponse(null);
      toggleActionLoader(true);
      const contractAddress = approvedEscrowContractAddress
        ? approvedEscrowContractAddress
        : await deployEscrowContract({
            registryAddress,
            beneficiaryAddress: approvedBeneficiary,
            holderAddress: approvedHolder
          });
      trace(`escrow contract address to mint ${contractAddress}`);
      toggleActionLoader(false);
      return contractAddress;
    } catch (e) {
      error(`handle action error ${JSON.stringify(e)}`);
      toggleActionLoader(false);
      setActionError({ type: TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY, message: e.message || e.reason });
    }
  };

  const approveChangeBeneficiary = async () => {
    const contractAddress = await deployEscrowContractAction();
    handleFormActions(endorseTransfer, TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY, contractAddress);
  };

  const transferHoldership = async () => {
    handleFormActions(changeHolder, TOKEN_ACTION_TYPES.CHANGE_HOLDER, newHolder);
  };

  const changeBeneficiary = async () => {
    const contractAddress = await deployEscrowContractAction();
    handleFormActions(endorseBeneficiaryTransfer, TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY, contractAddress);
  };

  const surrenderDocument = () => {
    handleFormActions(surrenderToken, TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT);
  };

  if (transactionSuccessResponse) {
    return (
      <TokenTransactionSuccess hash={transactionSuccessResponse.hash} message={transactionSuccessResponse.message} />
    );
  }

  return (
    <>
      {showActionLoader && (
        <div className={css.overlay}>
          <div className="loader" />
        </div>
      )}
      <TokenSideBarNoMatch errorType={tokenSidebarError}>
        <>
          {showHolder && (
            <TokenSideBarHolder
              isEqualBeneficiaryAndHolder={isEqualBeneficiaryAndHolder}
              approvedBeneficiaryAddress={approvedBeneficiary}
              approvedHolderAddress={approvedHolder}
              newHolder={newHolder}
              setApprovedBeneficiary={setApprovedBeneficiary}
              setApprovedHolder={setApprovedHolder}
              setNewHolder={setNewHolder}
              transferHoldership={transferHoldership}
              changeBeneficiary={changeBeneficiary}
              surrenderDocument={surrenderDocument}
              error={actionError}
            />
          )}
          {showBeneficiary && (
            <TokenSideBarBeneficiary
              setApprovedBeneficiary={setApprovedBeneficiary}
              setApprovedHolder={setApprovedHolder}
              approveChangeBeneficiary={approveChangeBeneficiary}
              approvedHolder={approvedHolder}
              approvedBeneficiary={approvedBeneficiary}
              error={actionError}
            />
          )}
        </>
      </TokenSideBarNoMatch>
    </>
  );
};

export default TokenSideBarContent;
