import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useOverlayContext, OverlayContent } from "@govtechsg/tradetrust-ui-components";
import { PersonaProps } from "../../../types";
import { Steps } from "./Steps";
import { ContentType } from "../../../types";

export const PersonaModal: FunctionComponent<PersonaProps> = ({ personaIndex, details }) => {
  const { setOverlayVisible, showOverlay } = useOverlayContext();
  const [selectedContentType, setSelectedContentType] = useState<ContentType>(ContentType.THEN);
  const contentType: ContentType[] = [ContentType.THEN, ContentType.NOW];
  const handleCloseOverlay = (): void => {
    setOverlayVisible(false);
    showOverlay(undefined);
  };

  const { title, thenSteps, nowSteps, startMessage, benefits, endMessage } = details.learnMore;

  const contentTypeFilterStyle = (item: ContentType): string => {
    const returnStyle = item === ContentType.THEN ? "mr-5" : "";
    return item === selectedContentType ? `${returnStyle} font-gilroy-bold underline cursor-default` : returnStyle;
  };

  return (
    <section id="persona-modal">
      <OverlayContent title="" className="max-h-[90vh] text-white bg-cerulean-500 rounded-xl">
        <div
          className="mx-5 my-0 bg-cover relative flex flex-col text-white p-5 overflow-auto h-auto"
          style={{ backgroundImage: "url('/static/images/common/wave-lines-light-2.png')" }}
        >
          <div className="flex flex-col justify-center">
            <div className="relative flex justify-center w-full">
              <h3 className="text-center">{title}</h3>
              {thenSteps && nowSteps && (
                <div className="hidden absolute bottom-0 right-0 lg:block">
                  <div className="flex justify-end">
                    <p>Manual Process</p>
                    <div className="lg:w-8 lg:mt-3 lg:ml-3.5 lg:border-t lg:border-white lg:border-dashed" />
                  </div>
                  <div className="flex justify-end">
                    <p>Digital Process</p>
                    <div className="lg:w-8 lg:mt-3 lg:ml-3.5 lg:border-t lg:border-white lg:border-solid" />
                  </div>
                </div>
              )}
            </div>
            {startMessage && <h4 className="text-center mt-8">{startMessage}</h4>}
            {thenSteps && nowSteps && (
              <div className="flex flex-row justify-center lg:hidden">
                {contentType.map((content, index) => (
                  <h3
                    key={index}
                    className={`font-normal text-lemon-500 text-center mt-12 cursor-pointer ${contentTypeFilterStyle(
                      content
                    )}`}
                    onClick={() => setSelectedContentType(content)}
                  >
                    {content}
                  </h3>
                ))}
              </div>
            )}
            {thenSteps &&
              nowSteps &&
              contentType.map((content, index) => (
                <div key={index} className="flex flex-col justify-center">
                  <div className={`lg:inline ${content === selectedContentType ? "inline" : "hidden"}`}>
                    <Steps contentType={content} stepsDetails={content === ContentType.THEN ? thenSteps : nowSteps} />
                  </div>
                </div>
              ))}
            {benefits && <Steps contentType={ContentType.BENEFIT} stepsDetails={benefits} />}
            <h4 className="text-center mt-8">{endMessage}</h4>
          </div>
          <Link
            to="/demo"
            className="px-4 py-2 mx-auto mt-8 rounded-xl text-white bg-tangerine-500 hover:bg-tangerine-800 hover:text-cloud-100"
            onClick={handleCloseOverlay}
            data-testid={`get-in-touch-${personaIndex}`}
          >
            <h3 className="font-normal text-2xl">Try Our Demo Now</h3>
          </Link>
        </div>
      </OverlayContent>
    </section>
  );
};
