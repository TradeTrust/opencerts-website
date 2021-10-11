import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ProviderContext } from "../../../../common/contexts/provider";
import { deployingDocStore } from "../../../../reducers/demo-create";
import { getFunds } from "../../../../services/create";
import { DemoCreateContext } from "../contexts/DemoCreateContext";

export const DemoCreateStart: FunctionComponent = () => {
  const { account, provider } = useContext(ProviderContext);
  const { setActiveStep } = useContext(DemoCreateContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleStart = async () => {
    setLoading(true);

    try {
      await getFunds(account as string);
      dispatch(deployingDocStore(provider));
      setActiveStep("form");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <>
      <h4 className="mt-8">Create CoO</h4>
      <p className="mt-8">
        See how a TradeTrust Document can be issued and provide your bank the assurance of document integrity
      </p>
      {loading ? (
        "getting funds"
      ) : error.length > 0 ? (
        error
      ) : (
        <Button onClick={handleStart} className="bg-cerulean text-white mt-8 hover:bg-cerulean-300">
          Start Now
        </Button>
      )}
    </>
  );
};
