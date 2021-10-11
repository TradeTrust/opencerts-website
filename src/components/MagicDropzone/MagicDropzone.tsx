import React, { FunctionComponent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { isValid } from "@govtechsg/oa-verify";
import { Button, ButtonSize, LoaderSpinner } from "@govtechsg/tradetrust-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { DetailedErrors } from "../DocumentDropzone/DetailedErrors";
import { updateDemoDocument, resetDemoState } from "../../reducers/demo-verify";

enum MagicDropzoneState {
  DRAG_REJECT = "border-red-400 bg-red-100",
  DRAG_ACTIVE = "border-green-400 bg-green-50",
  DRAG_ACCEPT = "border-green-400 bg-green-50",
  PENDING = "border-cloud-100 bg-white",
  ERROR = "border-red-400 bg-red-100",
  DEFAULT = "border-cloud-100 bg-white",
}

interface GetMagicDropzoneBoxUi {
  isDragReject: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isPending: boolean;
  isError: boolean | null;
}

const getMagicDropzoneBoxUi = ({
  isDragReject,
  isDragActive,
  isDragAccept,
  isPending,
  isError,
}: GetMagicDropzoneBoxUi) => {
  switch (true) {
    case isDragReject:
      return MagicDropzoneState.DRAG_REJECT;
    case isDragActive:
      return MagicDropzoneState.DRAG_ACTIVE;
    case isDragAccept:
      return MagicDropzoneState.DRAG_ACCEPT;
    case isPending:
      return MagicDropzoneState.PENDING;
    case isError:
      return MagicDropzoneState.ERROR;
    default:
      return MagicDropzoneState.DEFAULT;
  }
};

interface MagicDropzoneViewProps {
  isPending: boolean;
  isError: boolean | null;
  resetDocument: () => void;
}

const MagicDropzoneView: FunctionComponent<MagicDropzoneViewProps> = ({ isPending, isError, resetDocument }) => {
  const verificationStatus = useSelector((state: RootState) => state.demoVerify.verificationStatus);

  switch (true) {
    case isPending:
      return (
        <div>
          <LoaderSpinner data-testid={"veriyfing-spinner"} className="mx-auto" width="50px" primary="#0099cc" />
          <p className="m-4 text-2xl">Verifying Document...</p>
        </div>
      );
    case isError:
      return (
        <div>
          <div className="flex justify-center items-center my-4">
            <div className="w-auto mr-2">
              <img src="/static/images/dropzone/invalid.svg" alt="Document invalid" />
            </div>
            <div className="w-auto">
              <p className="text-2xl">This document is not valid</p>
            </div>
          </div>
          <DetailedErrors verificationStatus={verificationStatus} />
          <Link
            to="/faq"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button className={`text-white bg-red-500 border-red-500 hover:bg-red-300 hover:border-red-300`}>
              What Should I do?
            </Button>
          </Link>
          <br />
          <div
            data-testid="try-another"
            className="my-8 transition-colors duration-200 underline cursor-pointer text-red-500 hover:text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              resetDocument();
            }}
          >
            Try another document
          </div>
        </div>
      );
    default:
      return (
        <div>
          <h2 className="absolute top-0 left-0 right-0 mt-8 mx-auto text-gray-600 text-opacity-10 text-7xl lg:text-9xl">
            DEMO
          </h2>
          <img
            className="mx-auto w-56"
            alt="Dropzone TradeTrust"
            src="/static/images/dropzone/dropzone_illustration.svg"
          />
          <h4>Drop your TradeTrust demo document to view its content</h4>
          <p className="my-6">Or</p>
          <Button className="bg-cerulean text-white hover:bg-cerulean-500" size={ButtonSize.SM}>
            Select Document
          </Button>
        </div>
      );
  }
};

export const MagicDropzone: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((state: RootState) => state.demoVerify.verificationPending);
  const verificationStatus = useSelector((state: RootState) => state.demoVerify.verificationStatus);
  const isError = verificationStatus && !isValid(verificationStatus);

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      acceptedFiles.forEach((file: Blob) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          try {
            const json = JSON.parse(reader.result as string);
            dispatch(updateDemoDocument(json)); // pushes to `demo/viewer` page
          } catch (e) {
            console.log(e);
          }
        };
        reader.readAsText(file);
      });
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    // accept: "application/json", // TODO: https://react-dropzone.js.org/#!/Accepting%20specific%20file%20types
  });
  const dropzoneBoxUi = getMagicDropzoneBoxUi({
    isPending,
    isDragActive,
    isDragAccept,
    isDragReject,
    isError,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={`border-2 border-dashed rounded-xl text-center relative p-8 min-h-400 flex flex-col justify-center ${dropzoneBoxUi}`}
      >
        <MagicDropzoneView isPending={isPending} isError={isError} resetDocument={resetDemoState} />
      </div>
    </div>
  );
};
