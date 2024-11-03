import { providers } from "ethers";
import { ChainId, ChainInfo } from "../../../constants/chain-info";
import { useProviderContext } from "../../contexts/provider";
import { fetchEscrowTransfersV5 } from "./fetchEscrowTransfer";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Escrow Transfers, V5", () => {
  jest.setTimeout(15000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });

  describe("fetchEscrowTransfersV5, fetch from title escrow transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const escrowTransfers = await fetchEscrowTransfersV5(amoyProvider, "0x050359895a11Fd851a4D879145343D1F7Ddb4fCF");
      expect(escrowTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13977564,
          holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          transactionHash: "0xa81ac02febba3ce2a1a8d4caf723d14c10da981629b939391b0e8f0a668b1471",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13977968,
          holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          transactionHash: "0x68aafaa63ad089dfe4e90cd3a07fba57aba080006712716266c2e29c865d27b6",
          transactionIndex: 1,
          remark: "0x7472616e73666572",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13978194,
          holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          transactionHash: "0xb7c8df0434a63671d7b4c80fd6f2f2b055634bb04ddffad29485a7a3bcb2f5ba",
          transactionIndex: 3,
          remark: "0x2ed149068085e63c4e9d3430d04c9e97be831e723e608511a00004670aaa0507",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13978310,
          holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          transactionHash: "0xa3acca2e7e6b77348a6cfb1020db88d1dd94b15c051500044b21f4a66b8c5be7",
          transactionIndex: 1,
          remark: "0x7472616e7366657220616c6c",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13978345,
          holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          transactionHash: "0xa9d2078b7a582f9c8837368e319c6748ff92dc5ea0fe6869a861952161122c79",
          transactionIndex: 0,
          remark: "0x72656a65637420616c6c",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13978372,
          holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          transactionHash: "0xd22df5e45aac0266f7989077f12e8d3d3bf6bde5eaa8679655fea8f1fa3ddcac",
          transactionIndex: 0,
          remark: "0x",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13979272,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x409a72563f6e452366533d514e706dc9e500ba91bd369520152e83b38d4dbcfb",
          transactionIndex: 0,
          remark: "0x",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          blockNumber: 13977564,
          transactionHash: "0xa81ac02febba3ce2a1a8d4caf723d14c10da981629b939391b0e8f0a668b1471",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          blockNumber: 13978243,
          transactionHash: "0xf3b2d0eef0c463190c8d3ca478cb2d6f7fe6d79e1bb2aab5a219ffdb485380e5",
          transactionIndex: 0,
          remark: "0x6f776e6572",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          blockNumber: 13978273,
          transactionHash: "0x5d1bf97938fb6bf1578f8ca35c3742224766fd077ab08cd5733685d7bef6a834",
          transactionIndex: 0,
          remark: "0x72656a656374206f776e6572",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          blockNumber: 13978310,
          transactionHash: "0xa3acca2e7e6b77348a6cfb1020db88d1dd94b15c051500044b21f4a66b8c5be7",
          transactionIndex: 1,
          remark: "0x7472616e7366657220616c6c",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          blockNumber: 13978345,
          transactionHash: "0xa9d2078b7a582f9c8837368e319c6748ff92dc5ea0fe6869a861952161122c79",
          transactionIndex: 0,
          remark: "0x72656a65637420616c6c",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          blockNumber: 13978413,
          transactionHash: "0x4c3c92efa90dea6ace34e8125f839efdf76b30f81b221a8511ee61b9bc35d28d",
          transactionIndex: 0,
          remark: "0x",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 13979272,
          transactionHash: "0x409a72563f6e452366533d514e706dc9e500ba91bd369520152e83b38d4dbcfb",
          transactionIndex: 0,
          remark: "0x",
        },
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0x050359895a11Fd851a4D879145343D1F7Ddb4fCF",
          blockNumber: 13977564,
          transactionHash: "0xa81ac02febba3ce2a1a8d4caf723d14c10da981629b939391b0e8f0a668b1471",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "RETURN_TO_ISSUER_REJECTED",
          from: "0x0f99945c7Ebae71a9A615c422D716fe1EeaB2B2e",
          to: "0x050359895a11Fd851a4D879145343D1F7Ddb4fCF",
          blockNumber: 13978497,
          transactionHash: "0x0501d2166b4cbac857e0697cd4c17c539c9d52c46bbdc26ca3d6393a4d8da795",
          transactionIndex: 0,
          remark: "0x726573746f7265",
        },
        {
          type: "RETURNED_TO_ISSUER",
          blockNumber: 13978442,
          from: "0x050359895a11Fd851a4D879145343D1F7Ddb4fCF",
          to: "0x0f99945c7Ebae71a9A615c422D716fe1EeaB2B2e",
          transactionHash: "0x34c3c6761fff4535f5a6f88b762f1494aa933f2ec12a41e4bcfc08737e720d71",
          transactionIndex: 0,
          remark: "0x",
        },
        {
          type: "RETURNED_TO_ISSUER",
          blockNumber: 13978538,
          from: "0x050359895a11Fd851a4D879145343D1F7Ddb4fCF",
          to: "0x0f99945c7Ebae71a9A615c422D716fe1EeaB2B2e",
          transactionHash: "0xb7aa88c9088b693c96e297107170b5160b0e95d78fee85d473bcf717d135a70b",
          transactionIndex: 1,
          remark: "0x73757272656e646572",
        },
        {
          type: "REJECT_TRANSFER_OWNERS",
          blockNumber: 13978345,
          transactionHash: "0xa9d2078b7a582f9c8837368e319c6748ff92dc5ea0fe6869a861952161122c79",
          transactionIndex: 0,
          remark: "0x72656a65637420616c6c",
        },
        {
          type: "REJECT_TRANSFER_BENEFICIARY",
          blockNumber: 13978273,
          transactionHash: "0x5d1bf97938fb6bf1578f8ca35c3742224766fd077ab08cd5733685d7bef6a834",
          transactionIndex: 0,
          remark: "0x72656a656374206f776e6572",
        },
        {
          type: "REJECT_TRANSFER_HOLDER",
          blockNumber: 13978194,
          transactionHash: "0xb7c8df0434a63671d7b4c80fd6f2f2b055634bb04ddffad29485a7a3bcb2f5ba",
          transactionIndex: 3,
          remark: "0x2ed149068085e63c4e9d3430d04c9e97be831e723e608511a00004670aaa0507",
        },
        {
          type: "RETURN_TO_ISSUER_ACCEPTED",
          blockNumber: 13979272,
          from: "0x0f99945c7Ebae71a9A615c422D716fe1EeaB2B2e",
          to: "0x00000000000000000000000000000000000dead",
          transactionHash: "0x409a72563f6e452366533d514e706dc9e500ba91bd369520152e83b38d4dbcfb",
          transactionIndex: 0,
          remark: "0x616363657074",
        },
      ]);
    });
  });
});
