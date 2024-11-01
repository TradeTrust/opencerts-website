import { Button, LoaderSpinner, OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { X } from "react-feather";
import { FormState } from "../../../constants/FormState";

interface ActionManagementSkeletonProps {
  actionTitle: string;
  handleAction: () => void;
  actionState: string;
  remarkValue: string;
  setRemarkValue: (value: string) => void;
}

export const RejectActionTitle = {
  HOLDERSHIP: "Holdership",
  OWNERSHIP: "Ownership",
  OWNERSHIP_AND_HOLDERSHIP: "Ownership & Holdership",
};

export const ActionManagementSkeleton: FunctionComponent<ActionManagementSkeletonProps> = ({
  actionTitle,
  handleAction,
  actionState,
  remarkValue,
  setRemarkValue,
}) => {
  const isInitalized = actionState === FormState.INITIALIZED;
  const { closeOverlay } = useContext(OverlayContext);

  return (
    <div
      id="overlay"
      className={`font-gilroy bg-white !w-[606px] !Smax-h-[392px] flex w-full flex-col rounded-xl bg-white font-medium leading-5 tracking-[0px] text-neutral-600 z-20`}
    >
      <div id="header" className="flex flex-wrap items-center gap-4 min-[596px]:flex-nowrap p-6 pb-4">
        <div className="flex flex-shrink-0 items-center justify-center">
          <div className="h-7 w-7" style={{ backgroundImage: "url('/static/images/dropzone/attention.svg')" }} />
        </div>
        <h3>Warning - Reject {actionTitle}</h3>
      </div>
      <div id="body" className="px-6 py-4">
        <div className="text-center">
          <span>
            <p className="mb-3 text-center">
              It seems like you are rejecting the {actionTitle} that is transferred to you. Would you like to provide a
              reason and confirm?
            </p>
            <p className="mb-3 text-center">
              Any remarks provided will be accessible in the endorsement chain by any verifiers of this document.
            </p>
          </span>
        </div>
        <div className="flex flex-col justify-end pt-3">
          <div className="flex justify-end rounded-xl border border-solid border-cerulean-500 p-2 h-20 items-top ">
            <textarea
              value={remarkValue}
              onChange={(e) => setRemarkValue(e.target.value)}
              placeholder="Remarks"
              className="text-zinc-800 bg-transparent border-none outline-none w-full h-full resize-none overflow-hidden"
              data-testid="editable-remarks-input"
            />
            {remarkValue && <X className="h-5 w-5 flex-shrink-0 cursor-pointer" onClick={() => setRemarkValue("")} />}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="h-4 w-4 flex-shrink-0"
            style={{ backgroundImage: "url('/static/images/dropzone/info.svg')" }}
          />
          <h6 className="font-gilroy  w-[500px] flex-shrink-0 font-medium text-[14px] leading-[18px] text-[#636569] text-left">
            Optional
          </h6>
        </div>
      </div>
      <div id="footer" className="p-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-x-20 gap-y-6 text-center text-xl font-bold leading-6 min-[596px]:flex-nowrap">
          <Button
            className="bg-white text-cerulean-500 hover:bg-cloud-100 px-[18px] py-3"
            onClick={() => closeOverlay()}
            data-testid={`cancelReject${actionTitle}Btn`}
          >
            Cancel
          </Button>
          <Button
            className="px-[18px] py-3 bg-cerulean-500 text-white hover:bg-cerulean-800"
            onClick={() => handleAction()}
            data-testid={`confirmReject${actionTitle}Btn`}
          >
            {isInitalized ? <LoaderSpinner data-testid={"loader"} /> : <>Confirm</>}
          </Button>
        </div>
      </div>
    </div>
  );
};
