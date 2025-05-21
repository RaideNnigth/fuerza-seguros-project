import { useState, useEffect, useRef } from "react";
import API_URL from "../../config/api";

export default function TagSelector({ selected, onChange }) {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    fetch(`${API_URL}/api/tags`)
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch(console.error);
  }, []);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleTag(tagName) {
    if (selected.includes(tagName)) {
      onChange(selected.filter((t) => t !== tagName));
    } else {
      onChange([...selected, tagName]);
    }
  }

  function removeTag(tagName) {
    onChange(selected.filter((t) => t !== tagName));
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center gap-2 px-4 py-2 border rounded-2xl font-semibold shadow-sm min-w-[200px] bg-gray-50 hover:bg-gray-100
         ${open ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mr-2 text-blue-900 font-bold">
          {selected.length > 0 ? "TAGS" : "SELECIONE TAGS"}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-2 min-h-[2.2rem]">
        {selected.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-medium shadow"
          >
            {tag}
            <button
              type="button"
              className="hover:bg-blue-200 rounded-full p-1 ml-1"
              onClick={() => removeTag(tag)}
              aria-label="Remover"
            >
              <svg className="w-3 h-3 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 8.586l3.536-3.535a1 1 0 011.415 1.415L11.414 10l3.536 3.535a1 1 0 01-1.415 1.415L10 11.414l-3.535 3.536a1 1 0 01-1.415-1.415L8.586 10l-3.536-3.535A1 1 0 016.464 5.05L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 z-20 mt-2 w-full bg-white border border-blue-100 rounded-xl shadow-lg max-h-60 overflow-y-auto animate-fade-in">
          <div className="flex flex-col">
            <button
              type="button"
              className="text-left px-4 py-2 font-semibold hover:bg-blue-50 rounded-t-xl transition"
              onClick={() => onChange([])}
            >
              Normal
            </button>
            <hr className="my-1" />
            {tags.map((tag) => (
              <button
                key={tag._id}
                type="button"
                className={`flex items-center px-4 py-2 text-left gap-2 hover:bg-blue-100 transition
                  ${selected.includes(tag.name) ? "bg-blue-50 font-bold" : ""}`}
                onClick={() => toggleTag(tag.name)}
              >
                <span className="text-base font-medium">
                  <input
                    type="checkbox"
                    className="accent-blue-600 mr-2"
                    checked={selected.includes(tag.name)}
                    readOnly
                  />
                  {tag.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
