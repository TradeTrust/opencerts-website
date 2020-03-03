export const initialState = {
  beneficiaryAddress: "",
  holderAddress: "",
  approvedEscrowContractAddress: "",
  approvedHolderAddress: "",
  approvedBeneficiaryAddress: "",
  getApprovedEscrowUsersPending: false,
  getApprovedEscrowUsersSuccess: false,
  getApprovedEscrowUsersError: false,
  isEscrowContract: false,
  getTokenUsersAddressPending: false,
  getTokenUsersAddressSuccess: false,
  getTokenUsersAddressError: false,
  initializeTokenPending: false,
  initializeTokenSuccess: false,
  initializeTokenError: false,
  tokenOwnershipTransferPending: false,
  tokenOwnershipTransferSuccess: false,
  tokenOwnershipTransferError: false
};

// Actions
export const types = {
  GET_TOKEN_USER_ADDRESS: "GET_TOKEN_USER_ADDRESS",
  GET_TOKEN_USER_ADDRESS_SUCCESS: "GET_TOKEN_USER_ADDRESS_SUCCESS",
  GET_TOKEN_USER_ADDRESS_ERROR: "GET_TOKEN_USER_ADDRESS_ERROR",
  IS_ESCROW_CONTRACT_SUCCESS: "IS_ESCROW_CONTRACT_SUCCESS",
  IS_ESCROW_CONTRACT_ERROR: "IS_ESCROW_CONTRACT_ERROR",
  INITIALIZE_TOKEN: "INITIALIZE_TOKEN",
  INITIALIZE_TOKEN_SUCCESS: "INITIALIZE_TOKEN_SUCCESS",
  INITIALIZE_TOKEN_ERROR: "INITIALIZE_TOKEN_ERROR",
  TRANSFER_TOKEN_OWNERSHIP: "TRANSFER_TOKEN_OWNERSHIP",
  TRANSFER_TOKEN_OWNERSHIP_SUCCESS: "TRANSFER_TOKEN_OWNERSHIP_SUCCESS",
  TRANSFER_TOKEN_OWNERSHIP_ERROR: "TRANSFER_TOKEN_OWNERSHIP_ERROR",
  GET_APPROVED_ESCROW_USERS: "GET_APPROVED_ESCROW_USERS",
  GET_APPROVED_ESCROW_USERS_SUCCESS: "GET_APPROVED_ESCROW_USERS_SUCCESS",
  GET_APPROVED_ESCROW_USERS_ERROR: "GET_APPROVED_ESCROW_USERS_ERROR"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_TOKEN_USER_ADDRESS:
      return {
        ...state,
        getTokenUsersAddressPending: false,
        getTokenUsersAddressSuccess: false,
        getTokenUsersAddressError: false,
        isEscrowContract: false
      };
    case types.GET_TOKEN_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        getTokenUsersAddressPending: false,
        getTokenUsersAddressSuccess: true,
        beneficiaryAddress: action.payload.beneficiaryAddress,
        holderAddress: action.payload.holderAddress,
        approvedEscrowContractAddress: action.payload.approvedEscrowContractAddress
      };
    case types.GET_TOKEN_USER_ADDRESS_ERROR:
      return {
        ...state,
        getTokenUsersAddressPending: false,
        getTokenUsersAddressError: action.payload
      };
    case types.GET_APPROVED_ESCROW_USERS:
      return {
        ...state,
        getApprovedEscrowUsersPending: true,
        getApprovedEscrowUsersSuccess: false,
        getApprovedEscrowUsersError: false
      };
    case types.GET_APPROVED_ESCROW_USERS_SUCCESS:
      return {
        ...state,
        getApprovedEscrowUsersPending: false,
        getApprovedEscrowUsersSuccess: true,
        approvedBeneficiaryAddress: action.payload.approvedBeneficiary,
        approvedHolderAddress: action.payload.approvedHolder
      };
    case types.GET_APPROVED_ESCROW_USERS_ERROR:
      return {
        ...state,
        getTokenUsersAddressPending: false,
        getApprovedEscrowUsersError: action.payload
      };
    case types.IS_ESCROW_CONTRACT_ERROR:
      return {
        ...state,
        isEscrowContract: false
      };
    case types.IS_ESCROW_CONTRACT_SUCCESS:
      return {
        ...state,
        isEscrowContract: true
      };
    case types.INITIALIZE_TOKEN:
      return {
        ...state,
        initializeTokenPending: true,
        initializeTokenSuccess: false,
        initializeTokenError: false
      };
    case types.INITIALIZE_TOKEN_SUCCESS:
      return {
        ...state,
        initializeTokenPending: false,
        initializeTokenSuccess: true
      };
    case types.INITIALIZE_TOKEN_ERROR:
      return {
        ...state,
        initializeTokenPending: false,
        initializeTokenError: true
      };
    case types.TRANSFER_TOKEN_OWNERSHIP:
      return {
        ...state,
        tokenOwnershipTransferPending: true,
        tokenOwnershipTransferSuccess: false,
        tokenOwnershipTransferError: false
      };
    case types.TRANSFER_TOKEN_OWNERSHIP_SUCCESS:
      return {
        ...state,
        tokenOwnershipTransferPending: false,
        tokenOwnershipTransferSuccess: true
      };
    case types.TRANSFER_TOKEN_OWNERSHIP_ERROR:
      return {
        ...state,
        tokenOwnershipTransferPending: false,
        tokenOwnershipTransferError: action.payload
      };
    default:
      return state;
  }
}

export const getTokenUserAddress = () => ({
  type: types.GET_TOKEN_USER_ADDRESS
});

export const getTokenUserAddressSuccess = payload => ({
  type: types.GET_TOKEN_USER_ADDRESS_SUCCESS,
  payload
});

export const getTokenUserAddressError = payload => ({
  type: types.GET_TOKEN_USER_ADDRESS_ERROR,
  payload
});

export const getApprovedEscrowUsers = () => ({
  type: types.GET_APPROVED_ESCROW_USERS
});

export const getApprovedEscrowUsersSuccess = payload => ({
  type: types.GET_APPROVED_ESCROW_USERS_SUCCESS,
  payload
});

export const getApprovedEscrowUsersError = payload => ({
  type: types.GET_APPROVED_ESCROW_USERS_ERROR,
  payload
});

export const setIsEscrowContractSuccess = () => ({
  type: types.IS_ESCROW_CONTRACT_SUCCESS
});

export const setIsEscrowContractError = () => ({
  type: types.IS_ESCROW_CONTRACT_ERROR
});

export const initializeToken = () => ({
  type: types.INITIALIZE_TOKEN
});

export const initializeTokenSuccess = () => ({
  type: types.INITIALIZE_TOKEN_SUCCESS
});

export const initializeTokenFailure = payload => ({
  type: types.INITIALIZE_TOKEN_ERROR,
  payload
});

export const transferTokenOwnership = payload => ({
  type: types.TRANSFER_TOKEN_OWNERSHIP,
  payload
});

export const transferTokenOwnershipSuccess = payload => ({
  type: types.TRANSFER_TOKEN_OWNERSHIP_SUCCESS,
  payload
});

export const transferTokenOwnershipFailure = payload => ({
  type: types.TRANSFER_TOKEN_OWNERSHIP_ERROR,
  payload
});
