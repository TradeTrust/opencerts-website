describe(
  "Nominate Owner",
  {
    retries: {
      runMode: 5,
      openMode: 0,
    },
  },
  () => {
    context("Nominate Owner", () => {
      it("should go to verify page, upload a file, connect to wallet and nominate owner successfully", () => {
        cy.visit("/verify");
        cy.get("input[type=file]").attachFile("ebl-nominate-owner.json");
        cy.get("[data-testid='asset-title-owner']").should("be.visible");
        cy.get("[data-testid='asset-title-holder']").should("be.visible");
        cy.get("[data-testid='connectToWallet']").click();
        cy.get("[data-testid='manageAssetDropdown']").click();
        cy.get("[data-testid='nominateBeneficiaryHolderDropdown']").click();
        cy.get("[data-testid='editable-input-owner']").type("0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60");
        cy.get("[data-testid='nominationBtn']").click();
        cy.confirmMetamaskTransaction();
        cy.get("[data-testid='non-editable-input-owner']").should(
          "have.text",
          "0xe0A71284EF59483795053266CB796B65E48B5124"
        );
        cy.get("[data-testid='overlay-title']").should("have.text", "Nomination Success");
      });
    });

    context("Accept Nominated Owner", () => {
      it("should go to verify page, upload a file, connect a wallet and endorse nominated owner successfully", () => {
        cy.switchMetamaskAccount(2).should("be.true");
        cy.visit("/verify");
        cy.get("input[type=file]").attachFile("ebl-nominate-owner.json");
        cy.get("[data-testid='asset-title-owner']").should("be.visible");
        cy.get("[data-testid='asset-title-holder']").should("be.visible");
        cy.get("[data-testid='connectToWallet']").click();
        cy.get("[data-testid='manageAssetDropdown']").click();
        cy.get("[data-testid='endorseTransferDropdown']").click();
        cy.get("[data-testid='endorseTransferBtn']").click();
        cy.confirmMetamaskTransaction();
        cy.get("[data-testid='non-editable-input-owner']").should(
          "have.text",
          "0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60"
        );
        cy.get("[data-testid='non-editable-input-holder']").should(
          "have.text",
          "0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60"
        );
        cy.get("[data-testid='overlay-title']").should("have.text", "Endorse Ownership/Holdership Success");
      });
    });
  }
);
