import styled from "@emotion/styled";
import { VerificationFragment, VerificationFragmentWithData, utils } from "@govtechsg/oa-verify";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";
import { NETWORK_NAME } from "../../config";
import { StatusChecks } from "./StatusChecks";

interface DocumentStatusProps {
  verificationStatus: VerificationFragment[];
}

interface VerificationFragmentData {
  did: string;
  location: string;
  status: string;
}

export const IssuedBy: FunctionComponent<DocumentStatusProps> = ({ verificationStatus }) => {
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
  const formattedDomainNames = fragmentValidity ? formatIdentifier(identityProofFragment) : "Unknown";

  return (
    <h3 id="issuedby" className="mb-0 issuedby">
      <span className="mr-1">Issued by</span>
      <span className="domain">{formattedDomainNames}</span>
    </h3>
  );
};

export const DocumentStatus: FunctionComponent<DocumentStatusProps> = ({ verificationStatus }) => {
  return (
    <DocumentStatusStyles>
      <div className="container">
        <div id="document-status" className="statusbar">
          <div className="flex flex-col xl:flex-row">
            <div className="flex-grow">
              {NETWORK_NAME !== "local" && <IssuedBy verificationStatus={verificationStatus} />}
            </div>
            <StatusChecks verificationStatus={verificationStatus} />
          </div>
        </div>
      </div>
    </DocumentStatusStyles>
  );
};

const DocumentStatusStyles = styled.div`
  ${tw`py-4`}

  .statusbar {
    ${tw`bg-white p-4 rounded`}
  }

  .issuedby {
    ${tw`text-gray-700 text-lg font-semibold`}

    span {
      ${tw`inline-block`}
      word-break: break-all;
    }

    .domain {
      ${tw`text-cerulean-500`}
    }
  }

  .message {
    ${tw`text-sm leading-5`}
  }
`;
