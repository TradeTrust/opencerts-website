import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { ProviderContext } from "../../../../common/contexts/provider";
import { deployingDocStore, getDocumentPrepared } from "../../../../reducers/demo-create";
import { getFunds } from "../../../../services/create";
import { DemoCreateContext } from "../contexts/DemoCreateContext";
import { LoadingModal } from "../../LoadingModal";

export const DemoCreateStart: FunctionComponent = () => {
  const { account, provider } = useContext(ProviderContext);
  const { setActiveStep } = useContext(DemoCreateContext);
  const [loading, setLoading] = useState(false);

  const { prepared, error } = useSelector(getDocumentPrepared);

  const dispatch = useDispatch();

  const handleStart = async () => {
    setLoading(true);

    const balance = await provider.getBalance("latest");
    const formattedBalance = Number(ethers.utils.formatEther(balance));

    if (formattedBalance <= 1) {
      await getFunds(account as string);
    }

    dispatch(deployingDocStore(provider));
  };

  useEffect(() => {
    if (prepared) {
      setActiveStep("form");
      setLoading(false);
    }

    if (error) {
      setLoading(false);
    }
  }, [prepared, error, setActiveStep]);

  const features = [
    {
      img: "circle-form.png",
      title: "Fill up the content for CoO",
    },
    {
      img: "circle-load.png",
      title: "Issue a CoO via TradeTrust",
    },
    {
      img: "circle-verify.png",
      title: "Verify it to make sure it’s not tempered with",
    },
  ];

  return (
    <>
      {loading && (
        <LoadingModal
          title="Preparing..."
          content={
            <p>
              Please do not navigate out of this demo.
              <br />
              This process might take a while
            </p>
          }
        />
      )}
      <p className="mt-4 mb-4">Here&#39;s what you can do with this Demo:</p>
      <div className="flex justify-around">
        {features.map(({ img, title }) => {
          return (
            <div key={img} className="w-1/3 px-3">
              <img alt={title} className="mx-auto h-32" src={`/static/images/demo/${img}`} />
              <p className="text-cerulean text-center">{title}</p>
            </div>
          );
        })}
      </div>
      {error ? (
        <div className="mt-12">
          <h3 className="text-center">
            There maybe something wrong with the underlying network, please try again later.
          </h3>
        </div>
      ) : (
        <Button onClick={handleStart} className="flex mx-auto bg-cerulean text-white mt-8 hover:bg-cerulean-300">
          Start Now
        </Button>
      )}
    </>
  );
};
