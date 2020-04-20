import React from "react";
import css from "./TokenSideBar.scss";
import { SvgIcon, SvgIconChecked } from "./../UI/SvgIcon";

const TokenTransactionSuccess = ({ hash, message }: { hash: string; message: string }) => {
  return (
    <>
      <div className={css["transaction-message"]}>
        <div className={css["success-checked"]}>
          <SvgIcon>
            <SvgIconChecked />
          </SvgIcon>
        </div>
        <p className={`${css["message"]} ${css["message-success"]}`}>{message}</p>
      </div>
      <div className={css["etherscan-address"]}>
        <p>
          <b>Etherscan address:</b>
          <br />
          <a href={`https://ropsten.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">
            {hash}
          </a>
        </p>
      </div>
    </>
  );
};

export default TokenTransactionSuccess;
