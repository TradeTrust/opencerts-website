import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../styles";

interface AddressInfoProps {
  className?: string;
  title: string;
  name?: string;
  children: React.ReactNode;
}

export const AddressInfo = styled(({ className, title, name, children }: AddressInfoProps) => {
  return (
    <div className={`${className}`}>
      <h6>{title}:</h6>
      {name && <h5>{name}</h5>}
      <div className="etherum-address">{children}</div>
    </div>
  );
})`
  h5,
  h6 {
    ${mixin.fontSourcesansproBold};
    margin-bottom: 0;
  }

  h5 {
    margin-bottom: 2px;
  }

  h6 {
    color: $color-grey;
    margin-bottom: 8px;
  }

  .etherum-address {
    display: inline-block;
    word-break: break-all;
  }
`;
