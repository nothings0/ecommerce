"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "./index.scss";

interface IProps {
  total: number;
  pathname: string;
  page: number;
}

const Pagination: React.FC<IProps> = ({ page, total, pathname }) => {
  const dots = "...";

  const [paRender, setPaRender] = useState<Array<string | number>>([]);

  const numberPages = useMemo(() => {
    let arr: number[] = [];
    for (let i = 1; i <= total; i++) {
      arr.push(i);
    }
    return arr;
  }, [total]);

  useEffect(() => {
    let tempArr = [...paRender];
    if (total < 6) tempArr = numberPages;
    else if (page >= 1 && page <= 3) {
      tempArr = [1, 2, 3, 4, dots, total];
    } else if (page >= 4 && page < total - 2) {
      const sliced = numberPages.slice(page - 1, page + 2);
      tempArr = [1, dots, ...sliced, dots, total];
    } else if (page >= total - 2 && page <= total) {
      const sliced = numberPages.slice(total - 3, total);
      tempArr = [1, dots, ...sliced, total];
    }
    setPaRender(tempArr);
  }, [page, total]);

  const router = useRouter();
  const handleIndex = (x: number) => {
    router.push(`${pathname}?page=${x}`);
  };

  return (
    <div className="pagination">
      <ul className="pagination-wrap">
        <BiChevronLeft
          onClick={() => handleIndex(page - 1)}
          className={page - 1 < 1 ? "disable" : ""}
        />
        {paRender.map((item, index) => (
          <li key={index}>
            <Link
              href={{ pathname: `${pathname}`, query: { page: item } }}
              className={`${item === page ? "active" : ""} ${
                typeof item === "string" ? "disable" : ""
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
        <BiChevronRight
          onClick={() => handleIndex(page + 1)}
          className={page + 1 > total ? "disable" : ""}
        />
      </ul>
    </div>
  );
};

export default Pagination;
