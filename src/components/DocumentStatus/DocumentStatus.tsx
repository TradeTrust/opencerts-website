import { VerificationFragment, VerificationFragmentWithData, utils } from "@govtechsg/oa-verify";
import React, { FunctionComponent } from "react";
import { NETWORK_NAME } from "../../config";
import { StatusChecks } from "./StatusChecks";
import { useSelector } from "react-redux";
import { utils as oaUtils, WrappedDocument, v3 } from "@govtechsg/open-attestation";

interface VerificationFragmentData {
  did: string;
  location: string;
  status: string;
}

const getV2FormattedDomainNames = (verificationStatus: VerificationFragment[]) => {
  const joinIssuers = (issuers: string[] | undefined): string => {
    if (!issuers) return "Unknown";
    const issuerNames = issuers.join(", ");
    return issuerNames?.replace(/,(?=[^,]*$)/, " and"); // regex to find last comma, replace with and
  };

  const formatIdentifier = (fragment: VerificationFragmentWithData<VerificationFragmentData[]>): string | undefined => {
    switch (fragment.name) {
      case "OpenAttestationDnsTxtIdentityProof":
      // using fall through to get both cases
      case "OpenAttestationDnsDidIdentityProof":
        return joinIssuers(fragment.data?.map((issuer) => issuer.location.toUpperCase()));
      case "OpenAttestationDidIdentityProof":
        return joinIssuers(fragment.data?.map((issuer) => issuer.did.toUpperCase()));
      default:
        return "Unknown";
    }
  };
  const identityProofFragment = utils
    .getIssuerIdentityFragments(verificationStatus)
    .find((fragment) => utils.isValidFragment(fragment)) as VerificationFragmentWithData;

  const dataFragment = identityProofFragment?.data;
  const fragmentValidity =
    dataFragment?.length > 0 &&
    dataFragment?.every(
      (issuer: { status: string; verified: boolean }) => issuer.status === "VALID" || issuer.verified === true
    ); // every will return true even though dataFragment is empty, hence the additional check for length

  return fragmentValidity ? formatIdentifier(identityProofFragment) : "Unknown";
};

export const getV3IdentityVerificationText = (document: WrappedDocument<v3.OpenAttestationDocument>): string => {
  return document.openAttestationMetadata.identityProof.identifier.toUpperCase();
};

export const IssuedBy: FunctionComponent = () => {
  const certificateState = useSelector((state: any) => state?.certificate);
  const { rawModified: document, verificationStatus } = certificateState;

  const formattedDomainNames = oaUtils.isWrappedV2Document(document)
    ? getV2FormattedDomainNames(verificationStatus)
    : getV3IdentityVerificationText(document);
  return (
    <h2 id="issuedby" className="mb-0 text-cloud-900 text-lg font-semibold">
      <span className="mr-1 inline-block break-all">Issued by</span>
      <span className="text-cerulean inline-block break-all">{formattedDomainNames}</span>
    </h2>
  );
};

export const DocumentStatus: FunctionComponent = () => {
  return (
    <div className="container">
      <div id="document-status" className="py-4">
        <div className="flex flex-col">
          <div className="flex-grow">{NETWORK_NAME !== "local" && <IssuedBy />}</div>
          <StatusChecks />
        </div>
      </div>
    </div>
  );
};
