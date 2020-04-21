import React from "react";
import styled from "@emotion/styled";
import { mixin } from "../../../styles";

interface LoaderProps {
  width?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Loader = ({ children, ...props }: LoaderProps) => {
  return <div {...props}>{children}</div>;
};

export const LoaderSkeleton = styled(Loader)`
  ${(props) => mixin.loaderSkeleton(props.width)};
`;
