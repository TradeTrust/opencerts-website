import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

fixture("Endorsement Chain Rendering").page`${location}`;

const ViewEndorsementChainButton = Selector("#endorsement-chain-button").withText("View Endorsement Chain");
const EndorsementChainTitle = Selector("[data-testid='endorsement-chain-title']").withText("Endorsement Chain");
const EndorsementChainAddress1 = Selector("[data-testid='address-entity']").withText(
  "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
);
const EndorsementChainAddress2 = Selector("[data-testid='address-entity']").withText(
  "0xa61B056dA0084a5f391EC137583073096880C2e3"
);
const EndorsementChainAddress3 = Selector("[data-testid='address-entity']").withText(
  "0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
);
const DocumentIssuedAction = Selector("[data-testid='action-title']").withText("Document has been issued");
const ChangeOwnershipAction = Selector("[data-testid='action-title']").withText("Endorse change of ownership");
const TransferHoldershipAction = Selector("[data-testid='action-title']").withText("Transfer holdership");
const SurrenderToIssuerAction = Selector("[data-testid='action-title']").withText("Document surrendered to issuer");
const SurrenderAcceptedAction = Selector("[data-testid='action-title']").withText("Surrender of document accepted");

test("Endorsement chain title and actions are rendered correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/goerli/v2/ebl-endorsement-chain.json");
  // history chain of events for ebl-endorsement-chain.json are:
  // 1. transfer holder
  // 2. nominate endorsement + accept endorsement
  // 3. endorsement
  // 4. surrender
  // 5. accept surrender

  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);
  await t.wait(3000);
  await t.expect(ViewEndorsementChainButton.count).eql(1);
  await t.click(ViewEndorsementChainButton);

  // add wait 3000 due to endorsement chain component having a little latency because getting endorsement data
  await t.wait(3000);
  await t.expect(EndorsementChainTitle.count).eql(1);
  await t.expect(EndorsementChainAddress1.count).eql(3);
  await t.expect(EndorsementChainAddress2.count).eql(3);
  await t.expect(EndorsementChainAddress3.count).eql(2);
  await t.expect(DocumentIssuedAction.count).eql(1);
  await t.expect(ChangeOwnershipAction.count).eql(3);
  await t.expect(TransferHoldershipAction.count).eql(1);
  await t.expect(SurrenderToIssuerAction.count).eql(1);
  await t.expect(SurrenderAcceptedAction.count).eql(1);
});
