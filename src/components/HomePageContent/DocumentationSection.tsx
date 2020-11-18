import styled from "@emotion/styled";
import React from "react";
import { mixin, vars } from "../../styles";
import { Section } from "../Layout/Section";

export const SectionDocumentation = styled(Section)`
  padding-top: 80px;
  padding-bottom: 80px;
  text-align: center;

  h1 {
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 600;
  }

  p {
    color: ${vars.greyDark};
  }

  a {
    display: block;
    color: ${vars.greyDark};
    text-decoration: none;

    p {
      transition: color 0.3s ${vars.easeOutCubic};
      color: ${vars.blue};
      ${mixin.fontSourcesansproBold};
    }

    &:hover {
      .fa-file-alt,
      .fa-code {
        color: ${vars.brandNavy};
      }

      p {
        color: ${vars.brandOrange};
      }
    }
  }

  .fa-file-alt,
  .fa-code {
    transition: color 0.3s ${vars.easeOutCubic};
    margin-bottom: 20px;
  }

  .fa-file-alt {
    ${mixin.fontSize(50)}
  }

  .fa-code {
    ${mixin.fontSize(40)}
  }
`;

export const DocumentationSection = () => {
  return (
    <SectionDocumentation id="integrate" className="bg-grey-100">
      <div className="mb-12">
        <h1 className="mb-3">Integrate TradeTrust into your platform?</h1>
        <p>Get started today! Browse the Documentation or download the source code.</p>
      </div>
      <div className="flex justify-center items-end">
        <div className="w-auto px-8">
          <a href="https://docs.tradetrust.io/" target="_blank" rel="noopener noreferrer">
            <i className="far fa-file-alt" />
            <p>Documentation</p>
          </a>
        </div>
        <div className="w-auto px-8">
          <a href="https://github.com/tradeTrust/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-code" />
            <p>Source code</p>
          </a>
        </div>
      </div>
    </SectionDocumentation>
  );
};
