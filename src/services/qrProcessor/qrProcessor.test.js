import { decodeQrCode, processQrCode } from "./index";

const encodeQrCode = (payload) => `https://action.openattestation.com?q=${encodeURIComponent(JSON.stringify(payload))}`;

describe("decodeQrCode", () => {
  it("decodes an action correctly", () => {
    const encodedQrCode =
      "https://action.openattestation.com?q=%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D";

    const action = decodeQrCode(encodedQrCode);
    expect(action).toStrictEqual({
      uri: "https://sample.domain/document/id?q=abc#123",
    });
  });

  it("throws when qr code is malformed", () => {
    const encodedQrCode = "http://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D";
    expect(() => decodeQrCode(encodedQrCode)).toThrow("not formatted");
  });
});

describe("processQrCode", () => {
  it("throws error when uri is not document", async () => {
    const document = { name: "foo" };
    const type = "MANY_DOCUMENT";
    // const { key } = await encryptString(JSON.stringify(document));
    const actionUri = { payload: document, type };
    await expect(() => processQrCode(encodeQrCode(actionUri))).rejects.toThrow(
      `The type ${type} provided from the action is not supported`
    );
  });

  it("fetches calls get with the right parameter when a QR code is scanned", async () => {
    const document = { name: "foo" };
    const actionUri = { payload: document, type: "DOCUMENT" };
    const results = await processQrCode(encodeQrCode(actionUri));
    expect(results).toStrictEqual(document);
  });
});
