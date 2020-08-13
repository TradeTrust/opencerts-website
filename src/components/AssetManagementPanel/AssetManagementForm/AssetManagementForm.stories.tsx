import React, { useState } from "react";
import { AssetManagementForm } from "./AssetManagementForm";
import { AssetManagementActions } from "../AssetManagementActions";
import { FormState } from "../../../constants/FormState";
import { Overlay } from "./../../UI/Overlay";
import { OverlayContextProvider } from "./../../../common/contexts/OverlayContext";

export default {
  title: "TitleTransfer/AssetManagementForm",
  component: AssetManagementForm,
  parameters: {
    componentSubtitle: "All various scenarios with title transfer.",
  },
};

export const NotLoggedIn = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account=""
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const NoMatch = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <OverlayContextProvider>
      <Overlay />
      <AssetManagementForm
        isLoading={false}
        setShowEndorsementChain={() => {}}
        account="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        onConnectToWallet={() => alert("Login to Metamask")}
        beneficiary="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
        approvedBeneficiary=""
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        approvedHolder=""
        formAction={assetManagementAction}
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSetFormAction={setAssetManagementAction}
        isSurrendered={false}
        onSurrender={() => alert("Surrender document")}
        surrenderingState={FormState.UNINITIALIZED}
        onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
        holderTransferringState={FormState.UNINITIALIZED}
        onEndorseBeneficiary={(newBeneficiary, newHolder) =>
          alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
          alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        approveNewTransferTargetsState={FormState.UNINITIALIZED}
        onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferToNewEscrowState={FormState.UNINITIALIZED}
        contractOwnerType="TitleEscrow"
      />
    </OverlayContextProvider>
  );
};

export const BeneficiaryAndHolder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const Beneficiary = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const Holder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const HolderWithApprovedBeneficiaryAndApprovedHolder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const SurrenderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.Surrender);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.PENDING_CONFIRMATION}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const Surrendered = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const TransferHolderError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferHolder);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.ERROR}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const TransferHolderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferHolder);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const EndorseChangeBeneficiaryError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseBeneficiary);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.ERROR}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const EndorseChangeBeneficiaryPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseBeneficiary);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.PENDING_CONFIRMATION}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const NominateBeneficiaryAndHolderError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiaryHolder);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.ERROR}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const NominateBeneficiaryAndHolderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiaryHolder);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.PENDING_CONFIRMATION}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const EndorseTransferHolderBeneficiary = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseTransfer);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      contractOwnerType="TitleEscrow"
    />
  );
};

export const EndorseTransferHolderBeneficiaryPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseTransfer);

  return (
    <AssetManagementForm
      isLoading={false}
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.PENDING_CONFIRMATION}
      contractOwnerType="TitleEscrow"
    />
  );
};
