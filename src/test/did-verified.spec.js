import { uploadDocument, validateIframeTexts, validateIssuerTexts, location } from "./helper";

fixture("DID Certificate Rendering").page`${location}`;

test("sample document is rendered correctly when dns is verified", async (t) => {
  await uploadDocument("./fixture/sample-did-verified.json");
  await validateIssuerTexts(["ETHR:0XE712878F6E8D5D4F9E87E10DA604F9CB564C9A89"]);

  await validateIframeTexts([
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "DEMO CUSTOMS",
    "Certification by Singapore Customs",
    "AQSIQ170923130",
  ]);
});
