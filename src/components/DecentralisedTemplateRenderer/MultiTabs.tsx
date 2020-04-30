import React, { FunctionComponent, useContext } from "react";
import styles from "./multiTabs.scss";
import { ButtonBorderedBlue } from "../UI/Button";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { AddressBook } from "./../../components/UI/Overlay/OverlayContent/AddressBook";

interface MultiTabsProps {
  templates: { id: string; label: string }[];
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
  tokenRegistryAddress: string;
}

export const MultiTabs: FunctionComponent<MultiTabsProps> = ({
  selectedTemplate,
  templates,
  onSelectTemplate,
  tokenRegistryAddress,
}) => {
  const { setOverlayContent, setOverlayVisible } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    setOverlayContent(<AddressBook title="Address Book" data-testid="overlay-addressbook" />);
    setOverlayVisible(true);
  };

  return (
    <div className={`${styles.shadow}`}>
      <div className="container-custom">
        <ul id="template-tabs-list" className="nav nav-tabs row no-gutters align-items-center">
          <li className="nav-item col-auto col-md-auto ml-md-auto order-md-2">
            <a href=" " className="my-auto ml-auto">
              <ButtonBorderedBlue>View another</ButtonBorderedBlue>
            </a>
          </li>
          {tokenRegistryAddress && (
            <li className="nav-item col-auto col-md-auto ml-2 order-md-2">
              <ButtonBorderedBlue onClick={onOverlayHandler}>Address Book</ButtonBorderedBlue>
            </li>
          )}
          {templates && templates.length > 0
            ? templates.map(({ id, label }) => (
                <li key={id} className="nav-item col-12 col-md-auto">
                  <a
                    className={`${styles.tab}
                    ${id === selectedTemplate ? styles.active : ""}`}
                    id={id}
                    onClick={() => {
                      onSelectTemplate(id);
                    }}
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    {label}
                  </a>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};
