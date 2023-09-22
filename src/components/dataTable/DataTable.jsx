import { useEffect, useState } from "react";
import Loading from "../Loading";
import CsvDownloader from "./CsvDownloader";
import InputSearch from "./InputSearch";
import ShowItemsCount from "./ShowItemsCount";
import ItemsPerPage from "./ItemsPerPage";
import Pagination from "./Pagination";

const DataTable = ({
  activeCsvDl = true,
  activeSearchBar = true,
  activePagination = true,
  activeItemPerPage = true,
  activeShowItemCount = true,
  tableData = [],
}) => {
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
    if (tableData.length != 0) {
      let temp = tableData?.map((item) => ({ ...item, isChecked: false }));
      setData(temp);
      setLoading(false);
    } else {
      fetchData();
    }
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
  const endIndex = parseInt(startIndex) + parseInt(itemsPerPage);
  const currentData = sortedData.slice(startIndex, endIndex);
  // const pageCount = data.length / itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const fetchData = async () => {
    try {
      const response = await fetch("https://testapi.devtoolsdaily.com/users/");
      const data = await response.json();
      let temp = data.map((item) => ({ ...item, isChecked: false }));
      setData(temp);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleSearch = () => {
    // if (searchQuery.length === 0) fetchData();

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

  const pagesToShow = 2;
  const startPage = Math.max(1, currentPage - pagesToShow);
  const endPage = Math.min(pageCount, currentPage + pagesToShow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckAllItems = (e) => {
    const checkAllItems = e
      ? data.map((item) => ({ ...item, isChecked: true }))
      : data.map((item) => ({ ...item, isChecked: false }));
    setData(checkAllItems);
  };

  return (
    <div className="dark:bg-slate-700 h-full p-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 dark:bg-slate-800">
        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
          {activeSearchBar && (
            <InputSearch
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
          {activeCsvDl && (
            <CsvDownloader handleCsvDownload={handleCsvDownload} />
          )}
        </div>
        {!isLoading ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <input
                    onChange={(e) => handleCheckAllItems(e.target.checked)}
                    type="checkbox"
                    className="cursor-pointer"
                  />
                </th>
                {Object.keys(data[0])?.map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className={`px-6 py-3 cursor-pointer ${
                      key === "isChecked" && "hidden"
                    }`}
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center">
                      <p>{key}</p>
                      {sortColumn === key && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? (
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M7 10l5 5 5-5z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M7 10l5-5 5 5z" />
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
              {currentData?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => handleCheckInput(item)}
                        checked={item.isChecked}
                      />
                    </div>
                  </td>
                  {Object.keys(item).map((key) => (
                    <td
                      key={key}
                      className={`px-6 py-4 ${key === "isChecked" && "hidden"}`}
                    >
                      {item[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}

        {currentPage !== 0 && (
          <nav
            className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            {activeShowItemCount && (
              <ShowItemsCount
                data={data}
                endIndex={endIndex}
                startIndex={startIndex}
              />
            )}
            {activeItemPerPage && (
              <ItemsPerPage
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            )}
            {activePagination && (
              <Pagination
                currentPage={currentPage}
                data={data}
                endIndex={endIndex}
                endPage={endPage}
                handlePageChange={handlePageChange}
                setCurrentPage={setCurrentPage}
                startPage={startPage}
              />
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default DataTable;
