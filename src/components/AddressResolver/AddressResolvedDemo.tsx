// THIS COMPONENT IS TO BE REMOVED, FOR DEMO PURPOSES ONLY

import React from "react";
import { useIdentifierResolver } from "../../common/hooks/useIdentifierResolver";

export const AddressResolvedDemo = ({ address }: { address: string }) => {
  const { resolvedIdentifier } = useIdentifierResolver(address);
  // console.log({}, resolvedIdentifier);
  return <b>{resolvedIdentifier}</b>;
};
