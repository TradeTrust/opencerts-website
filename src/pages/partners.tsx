import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../components/Layout/Page";
import { Button, ButtonSize } from "@govtechsg/tradetrust-ui-components";
import { PartnersContent } from "../components/PartnersContent";

export const PartnersPage: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <meta name="terms of use" content="Terms Of Use" />
        <meta property="og:terms of use" content="Terms Of Use" />
        <meta property="og:title" content="TradeTrust - Terms Of Use" />
        <meta property="og:url" content={`${window.location.origin}/terms-of-use`} />
        <title>TradeTrust - Terms Of Use</title>
      </Helmet>
      <Page title="Partners">
        <p className="font-medium mb-5">
          Here are the partners we have worked with you may want to contact. Do note that being on this list implies
          that these companies have demonstrated knowledge of implementing TradeTrust, but does not imply endorsement by
          TradeTrust.
        </p>
        <a
          href="https://form.gov.sg/63b7e833df5f2900128cdbb6"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="partner-form-link"
        >
          <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 mb-5" size={ButtonSize.SM}>
            Be a Partner
          </Button>
        </a>
        <PartnersContent />
      </Page>
    </>
  );
};
