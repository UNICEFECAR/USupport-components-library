import React, { useState, useEffect, useCallback, useRef } from "react";
import { Trans } from "react-i18next";
import OutsideClickHandler from "react-outside-click-handler";

import { Loading } from "../../loaders";
import { Icon } from "../../icons/Icon";
import { InputSearch } from "../../inputs";
import { Button } from "../../buttons";
import { Label } from "../../labels";

import "./base-table.scss";

function camelToSnake(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// Helper function to get text content from React elements
const getTextContent = (content) => {
  if (typeof content === "string" || typeof content === "number") {
    return String(content);
  }
  if (React.isValidElement(content)) {
    if (content.props?.children) {
      if (typeof content.props.children === "string") {
        return content.props.children;
      }
      if (Array.isArray(content.props.children)) {
        return content.props.children
          .map((child) => getTextContent(child))
          .filter((text) => text)
          .join(" ");
      }
    }
    // For links and other elements, try to extract meaningful text
    if (content.props?.href && content.props?.children) {
      return getTextContent(content.props.children);
    }
    if (content.props?.title) {
      return content.props.title;
    }
  }
  return String(content || "");
};

// Helper function to truncate text
const truncateText = (text, maxLength = 50) => {
  if (!text) return text;
  const textStr = String(text);
  if (textStr.length <= maxLength) return textStr;
  return textStr.substring(0, maxLength) + "...";
};

// Helper function to check if content should be truncated
const shouldTruncateContent = (content, maxLength = 50) => {
  if (!content) return false;
  const textContent = getTextContent(content);
  return textContent.length > maxLength;
};

// Helper function to create truncated version of React elements
const createTruncatedElement = (originalElement, maxLength = 50) => {
  if (
    typeof originalElement === "string" ||
    typeof originalElement === "number"
  ) {
    return truncateText(String(originalElement), maxLength);
  }

  if (React.isValidElement(originalElement)) {
    const textContent = getTextContent(originalElement);

    // Don't truncate links, buttons, or interactive elements - show them as is
    if (
      originalElement.type === "a" ||
      originalElement.props?.href ||
      originalElement.props?.onClick
    ) {
      return originalElement;
    }

    // For simple text elements, create truncated version
    if (
      originalElement.type === "p" &&
      typeof originalElement.props?.children === "string"
    ) {
      const truncatedText = truncateText(
        originalElement.props.children,
        maxLength
      );
      return React.cloneElement(originalElement, {}, truncatedText);
    }
  }

  return originalElement;
};

/**
 * BaseTable
 *
 * Base table component with inline tooltip truncation
 *
 * @return {jsx}
 */
export const BaseTable = ({
  data,
  rows,
  rowsData,
  isLoading,
  menuOptions,
  handleClickPropName,
  t,
  hasMenu = true,
  updateData,
  hasSearch = false,
  buttonLabel,
  buttonAction,
  secondaryButtonLabel,
  secondaryButtonAction,
  thirdButtonLabel,
  thirdButtonAction,
  isButtonDisabled = false,
  isSecondaryButtonDisabled = false,
  noteText,
  customSort,
  customSearch,
  filters,
  handleRemoveFilter,
  truncateLength = 50,
  enableTooltips = true,
  maxHeightInVH = 60,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState();
  const [hoveredCell, setHoveredCell] = useState(null); // Track which cell is hovered
  const [hoveredHeader, setHoveredHeader] = useState(null); // Track which header is hovered

  useEffect(() => {
    setSorting(
      rows.map((row) => {
        return { sortingKey: row.sortingKey, sort: "asc" };
      })
    );
  }, [rows]);

  const handleSort = (key, sort) => {
    // Update the sorting icon
    const sortingData = [...sorting];
    const current = sorting.find((x) => x.sortingKey === key);
    sortingData[sortingData.indexOf(current)].sort =
      sort === "asc" ? "desc" : "asc";
    setSorting(sortingData);

    if (customSort) {
      customSort(key, sort);
    } else {
      // Sort the displayed data
      const sortedRow = rows.find((x) => x.sortingKey === key);
      const isNumberSort = sortedRow.isNumbered;
      const isDateSort = sortedRow.isDate;
      let dataCopy = [...data];
      dataCopy = dataCopy.sort((a, b) => {
        let first = a[key];
        let second = b[key];
        const isAsc = sort === "asc";

        if (!first && typeof first !== "number") {
          return isAsc ? 1 : -1;
        }
        if (!second && typeof second !== "number") {
          return isAsc ? -1 : 1;
        }

        if (first === second) return 0;

        if (isDateSort) {
          first = new Date(first).getTime();
          second = new Date(second).getTime();
        }
        if (!isNumberSort && !isDateSort) {
          if (sort === "asc")
            return String(first).localeCompare(String(second));
          return String(second).localeCompare(String(first));
        } else {
          if (sort === "asc") return first - second;
          return second - first;
        }
      });
      updateData(dataCopy);
    }
  };

  const filterDataBySearch = (rowIndex) => {
    const row = data[rowIndex];
    const searchVal = searchValue.toLowerCase();
    let isMatching = false;
    sorting.forEach(({ sortingKey }) => {
      if (
        sortingKey &&
        String(row[sortingKey]).toLowerCase().includes(searchVal)
      ) {
        isMatching = true;
      }
    });
    return isMatching;
  };

  const handleMouseEnter = (dataIndex, dataItemIndex) => {
    if (enableTooltips) {
      setHoveredCell(`${dataIndex}-${dataItemIndex}`);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const handleHeaderMouseEnter = (headerIndex) => {
    setHoveredHeader(headerIndex);
  };

  const handleHeaderMouseLeave = () => {
    setHoveredHeader(null);
  };

  const renderItems = useCallback(() => {
    if (isLoading && (!rowsData || rowsData.length === 0))
      return (
        <tr>
          <td
            className="table__body__no-data"
            colSpan={rows.length + (hasMenu ? 1 : 0)}
          >
            <Loading />
          </td>
        </tr>
      );

    const filteredData = rowsData?.filter((x, i) => {
      if (searchValue && hasSearch && !customSearch) {
        if (!filterDataBySearch(i)) {
          return null;
        }
      }
      return x;
    });

    if (!filteredData?.length)
      return (
        <tr>
          <td
            className="table__body__no-data"
            colSpan={rows.length + (hasMenu ? 1 : 0)}
          >
            {t("no_data_found")}
          </td>
        </tr>
      );

    return filteredData.map((rowData, dataIndex) => {
      return (
        <tr className="table__body__tr" key={"dataIndex" + dataIndex}>
          {rowData?.map((dataItem, dataItemIndex) => {
            // Get the original content for tooltip
            const originalContent = dataItem;
            const cellId = `${dataIndex}-${dataItemIndex}`;
            const isHovered = hoveredCell === cellId;

            // Create display content (truncated if necessary)
            const displayContent =
              enableTooltips &&
              shouldTruncateContent(originalContent, truncateLength)
                ? createTruncatedElement(originalContent, truncateLength)
                : dataItem;

            const shouldShowTooltip =
              enableTooltips &&
              shouldTruncateContent(originalContent, truncateLength);

            const fullContent = shouldShowTooltip
              ? getTextContent(originalContent)
              : null;

            // Get the column label for mobile data-label attribute
            const columnLabel = rows[dataItemIndex]?.label || "";

            return (
              <React.Fragment key={"dataItem" + dataItemIndex}>
                <td
                  className={`table__td ${
                    shouldShowTooltip ? "table__td--truncated" : ""
                  }`}
                  data-label={columnLabel}
                  onMouseEnter={() =>
                    handleMouseEnter(dataIndex, dataItemIndex)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="table__td__content">
                    <div className="table__td__display">{displayContent}</div>
                    {shouldShowTooltip && isHovered && (
                      <div className="table__td__tooltip">{fullContent}</div>
                    )}
                  </div>
                </td>
                {hasMenu && dataItemIndex === rowData.length - 1 && (
                  <TableIcon
                    index={dataIndex}
                    menuOptions={menuOptions}
                    handleClickCallbackProp={
                      data && data[dataIndex]
                        ? data[dataIndex][handleClickPropName]
                        : null
                    }
                  />
                )}
              </React.Fragment>
            );
          })}
        </tr>
      );
    });
  }, [
    rowsData,
    searchValue,
    enableTooltips,
    truncateLength,
    data,
    rows,
    hasMenu,
    menuOptions,
    handleClickPropName,
    isLoading,
    t,
    hoveredCell,
    hoveredHeader,
  ]);

  const handleSearch = (val) => {
    setSearchValue(val);
    if (customSearch) {
      customSearch(val);
    }
  };

  return (
    <div className="table__container">
      {(hasSearch || buttonLabel || secondaryButtonLabel) && (
        <div className="table__container__search-container">
          {hasSearch && (
            <InputSearch
              placeholder={t("search")}
              value={searchValue}
              onChange={(val) => {
                handleSearch(val);
              }}
              classes="campaigns__search"
            />
          )}
          <div className="table__container__search-container__buttons-container">
            {buttonLabel && (
              <Button
                label={buttonLabel}
                color="purple"
                type="secondary"
                onClick={buttonAction}
                disabled={isButtonDisabled}
              />
            )}
            {secondaryButtonLabel && (
              <Button
                label={secondaryButtonLabel}
                color="purple"
                onClick={secondaryButtonAction}
                disabled={isSecondaryButtonDisabled}
              />
            )}
          </div>
          {thirdButtonLabel && (
            <Button
              label={thirdButtonLabel}
              color="purple"
              onClick={thirdButtonAction}
              classes="table__container__search-container__third-button"
            />
          )}
        </div>
      )}
      {filters && (
        <div className="table__container__filters">
          {Object.keys(filters).map((key) => {
            if (!filters[key]) return null;
            return (
              <Label
                key={key}
                showRemove={!!handleRemoveFilter}
                onRemove={() => handleRemoveFilter(key)}
                showSuccess={typeof filters[key] === "boolean" && filters[key]}
                text={`${t(camelToSnake(key))}: ${
                  typeof filters[key] === "boolean" ? "" : filters[key]
                }`}
              />
            );
          })}
        </div>
      )}
      {noteText && (
        <p className="table__container__note">
          <Trans components={[<b></b>]}>{noteText}</Trans>
        </p>
      )}

      {(!rowsData || rowsData.length === 0) && !isLoading ? (
        <p>{t("no_data_found")}</p>
      ) : (
        <div
          className={`scrollable-table scrollable-table--height-${maxHeightInVH}`}
        >
          {isLoading && rowsData && rowsData.length > 0 && (
            <div className="table__container__loading">
              <Loading />
            </div>
          )}
          <table className={`table ${hasMenu ? "table--sticky" : ""}`}>
            <thead>
              <tr className="table__heading">
                {sorting &&
                  rows.map((row, index) => {
                    const rowSort = sorting.find(
                      (x) => x.sortingKey === row.sortingKey
                    )?.sort;
                    return (
                      <th key={"row" + index}>
                        <div
                          onMouseEnter={() =>
                            row.headerTooltip
                              ? handleHeaderMouseEnter(index)
                              : null
                          }
                          onMouseLeave={handleHeaderMouseLeave}
                          className={`table__heading-container ${
                            row.isCentered
                              ? "table__heading-container--centered"
                              : ""
                          }`}
                        >
                          <div className="table__heading__label-container">
                            {row.label}
                            {row.headerTooltip ? (
                              <div className="table__heading__info-icon">
                                <Icon size="sm" color="#fff" name="info" />
                                {hoveredHeader === index && (
                                  <div className="table__heading__tooltip">
                                    <p className="table__heading__tooltip__text">
                                      {row.headerTooltip}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </div>
                          {row.sortingKey && (
                            <div>
                              <Icon
                                size="sm"
                                color="#eaeaea"
                                name={
                                  rowSort === "asc" ? "sort-desc" : "sort-asc"
                                }
                                onClick={() =>
                                  handleSort(row.sortingKey, rowSort)
                                }
                              />
                            </div>
                          )}
                        </div>
                      </th>
                    );
                  })}
                {hasMenu && (
                  <th>
                    <div className="table__heading-container"></div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="table__body">{renderItems()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const TableIcon = ({ menuOptions, handleClickCallbackProp, index }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: "100%", right: 0 });
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  // Calculate optimal menu position to avoid viewport overflow
  const calculateMenuPosition = useCallback(() => {
    if (!iconRef.current || !isMenuOpen) return;

    const iconRect = iconRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Estimated menu dimensions
    const menuWidth = 200;
    const menuHeight = menuOptions.length * 40 + 32; // Rough estimate

    let position = { top: "100%", right: 0 };

    // Check if menu would overflow right edge
    if (iconRect.right - menuWidth < 0) {
      position.right = "auto";
      position.left = 0;
    }

    // Check if menu would overflow bottom edge
    if (iconRect.bottom + menuHeight > viewportHeight) {
      position.top = "auto";
      position.bottom = "100%";
    }

    setMenuPosition(position);
  }, [isMenuOpen, menuOptions.length]);

  useEffect(() => {
    if (isMenuOpen) {
      calculateMenuPosition();
      const handleReposition = () => calculateMenuPosition();
      window.addEventListener("scroll", handleReposition, true);
      window.addEventListener("resize", handleReposition);

      return () => {
        window.removeEventListener("scroll", handleReposition, true);
        window.removeEventListener("resize", handleReposition);
      };
    }
  }, [isMenuOpen, calculateMenuPosition]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <td
      className={`table__td table__td--sticky table-icon ${
        (index + 1) % 2 === 0 ? "table-icon--even" : ""
      } ${isMenuOpen ? "table-icon--open" : ""}`}
    >
      <div className="table-icon__content" ref={iconRef}>
        <Icon
          size="xl"
          name="table-menu"
          onClick={handleToggleMenu}
          classes={
            index + (1 % 2) === 0 ? "table-icon__content__icon--even" : ""
          }
        />
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
          {isMenuOpen && (
            <div
              className={`table-icon__menu ${
                menuPosition.top === "auto" ? "table-icon__menu--above" : ""
              } ${menuPosition.left === 0 ? "table-icon__menu--left" : ""}`}
              ref={menuRef}
            >
              {menuOptions?.map((option, optionIndex) => {
                return (
                  <div
                    key={"option" + optionIndex}
                    className="table-icon__menu__option"
                    onClick={() => {
                      option.handleClick(handleClickCallbackProp);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon
                      color={option.iconColor || "#20809E"}
                      name={option.icon}
                    />
                    <p>{option.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </td>
  );
};

BaseTable.propTypes = {
  // Add propTypes here
};

BaseTable.defaultProps = {
  truncateLength: 50,
  enableTooltips: true,
};
