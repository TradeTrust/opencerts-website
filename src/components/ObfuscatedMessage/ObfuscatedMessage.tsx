import { WrappedDocument, v2, utils } from "@govtechsg/open-attestation";
import React, { FunctionComponent } from "react";

interface ObfuscatedMessageProps {
  document: WrappedDocument<v2.OpenAttestationDocument>;
}

export const ObfuscatedMessage: FunctionComponent<ObfuscatedMessageProps> = ({ document }) => {
  if (!utils.isObfuscated(document)) return null;

  return (
    <div className="text-lg font-bold text-rose" data-testid="obfuscation-info">
      <p className="py-6">Note: There are fields/data obfuscated in this document.</p>
    </div>
  );
};
