import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import prettyBytes from "pretty-bytes";
import { mixin, vars } from "../../../styles";
import { Paperclip } from "react-feather";
import { getData, WrappedDocument, v2 } from "@govtechsg/open-attestation";
import { getLogger } from "../../../utils/logger";

const { error } = getLogger("component:attachmentlink");

export interface AttachmentLinkProps {
  filename: string;
  data: string;
  type?: string;
  path?: string;
}

interface OriginalDocumentProps extends v2.OpenAttestationDocument {
  links?: {
    self?: {
      href: string;
    };
  };
}

interface ExtensionIconProps {
  src: string;
}

const ExtensionIcon: FunctionComponent<ExtensionIconProps> = ({ ...props }) => {
  return <img {...props} className="max-w-full" />;
};

export const getExtension = (mimeType: string | undefined): React.ReactNode => {
  switch (true) {
    case mimeType === "text/csv" ||
      mimeType === "application/vnd.ms-excel" ||
      mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <ExtensionIcon src="/static/images/fileicons/csv.svg" data-testid="attachment-icon-csv" />;
    case mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword":
      return <ExtensionIcon src="/static/images/fileicons/doc.svg" data-testid="attachment-icon-doc" />;
    case mimeType === "image/jpeg":
      return <ExtensionIcon src="/static/images/fileicons/jpg.svg" data-testid="attachment-icon-jpg" />;
    case mimeType === "image/png":
      return <ExtensionIcon src="/static/images/fileicons/png.svg" data-testid="attachment-icon-png" />;
    case mimeType === "application/pdf":
      return <ExtensionIcon src="/static/images/fileicons/pdf.svg" data-testid="attachment-icon-pdf" />;
    case mimeType === "text/plain":
      return <ExtensionIcon src="/static/images/fileicons/txt.svg" data-testid="attachment-icon-txt" />;
    default:
      return (
        <div className="icon" data-testid={`attachment-icon-paperclip`}>
          <Paperclip />
        </div>
      );
  }
};

//sending message to child window
const openTab = (data: string) => {
  const childWin = window.open(`${window.location}/#verify-documents`, "_blank");
  window.addEventListener(
    "message",
    (event) => {
      if (event.data.type == "READY" && childWin) {
        childWin.postMessage(
          {
            type: "LOAD_DOCUMENT",
            payload: data,
          },
          `${window.location.href}`
        );
      }
    },
    false
  );
};

const isOpenAttestationFile = (decodedData: string) => {
  try {
    const decodedJson = JSON.parse(decodedData);
    const unwrappedDocument = getData<WrappedDocument<OriginalDocumentProps>>(decodedJson);
    if (!unwrappedDocument) throw new Error("File is not OA document"); //non-OA document returns undefined
    return true;
  } catch (e) {
    error("decode data not json: " + e);
    return false;
  }
};

export const AttachmentLink = ({ filename, data, type, path }: AttachmentLinkProps) => {
  let filesize = "0";
  let canOpenFile = false;
  const hasBase64 = !!(data && type);
  const downloadHref = hasBase64 ? `data:${type};base64,${data}` : path || "#";
  const decodedData = atob(data);
  canOpenFile = isOpenAttestationFile(decodedData);
  filesize = prettyBytes(decodedData.length);

  return (
    <Attachment>
      <div className="flex flex-row">
        <div className="w-auto mr-4">{getExtension(type)}</div>
        <div className="w-5/6">
          <p className="filetext break-all">
            <span className="filename">{filename}</span>
            {hasBase64 && <span className="filesize">&nbsp;({filesize})</span>}
          </p>
          <div className="flex">
            <div className="w-auto mr-2">
              <a
                href={downloadHref}
                download={`${filename}`}
                data-testid="attachment-download-link"
                className="downloadtext hover:underline"
              >
                Download
              </a>
            </div>
            {canOpenFile && data && (
              <div className="w-auto">
                <a
                  onClick={() => {
                    openTab(data);
                  }}
                  rel="noopener noreferrer"
                  className="downloadtext hover:underline"
                  data-testid="attachment-open-link"
                >
                  Open
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Attachment>
  );
};

export const Attachment = styled.div`
  transition: background-color 0.3s ${vars.easeOutCubic};
  display: inline-block;
  width: 100%;
  border: solid 1px ${vars.greyLighter};
  padding: 10px 15px;
  height: 100%;

  &:hover {
    text-decoration: none;
    background-color: ${vars.blueLighter};

    .filename {
      color: ${vars.greyDark};
    }
  }

  .icon {
    background-color: ${vars.greyLighter};
    color: ${vars.greyDark};
    padding: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;

    svg {
      margin: auto;
    }
  }

  .filetext {
    margin-bottom: 8px;
  }

  .filename {
    transition: color 0.3s ${vars.easeOutCubic};
    ${mixin.fontSourcesansproBold};
    line-height: 1.2;
    color: ${vars.grey};
    overflow-wrap: break-word;
  }

  .filesize {
    display: inline-block;
    ${mixin.fontSourcesansproRegular};
    color: ${vars.grey};
    ${mixin.fontSize(13)};
  }

  .downloadtext {
    color: ${vars.blue};
  }
`;
