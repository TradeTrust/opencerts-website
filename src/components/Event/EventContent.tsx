import styled from "@emotion/styled";
import React, { FunctionComponent, useState } from "react";
import { isFuture, isPast } from "date-fns";
import { ResourceEvent, EventProps } from "../../components/UI/ResourceEvent";
import { importAll } from "../../common/utils/importAll";
import { Pagination, getPaginatedPosts, getPaginatedPagesTotal } from "@govtechsg/tradetrust-ui-components";
import { getSortedByDateDesc } from "../../utils";

let events = importAll(require.context("../../../cms/event/", false, /\.md$/)) as EventProps[];

events = getSortedByDateDesc(events);

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

enum Categories {
  ALL = "All",
  UPCOMING_EVENT = "Upcoming Event",
  PAST_EVENT = "Past Event",
}

export const filterByCategory = (item: string, allEvents: EventProps[]): EventProps[] => {
  switch (true) {
    case item === "Upcoming Event":
      return allEvents.filter((event) => isFuture(new Date(event.attributes.date)));
    case item === "Past Event":
      return allEvents.filter((event) => isPast(new Date(event.attributes.date)));
    default:
      return allEvents;
  }
};

export const EventContent: FunctionComponent = () => {
  const categories: Categories[] = [Categories.ALL, Categories.UPCOMING_EVENT, Categories.PAST_EVENT];
  const [category, setCategory] = useState(Categories.ALL);
  const [filteredPosts, setFilteredPosts] = useState<EventProps[]>(events);

  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedPosts = getPaginatedPosts({ posts: filteredPosts, postsPerPage, currentPage });
  const totalNoOfPages = getPaginatedPagesTotal({ posts: filteredPosts, postsPerPage });

  return (
    <>
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
          {paginatedPosts.map((event, index) => (
            <ResourceEvent key={index} attributes={event.attributes} />
          ))}
          {filteredPosts.length > 0 ? (
            <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          ) : (
            <h5 className="font-base font-medium text-cloud-500">There are no events listed right now.</h5>
          )}
        </div>
      </div>
    </>
  );
};
