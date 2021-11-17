import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { CheckCircle, XCircle } from "react-feather";

export const EmailContactUsSuccess: FunctionComponent = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl px-8 py-12 text-center">
      <div className="mb-8 mx-auto md:max-w-sm">
        <div className="mb-4">
          <CheckCircle width="56" height="56" strokeWidth="1" className="text-green-600 mb-2" />
          <h4>Success</h4>
        </div>
        <p>Our engagement team will get in touch with you soon!</p>
      </div>
      <Link href="/">
        <a>
          <Button className="text-blue bg-white hover:bg-grey-100">Back to Home Page</Button>
        </a>
      </Link>
    </div>
  );
};

export const EmailContactUsError: FunctionComponent = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl px-8 py-12 text-center">
      <div className="mb-8 mx-auto md:max-w-sm">
        <div className="mb-4">
          <XCircle width="56" height="56" strokeWidth="1" className="text-red-600 mb-2" />
          <h4>Error</h4>
        </div>
        <p>
          <span className="mr-1">Oops, something is not right here, please try again or contact us directly via</span>
          <a href="mailto:tradetrust@imda.gov.sg">tradetrust@imda.gov.sg</a>
        </p>
      </div>
    </div>
  );
};
