import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Stages } from ".";

export const DemoInitial: FunctionComponent<any> = ({ setFormStage }) => {
  return (
    <div>
      <h5>
        Take the TradeTrust User Journey and have a hands-on experience on how easy it is to streamline your operations
        using TradeTrust
      </h5>
      <h4 className="mt-8">Create CoO</h4>
      <p className="mt-8">
        See how a TradeTrust Document can be issued and provide your bank the assurance of document integrity
      </p>
      <Button
        className="bg-cerulean text-white mt-8 hover:bg-cerulean-300"
        onClick={() => setFormStage(Stages.DOCUMENT_DETAIL)}
      >
        <h5>Start now</h5>
      </Button>
    </div>
  );
};
