import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const {
    searchInput,
    setSearchInput,
    searchResults,
    showDropdown,
    handleSearch,
    searchRef,
  } = useSearch();

  return (
    <div className="search-container" ref={searchRef}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search files or folders"
          aria-label="Search input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      {showDropdown && (
        <Dropdown.Menu show style={{ width: "100%" }}>
          <Dropdown.Header>Folders</Dropdown.Header>
          {searchResults.folders.length > 0 ? (
            searchResults.folders.map((folder) => (
              <Dropdown.Item key={`folder-${folder._id}`}>
                <Link to={`/folder/${folder._id}`}>{folder.name}</Link>
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No folders found</Dropdown.Item>
          )}

          <Dropdown.Divider />

          <Dropdown.Header>Files</Dropdown.Header>
          {searchResults.files.length > 0 ? (
            searchResults.files.map((file) => (
              <Dropdown.Item key={`file-${file._id}`}>
                <Link to={`files/${file._id}`}>{file.name}</Link>
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No files found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default Search;
