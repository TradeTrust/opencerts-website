import React, { FunctionComponent, useState } from "react";
import { compareAsc, compareDesc } from "date-fns";
import { Pagination } from "@govtechsg/tradetrust-ui-components";
import { NewsTag, NewsSort, NewsSingle } from "./../types";
import { NewsLink } from "./../NewsLink";
import { NewsFilter } from "./../NewsFilter";

export const newsPerPage = 12;

export const NewsContent: FunctionComponent<{ allNews: NewsSingle[] }> = ({ allNews }) => {
  const [searchStr, setSearchStr] = useState<string>("");
  const [dropdownFilter, setDropdownFilter] = useState<NewsTag>();
  const [dropdownSort, setDropdownSort] = useState<NewsSort>();

  const filteredNews = allNews
    .filter((news: NewsSingle) => news.attributes.title.toLowerCase().includes(searchStr.toLowerCase()))
    .filter((news: NewsSingle) => {
      if (!dropdownFilter) {
        return news;
      } else {
        return news.type === dropdownFilter;
      }
    })
    .sort((a, b) => {
      switch (dropdownSort) {
        case NewsSort.ASC:
          return compareAsc(new Date(a.attributes.date), new Date(b.attributes.date));
        case NewsSort.DESC:
          return compareDesc(new Date(a.attributes.date), new Date(b.attributes.date));
        default:
          return 0;
      }
    });

  const totalNoOfPages = Math.ceil(filteredNews.length / newsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEvent = currentPage * newsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - newsPerPage;
  const currentNews = filteredNews.filter((post, index) => {
    return index >= indexOfFirstEvent && index < indexOfLastEvent ? post : null;
  });

  return (
    <>
      <NewsFilter
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        dropdownFilter={dropdownFilter}
        setDropdownFilter={setDropdownFilter}
        dropdownSort={dropdownSort}
        setDropdownSort={setDropdownSort}
      />
      <div className="flex flex-wrap py-4 -mx-4">
        {currentNews.map((news, index) => {
          return (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 mb-8 px-4">
              <NewsLink news={news} />
            </div>
          );
        })}
      </div>
      <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};
