import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FaColumns, FaImdb } from "react-icons/fa";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch(event) {
    event.preventDefault();
    // TODO: implement search logic using searchTerm state
    console.log(`Searching for "${this.state.searchTerm}"...`);
    this.props.history.push(`/mainpage/${this.state.searchTerm}`);
  }

  render() {
    return (
      <div
        className="search-page"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1 style={{ marginBottom: "32px", color: "gray" }}>
          <FaImdb
            style={{
              marginRight: "16px",
              fontSize: "48px",
              verticalAlign: "middle",
              color: "#F6C700",
            }}
          />
          Search IMDb
        </h1>

        <p
          style={{
            color: "gray",
            fontSize: "16px",
            marginBottom: "16px",
            padding: "0 16px",
          }}
        >
          Search for a movie, TV show, or person.
        </p>
        <form
          onSubmit={this.handleSearch}
          class="d-flex ms-3"
          style={{ width: "40%" }}
        >
          <input
            class="form-control me-2 border-0 text-white"
            text="Search"
            aria-label="Search"
            onChange={this.handleInputChange}
            style={{ backgroundColor: "#333333" }}
          />
          {/* buttom outline yellow */}
          <button class="btn btn-outline-warning" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchPage;
