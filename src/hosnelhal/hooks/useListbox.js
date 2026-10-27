import { useEffect, useRef, useState } from "react";

/**
 * Behaviour of a button that opens a list of options (WAI-ARIA "select-only
 * combobox"): arrow keys, Home / End, Page Up / Down, Enter, Space, Escape,
 * Tab, typing the first letters of an option and clicking outside.
 *
 * @param {object} params
 * @param {string} params.id - unique id, used for the trigger, list and options
 * @param {object[]} params.options - [{ value, label }]
 * @param {string} params.value - selected value
 * @param {function} params.onChange - receives the selected value
 * @returns {object} { isOpen, rootRef, selectedIndex, triggerProps, listboxProps }
 */
export const useListbox = ({ id, options, value, onChange }) => {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const typeaheadRef = useRef({ query: "", timeout: null });

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const listId = `${id}-list`;
  const getOptionId = (index) => `${id}-option-${index}`;

  const open = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };

  const close = ({ focusTrigger = true } = {}) => {
    setIsOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const select = (index) => {
    const option = options[index];
    if (option && option.value !== value) onChange(option.value);
    close();
  };

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return undefined;
    const handlePointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) close({ focusTrigger: false });
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  // Keep the active option visible while moving through a long list
  useEffect(() => {
    if (!isOpen) return;
    document.getElementById(getOptionId(activeIndex))?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  const moveTo = (index) => {
    setActiveIndex(Math.min(options.length - 1, Math.max(0, index)));
  };

  // Jump to the first option starting with the typed letters
  const typeahead = (character) => {
    const state = typeaheadRef.current;
    clearTimeout(state.timeout);
    state.query += character.toLowerCase();
    state.timeout = setTimeout(() => {
      state.query = "";
    }, 500);

    const match = options.findIndex((option) =>
      option.label?.toLowerCase().startsWith(state.query)
    );
    if (match === -1) return;
    if (isOpen) moveTo(match);
    else if (options[match].value !== value) onChange(options[match].value);
  };

  const handleKeyDown = (e) => {
    const { key } = e;

    if (key.length === 1 && key !== " " && !e.metaKey && !e.ctrlKey && !e.altKey) {
      typeahead(key);
      return;
    }

    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        e.preventDefault();
        open();
      }
      return;
    }

    if (key === "Tab") {
      select(activeIndex);
      return;
    }

    const actions = {
      ArrowDown: () => moveTo(activeIndex + 1),
      ArrowUp: () => moveTo(activeIndex - 1),
      Home: () => moveTo(0),
      End: () => moveTo(options.length - 1),
      PageDown: () => moveTo(activeIndex + 10),
      PageUp: () => moveTo(activeIndex - 10),
      Enter: () => select(activeIndex),
      " ": () => select(activeIndex),
      Escape: () => close(),
    };
    if (actions[key]) {
      e.preventDefault();
      actions[key]();
    }
  };

  return {
    isOpen,
    rootRef,
    selectedIndex,
    triggerProps: {
      ref: triggerRef,
      id,
      type: "button",
      role: "combobox",
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      "aria-controls": listId,
      "aria-activedescendant": isOpen ? getOptionId(activeIndex) : undefined,
      onClick: () => (isOpen ? close() : open()),
      onKeyDown: handleKeyDown,
    },
    listboxProps: {
      id: listId,
      options,
      selectedIndex,
      activeIndex,
      getOptionId,
      hidden: !isOpen,
      onActivate: setActiveIndex,
      onSelect: select,
    },
  };
};
