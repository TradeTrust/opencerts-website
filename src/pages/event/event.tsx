import styled from "@emotion/styled";
import React, { FunctionComponent, useState } from "react";
import { compareDesc, isFuture, isPast } from "date-fns";
import { Helmet } from "react-helmet";
import { ResourceEvent, EventProps } from "../../components/UI/ResourceEvent";
import { importAll } from "../../common/utils/importAll";
import { Pagination } from "@govtechsg/tradetrust-ui-components";

let events = importAll(require.context("../../../cms/event/", false, /\.md$/)) as EventProps[];

const CategoryFilter = styled.div`
  h5 {
    color: #b4bcc2;

    &:hover {
      color: #454b50;
    }

    &.active {
      color: #454b50;
    }
  }
`;

const getSortedByDateDesc = (items: any[]) => {
  items.sort((a, b): number => {
    return compareDesc(new Date(a.attributes.date), new Date(b.attributes.date));
  });

  return items;
};

export const filterByCategory = (item: string, allEvents: EventProps[]): EventProps[] => {
  switch (true) {
    case item === "All":
      return allEvents;
    case item === "Upcoming Event":
      return allEvents.filter((event) => isFuture(new Date(event.attributes.date)));
    case item === "Past Event":
      return allEvents.filter((event) => isPast(new Date(event.attributes.date)));
    default:
      return allEvents;
  }
};

events = getSortedByDateDesc(events);

export const EventPage: FunctionComponent = () => {
  const categories = ["All", "Upcoming Event", "Past Event"];
  const [category, setCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState<EventProps[]>(events);

  const postsPerPage = 5;
  const totalNoOfPages = Math.ceil(filteredPosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEvent = currentPage * postsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postsPerPage;
  const currentPosts = filteredPosts.filter((post, index) => {
    return index >= indexOfFirstEvent && index < indexOfLastEvent ? post : null;
  });

  return (
    <>
      <Helmet>
        <meta property="description" content="These are media events which TradeTrust has been involved in." />
        <meta property="og:description" content="These are media events which TradeTrust has been involved in." />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${window.location.origin}/media`} />
        <title>TradeTrust - Events</title>
      </Helmet>
      <div className="container py-12">
        <div className="flex">
          <div className="w-full">
            <h1>Event</h1>
          </div>
        </div>
        <CategoryFilter className="mt-2 mb-1">
          {categories.map((item, index) => (
            <h5
              className={`inline-block text-xl mr-4 cursor-pointer ${item === category ? "active" : ""}`}
              key={index}
              data-testid="filter-category"
              onClick={() => {
                setCurrentPage(1);
                setCategory(item);
                setFilteredPosts(filterByCategory(item, events));
              }}
            >
              {item}
            </h5>
          ))}
        </CategoryFilter>
        <div className="flex flex-wrap py-4 -mx-4">
          <div className="w-full px-4 lg:w-9/12">
            {currentPosts.map((event, index) => (
              <ResourceEvent key={index} attributes={event.attributes} />
            ))}
            {events.length > 0 && (
              <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
