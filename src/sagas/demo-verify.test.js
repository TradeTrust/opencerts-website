import * as demoVerify from "../reducers/demo-verify";
import * as verify from "../services/verify";
import { verifyDemoDocument } from "./demo-verify";
import {
  whenDocumentValidAndIssuedByDns,
  whenDocumentHashInvalidAndNotIssued,
} from "../test/fixture/verifier-responses";
import { runSaga } from "redux-saga";

async function recordSaga(saga, initialAction) {
  const dispatched = [];

  await runSaga(
    {
      getState: () => ({ demo: { rawModifiedDocument: "DEMO_DOCUMENT_OBJECT" } }),
      dispatch: (action) => dispatched.push(action),
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}

describe("verifyDemoDocument", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should verify the document and change the router to /demoViewer when verification passes", async () => {
    const initialAction = { type: "demo-verify/updateDemoDocument" };
    const getDemoDocument = jest
      .spyOn(demoVerify, "getDemoDocument")
      .mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    jest.spyOn(verify, "verifyDocument").mockImplementation(() => Promise.resolve(whenDocumentValidAndIssuedByDns));
    const dispatched = await recordSaga(verifyDemoDocument, initialAction);

    expect(getDemoDocument).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual({
      type: "demo-verify/verifyDemoDocumentCompleted",
      payload: whenDocumentValidAndIssuedByDns,
    });

    //TODO: test for path as it will redirect to /demoViewer if success
  });

  it("should verify the document and dont update the router when verification fails", async () => {
    const initialAction = { type: "demo-verify/updateDemoDocument" };
    const getDemoDocument = jest
      .spyOn(demoVerify, "getDemoDocument")
      .mockImplementation(() => Promise.resolve(whenDocumentHashInvalidAndNotIssued));
    jest
      .spyOn(verify, "verifyDocument")
      .mockImplementation(() => Promise.reject(new Error("Failed to verify document")));
    const dispatched = await recordSaga(verifyDemoDocument, initialAction);

    expect(getDemoDocument).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual({
      type: "demo-verify/verifyDemoDocumentFailure",
      payload: "Failed to verify document",
    });
  });
});
