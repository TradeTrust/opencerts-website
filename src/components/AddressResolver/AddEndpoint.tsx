import React, { useState } from "react";
import { InputDefault } from "./../UI/Input";
import { ButtonSolidOrangeWhite } from "./../UI/Button";
import { useThirdPartyAPIEndpoints } from "./../../common/hooks/useThirdPartyAPIEndpoints";

export const AddEndpoint = () => {
  const [endpointAPI, setEndpointAPIValue] = useState("");
  const [endpointName, setEndpointNameValue] = useState("");
  const { addThirdPartyAPIEndpoint } = useThirdPartyAPIEndpoints();

  const onEndpointAPIChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndpointAPIValue(event.target.value);
  };

  const onEndpointNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndpointNameValue(event.target.value);
  };

  const onSaveApiEndpoint = () => {
    addThirdPartyAPIEndpoint({
      name: endpointName,
      endpoint: endpointAPI,
    });
    setEndpointAPIValue("");
    setEndpointNameValue("");
  };

  return (
    <div className="row align-items-center my-4">
      <div className="col-12">
        <b>AddEndpoint (Settings):</b>
      </div>
      <div className="col-auto">
        <InputDefault className="mb-0 w-100" onChange={onEndpointNameChanged} value={endpointName} placeholder="Name" />
      </div>
      <div className="col">
        <InputDefault
          className="mb-0 w-100"
          onChange={onEndpointAPIChanged}
          value={endpointAPI}
          placeholder="Endpoint"
        />
      </div>
      <div className="col-auto">
        <ButtonSolidOrangeWhite onClick={onSaveApiEndpoint}>Save</ButtonSolidOrangeWhite>
      </div>
    </div>
  );
};
