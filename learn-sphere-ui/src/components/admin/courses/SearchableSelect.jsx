
// components/admin/courses/SearchableSelect.jsx
import React from "react";

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const dropdownRef = React.useRef(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15 text-left flex items-center justify-between"
      >
        <span className="text-sm">
          {value.length > 0 ? `${value.length} selected` : placeholder}
        </span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black/60 border border-white/15 rounded-md shadow-2xl z-50">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-black/20 border-b border-white/15 rounded-t-md text-sm focus:outline-none"
            autoFocus
          />
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="rounded"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-[var(--text)]/60">
                No results
              </div>
            )}
          </div>
        </div>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-600/30 text-xs text-indigo-300"
            >
              {cat}
              <button
                type="button"
                onClick={() => toggleOption(cat)}
                className="hover:text-indigo-200"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
