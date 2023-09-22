// import DataTableDemo from "./components/DataTable";
// import ListWithPagination from "./components/ListWithPagination";
import DataTable from "./components/dataTable/DataTable";
// import Login from "./pages/auth/login";
import data from "./data/Table_Data.json";

const App = () => {
  // const previewData = JSON.parse(data);
  console.log(data);
  return <DataTable tableData={data} />;
};

export default App;
