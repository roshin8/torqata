import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Redirect } from "react-router-dom";
import { signOut } from "../redux/auth";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectStateResults,
  Configure,
} from "react-instantsearch-dom";

// routes config
import routes from "../routes";

const HeaderDropdown = () => {
  const dispatch = useDispatch();
  const logoutClick = () => {
    dispatch(signOut());
    return <Redirect to="/login" />;
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CIcon className="d-sm-down-none" size="lg" name="cil-settings" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={logoutClick}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};
const searchClient = algoliasearch(
  "V4PX9214FI",
  "77084fa15006303b1d47fe58dcedb412"
);

const Hit = ({ hit }) => (
  <>
    <div className="card">
      <div className="card-rating">Title: {hit.title}</div>
      <div className="card-genre">
        {" "}
        <span>{hit.country}</span>{" "}
      </div>
      {/* </div> */}
    </div>
  </>
);

const Results = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? <Hits hitComponent={Hit} /> : <></>
);

const Header = () => {
  return (
    <CHeader withSubheader>
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <img className="LoginLogo" alt="Sophia Logo" src="images/logo-84.png" />
      </CHeaderBrand>

      <CHeaderNav className="p-2 flex-grow-1">
        <CHeaderNavItem className="px-3 flex-grow-1">
          <InstantSearch indexName="movies" searchClient={searchClient}>
            <Configure hitsPerPage={8} />
            <SearchBox
              className="search-bar"
              translations={{ placeholder: "Search for Movies" }}
            />
            <Results />
          </InstantSearch>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="d-sm-down-none px-1">
        <HeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
