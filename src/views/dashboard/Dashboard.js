import { useFirestoreConnect } from "react-redux-firebase";
import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

export const toggleDataTableDetails = (index, details, setDetails) => {
  const position = details.indexOf(index);
  let newDetails = details.slice();
  if (position !== -1) {
    newDetails.splice(position, 1);
  } else {
    newDetails = [...details, index];
  }
  setDetails(newDetails);
};

export const Loading = React.memo(() => {
  return (
    <div className="Login">
      <ReactLoading
        className="LoginLoading"
        type={"spin"}
        color={"#9050fe"}
        height={60}
        width={60}
      />
    </div>
  );
});

const getBadge = (type) => {
  return type === "Movie" ? "primary" : "warning";
};

const Dashboard = () => {
  const [limit, setLimit] = useState(21);
  const [lastPage, setLastPage] = useState(0);
  useFirestoreConnect([{ collection: "movies", limit: limit }]);
  const movies = useSelector((state) => state.firestore.ordered.movies);
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch();
  let usersData = [];

  const fields = [
    { key: "type", label: "Type", _style: { width: "5%" } },
    { key: "title", _style: { width: "30%" } },
    { key: "rating", label: "Rating", _style: { width: "15%" } },
    { key: "release_year", label: "Release Year", _style: { width: "15%" } },
    { key: "country", label: "Country", _style: { width: "10%" } },
  ];

  if (usersData.length === 0 && movies !== undefined) {
    movies.forEach((item, index) => usersData.push(item));
  }

  return (
    <>
      {usersData.length === 0 ? (
        <Loading />
      ) : (
        <CCard>
          <CCardHeader>Movie List</CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              columnFilter
              tableFilter={{ placeholder: "Enter String" }}
              itemsPerPageSelect
              itemsPerPage={20}
              hover
              sorter
              pagination
              onRowClick={(item) => {
                toggleDataTableDetails(item.show_id, details, setDetails);
              }}
              onPageChange={(val) => {
                if (val > lastPage) {
                  setLimit(limit + 20);
                  setLastPage(val);
                }
              }}
              onPagesChange={(val) => console.log("new pages:", val)}
              onPaginationChange={(val) => console.log("new pagination:", val)}
              scopedSlots={{
                type: (item) => {
                  return (
                    <td>
                      <CBadge color={getBadge(item.type)}>
                        {item.type.toUpperCase()}
                      </CBadge>
                    </td>
                  );
                },
                details: (item) => {
                  return (
                    <CCollapse show={details.includes(item.show_id)}>
                      <CCardBody>
                        <h6>{item.title}</h6>
                        <br></br>
                        <p className="text-muted">
                          Description: {item.description}
                        </p>
                        <p className="text-muted">Director: {item.director}</p>
                        <p className="text-muted">Duration: {item.duration}</p>
                      </CCardBody>
                    </CCollapse>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default Dashboard;
