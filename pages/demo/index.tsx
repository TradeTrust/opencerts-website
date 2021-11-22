import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";
import { Page } from "../../src/components/Layout/Page";
import { DemoLayout } from "../../src/components/Demo/DemoLayout";
const DemoContent = dynamic(() => import("../../src/components/Demo/DemoContent"), { ssr: false });

const DemoPage: NextPage<NextPageProps> = ({ headers }) => {
  return (
    <>
      <Head>
        <meta
          property="description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta
          property="og:description"
          content="TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place."
        />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}/demo`} />
        <title>TradeTrust - Demo</title>
      </Head>
      <Page title="Demo">
        <DemoLayout>
          <DemoContent />
        </DemoLayout>
      </Page>
    </>
  );
};

DemoPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default DemoPage;
