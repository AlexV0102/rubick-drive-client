import { useEffect, useRef, useState } from "react";
import { search } from "../api/apiMethods/methods";

type SearchResults = {
  folders: Array<{ _id: string; name: string }>;
  files: Array<{ _id: string; name: string }>;
};

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    folders: [],
    files: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    try {
      if (!searchInput.trim()) return;
      const items = await search(searchInput);
      setSearchResults(items);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchInput("");
      setSearchResults({ folders: [], files: [] });
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    searchInput,
    setSearchInput,
    searchResults,
    showDropdown,
    handleSearch,
    searchRef,
  };
};
