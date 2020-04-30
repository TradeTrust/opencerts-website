import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";
import { SvgIcon, SvgIconX } from "../../../UI/SvgIcon";

export interface OverlayContentProps {
  className?: string;
  title: string;
  titleIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const OverlayContent = ({ className, title, titleIcon, children, ...props }: OverlayContentProps) => {
  const { isOverlayVisible, setOverlayVisible } = useContext(OverlayContext);
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <CSSTransition in={isOverlayVisible} timeout={300} classNames="fadescale" appear>
      <div className={`overlay-content ${className}`} {...props}>
        <div className="overlay-header">
          <div className="row no-gutters align-items-center">
            {titleIcon && (
              <div className="col-auto mr-1">
                <div className="title-icon">{titleIcon}</div>
              </div>
            )}
            <div className="col">
              <h3 className="overlay-title">{title}</h3>
            </div>
            <div className="col-auto ml-auto">
              <div className="overlay-cancel" onClick={handleCloseOverlay}>
                <SvgIcon>
                  <SvgIconX />
                </SvgIcon>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-body">
          <div className="d-flex flex-column h-100">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
