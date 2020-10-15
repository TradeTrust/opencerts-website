import { Selector } from "testcafe";
import { validateTextContent, uploadDocument } from "./helper";

fixture("Load AddressBook").page`http://localhost:3000`;

const TitleTransferPanel = Selector("#title-transfer-panel");
const BeneficiaryName = Selector("th").withText("Bank of China");
const HolderName = Selector("th").withText("DBS");
const OverlayAddressBook = Selector("[data-testid='overlay-addressbook']");
const OverlayAddressBookTableBodyRows = Selector("[data-testid='overlay-addressbook'] tbody tr");
const OverlayAddressBookTableFirstRow = Selector("[data-testid='overlay-addressbook'] tbody tr:first-of-type");
const OverlayAddressBookSearchInput = Selector("[data-testid='overlay-addressbook'] input[type='text']");
const ButtonUploadAddressBook = Selector("[data-testid='multi-button'] button").withText("Address Book");
const CSVFileInput = Selector("#csv-file-input");

test("AddressBook local names to be resolved correctly, search filtered to 1", async (t) => {
  await uploadDocument("./fixture/ebl.json");
  await TitleTransferPanel.with({ visibilityCheck: true })();
  await t.expect(ButtonUploadAddressBook.count).eql(1);

  await t.click(ButtonUploadAddressBook);
  await OverlayAddressBook.with({ visibilityCheck: true })();
  await validateTextContent(t, OverlayAddressBookTableFirstRow.find("td"), ["No address found."]);

  await t.setFilesToUpload(CSVFileInput, ["./fixture/local-addressbook.csv"]);
  await t.expect(OverlayAddressBookTableBodyRows.count).notEql(0);
  await validateTextContent(t, BeneficiaryName, ["Bank of China"]);
  await validateTextContent(t, HolderName, ["DBS"]);

  await t.typeText(OverlayAddressBookSearchInput, "Bank of China");
  await t.expect(OverlayAddressBookTableFirstRow.nextSibling().visible).notOk();

  await t.selectText(OverlayAddressBookSearchInput).pressKey("delete");
  await t.typeText(OverlayAddressBookSearchInput, "0x2");
  await t.expect(OverlayAddressBookTableFirstRow.nextSibling().visible).notOk();
});
