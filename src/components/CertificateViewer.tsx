import React, { useCallback, useState } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { ErrorBoundary } from "./ErrorBoundary";
import { ModalDialog } from "./ModalDialog";
import CertificateSharingForm from "./CertificateSharing/CertificateSharingForm";
import { getTokenRegistryAddress } from "../common/utils/document";
import { DecentralisedRendererContainer } from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import { MultiButtons } from "./MultiButtons";
import { MultiTabs } from "./DecentralisedTemplateRenderer/MultiTabs";
import { DocumentStatus } from "./DocumentStatus";
import { DocumentUtility } from "./DocumentUtility";
import { AssetManagementContainer } from "./AssetManagementPanel/AssetManagementContainer";
import { getData } from "@govtechsg/open-attestation";
import { Tab } from "react-bootstrap";
import { TabPaneAttachments } from "./TabPaneAttachments";

interface CertificateViewerProps {
  document: WrappedDocument;
  verificationStatus: VerificationFragment[];
  shareLink: { id?: string; key?: string };
  showSharing: boolean;
  emailSendingState: string;
  handleSharingToggle: () => void;
  handleSendCertificate: (event: { email: string; captcha: string }) => void;
}

export const CertificateViewer = ({
  document,
  verificationStatus,
  handleSharingToggle,
  showSharing,
  emailSendingState,
  handleSendCertificate,
}: CertificateViewerProps) => {
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const originalData = getData(document);
  const attachments = originalData?.attachments;
  const hasAttachments = attachments && attachments.length > 0;

  const updateTemplates = useCallback(
    (templates) => {
      setTemplates(templates);
      setSelectedTemplate(templates[0].id);

      // reset templates if attachment(s) exists
      if (hasAttachments) {
        // extract all templates that are not attachments
        const templatesModified = templates.filter((item: { id: string }) => {
          return !item.id.includes("attachment");
        });

        // add new templates with tabs of PDF attachments
        attachments.forEach((item: { filename: string; type: string }, index: number) => {
          if (item.type === "application/pdf") {
            templatesModified.push({
              id: `attachment-${index}`,
              label: item.filename,
            });
          }
        });

        // set modified templates
        setTemplates(templatesModified);
        setSelectedTemplate(templatesModified[0].id);
      }
    },
    [attachments, hasAttachments]
  );

  const validCertificateContent = (
    <Tab.Container defaultActiveKey="tab-document">
      <div className="bg-blue-lighter no-print">
        <DocumentStatus verificationStatus={verificationStatus} />
        {tokenRegistryAddress && <AssetManagementContainer document={document} />}
        <MultiButtons tokenRegistryAddress={tokenRegistryAddress} />
        <MultiTabs
          hasAttachments={hasAttachments}
          attachments={attachments}
          templates={templates}
          setSelectedTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      </div>
      <div className="bg-white">
        <Tab.Content className="py-4">
          <Tab.Pane eventKey="tab-document">
            <DocumentUtility className="no-print" document={document} handleSharingToggle={handleSharingToggle} />
            <DecentralisedRendererContainer
              rawDocument={document}
              updateTemplates={updateTemplates}
              selectedTemplate={selectedTemplate}
            />
          </Tab.Pane>
          {hasAttachments && <TabPaneAttachments attachments={attachments} />}
        </Tab.Content>
      </div>
      <ModalDialog show={showSharing} toggle={handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={emailSendingState}
          handleSendCertificate={handleSendCertificate}
          handleSharingToggle={handleSharingToggle}
        />
      </ModalDialog>
    </Tab.Container>
  );

  return <ErrorBoundary>{validCertificateContent}</ErrorBoundary>;
};
