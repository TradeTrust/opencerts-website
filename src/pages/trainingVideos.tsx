import React from "react";
import { Helmet } from "react-helmet";
import { MediaCard } from "../components/UI/MediaCard";
import { RegisterButton } from "./../components/WebinarPageContent/RegisterButton";

export const TrainingVideosPage = () => (
  <>
    <Helmet>
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:description" content="Add Tradetrust description" />
      <meta property="og:url" content={`${window.location.origin}/training-videos`} />
      <title>TradeTrust - Training Videos</title>
    </Helmet>
    <div className="container-custom py-5">
      <div className="row">
        <div className="col-12">
          <h1>Training Videos</h1>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="TradeTrust Overview" youtubeEmbedCode="3-ZRuPCa2k4">
            <p>
              This non-technical session helps provide a foundational and critical understanding of TradeTrust as a
              digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.
            </p>
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Creation of Verifiable Documents" placeholderText="Coming soon after 22 Jul 2020">
            <p>
              This Webinar focuses on the creation of verifiable documents. These are documents that do not have the
              functionality of transferring title.
            </p>
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Creation of Transferable Documents" placeholderText="Coming soon after 29 Jul 2020">
            <p>
              This segment will focus on the creation of transferable documents. Join this session to learn how to
              create a transferable document and how to perform a title transfer.
            </p>
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Critical Functions of TradeTrust" placeholderText="Coming soon after 5 Aug 2020">
            <p>
              In this session we will cover critical functions such as reading and verifying a TradeTrust file through
              two types of approaches: a) front-end; and b) programmatically.
            </p>
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Set Up and Change Templates" placeholderText="Coming soon after 12 Aug 2020">
            <p>
              Building on sessions 2 and 3, this session will walk you through the steps on how to: configure documents;
              set up schema in a configuration file; and change document templates.
            </p>
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Identity Resolution Services" placeholderText="Coming soon after 19 Aug 2020">
            <p>
              Identity Resolution in TradeTrust involves the ability to map non-readable identification of issuers to a
              readable form. This segment will cover the methods and the steps on building APIs for identity resolution.
            </p>
          </MediaCard>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-auto mx-auto">
          <RegisterButton>Register for Webinar Series</RegisterButton>
        </div>
      </div>
    </div>
  </>
);
