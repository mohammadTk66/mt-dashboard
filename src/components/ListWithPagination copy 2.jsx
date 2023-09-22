import { useEffect, useState } from "react";
import Loading from "./Loading";

const ListWithPagination = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSelectedItems();
  }, [data]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortColumn === "firstName") {
      return sortOrder === "asc"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const fetchData = async () => {
    await fetch("https://testapi.devtoolsdaily.com/users/")
      .then((response) => response.json())
      .then((data) => {
        let temp = data.map((item) => ({ ...item, isChecked: false }));
        setData(temp);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(true);
        console.log(err);
      });
  };

  const handleSearch = () => {
    // const filteredData = data.filter((row) =>
    //   row.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    if (searchQuery.length === 0) fetchData();

    const filteredData = data.filter((item) => {
      const columns = Object.values(item);
      return columns.some((column) =>
        column.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    if (filteredData.length === 0) setSearchQuery("");
    setData(filteredData);
  };

  const handleCheckInput = (e) => {
    const changedItems = data.map((item) =>
      item.id === e.id ? { ...item, isChecked: !item.isChecked } : item
    );
    setData(changedItems);
  };

  const handleSelectedItems = () => {
    const checkItems = data.filter((item) => item.isChecked === true);
    const newData = checkItems.map((obj) => {
      const { isChecked, ...rest } = obj;
      return rest;
    });
    setSelectedItems(newData);
  };

  const convertToCSV = (selectedItems) => {
    const header = Object.keys(selectedItems[0]).join(",");
    const rows = selectedItems.map((item) => Object.values(item).join(","));
    return `${header}\n${rows.join("\n")}`;
  };

  const downloadCSV = (csvData, fileName) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleCsvDownload = () => {
    if (selectedItems.length === 0)
      return alert("please select at least one item");
    const csvData = convertToCSV(selectedItems);
    downloadCSV(csvData, "selected_items.csv");
  };

  const headerColumns = [
    "ID",
    "firstName",
    "lastName",
    "companyId",
    "countryCode",
  ];

  return (
    <div className="dark:bg-slate-700 h-full p-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 dark:bg-slate-800">
        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();
              }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleCsvDownload}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download Csv File</span>
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-table-search-all" type="checkbox" />
                  <label
                    htmlFor="checkbox-table-search-all"
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </th>
              {headerColumns.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    <p>{item}</p>
                    {sortColumn === "id" && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? (
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400">
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400">
                            <path d="M7 14l5-5 5 5z" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData?.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => handleCheckInput(item)}
                        checked={item.isChecked}
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4"> {item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">{item.firstName}</div>
                  </td>
                  <td className="px-6 py-4">{item.lastName}</td>
                  <td className="px-6 py-4">{item.companyId}</td>
                  <td className="px-6 py-4">{item.countryCode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && <Loading />}
        {currentPage !== 0 && (
          <nav
            className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of{" "}
              {data.length} items
            </span>
            <div>
              <label className="me-2 dark:text-gray-400" htmlFor="item-count">
                Items per page
              </label>
              <input
                id="item-count"
                type="text"
                className="p-1 w-10 text-center text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="item per page"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(e.target.value);
                }}
              />
            </div>

            <ul className="inline-flex -space-x-px text-sm h-8">
              <li>
                <button
                  className="flex items-center disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-gray-400 justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  type="button"
                >
                  Previous
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => setCurrentPage(4)}
                >
                  4
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => setCurrentPage(5)}
                >
                  5
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={endIndex >= data.length}
                  className="flex items-center disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-gray-400 justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  type="button"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default ListWithPagination;
