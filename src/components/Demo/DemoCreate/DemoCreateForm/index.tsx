import { Button, ProgressBar } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { DemoCreateButtonRow } from "../DemoCreateButtonRow";
import { DemoFormContext } from "../DemoFormContext";
import { DemoCreateFormItem } from "./DemoCreateFormItem";
import { schema } from "./schema";
import { FormItemSchema } from "./types";

export const DemoCreateForm: FunctionComponent = () => {
  const { formValues, setFormValues, setCurrentStep } = useContext(DemoFormContext);

  const handleChange = (name: string, value: string) => {
    // parse name
    let keys = name.split(".");
    let obj = formValues;

    while (keys.length > 1) {
      obj = obj[keys[0]];
      keys = keys.slice(1);
    }

    obj[keys[0]] = value;

    setFormValues(formValues);
  };

  return (
    <>
      <ProgressBar totalSteps={3} step={1} />
      <div className="my-4">
        <h3 className="my-3">Fill in Details of CoO</h3>
        <p>The form is already pre-filled for your convenience, feel free to make changes if needed. </p>
      </div>
      <div>
        {Object.entries(schema).map(([formItemName, formItem]) => {
          return (
            <DemoCreateFormItem
              key={formItemName}
              onChange={handleChange}
              formItemName={formItemName}
              formItem={formItem as FormItemSchema}
            />
          );
        })}
      </div>
      <DemoCreateButtonRow />
    </>
  );
};
