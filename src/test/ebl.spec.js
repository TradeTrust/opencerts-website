import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";
import { Selector } from "testcafe";

fixture("Token Document Rendering").page`http://localhost:3000`;

test("Token is verified and rendered correctly", async () => {
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});

// Skipped test due to changing verify to different page
const VerifyDocuments = Selector("button").withText("Verify Doc");
// eslint-disable-next-line jest/no-disabled-tests
test.skip("Should be able to render certificate twice consecutively", async (t) => {
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

  await t.click(VerifyDocuments);
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
