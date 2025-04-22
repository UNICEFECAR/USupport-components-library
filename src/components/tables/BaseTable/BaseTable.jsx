import React, { useState, useEffect, useCallback } from "react";
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

/**
 * BaseTable
 *
 * Base table component
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
}) => {
  const [searchValue, setSearchValue] = useState("");

  const [sorting, setSorting] = useState();

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

  const renderItems = useCallback(() => {
    if (isLoading)
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
            return (
              <React.Fragment key={"dataItem" + dataItemIndex}>
                <td
                  className={`table__td ${hasMenu ? "table__td--sticky" : ""}`}
                >
                  {dataItem}
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
  }, [rowsData, searchValue]);

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
                // handleDelete={() => {
                //   setFilters((prev) => ({
                //     ...prev,
                //     [key]: typeof filters[key] === "boolean" ? false : null,
                //   }));
                // }}
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
          <Trans components={[<b></b>]}>{t("note")}</Trans>
        </p>
      )}
      {(!rowsData || rowsData.length === 0) && !isLoading ? (
        <p>{t("no_data_found")}</p>
      ) : (
        <div className="scrollable-table">
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
                          className={`table__heading-container ${
                            row.isCentered
                              ? "table__heading-container--centered"
                              : ""
                          }`}
                        >
                          {row.label}
                          {row.sortingKey && (
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
  return (
    <React.Fragment>
      <td
        className={`table__td table__td--sticky table-icon ${
          (index + 1) % 2 === 0 ? "table-icon--even" : ""
        }`}
      >
        <div className="table-icon__content">
          <Icon
            size="xl"
            name="table-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            classes={
              index + (1 % 2) === 0 ? "table-icon__content__icon--even" : ""
            }
          />
        </div>
      </td>
      <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
        {isMenuOpen && (
          <div className="table-icon__menu">
            {menuOptions?.map((option, index) => {
              return (
                <div
                  key={"option" + index}
                  className="table-icon__menu__option"
                  onClick={() => option.handleClick(handleClickCallbackProp)}
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
    </React.Fragment>
  );
};

BaseTable.propTypes = {
  // Add propTypes here
};

BaseTable.defaultProps = {
  // Add defaultProps here
};
