import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

import { Loading } from "../../loaders";
import { Icon } from "../../icons/Icon";
import { InputSearch } from "../../inputs";
import { Button } from "../../buttons";

import "./base-table.scss";
import { useCallback } from "react";

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
}) => {
  const [searchValue, setSearchValue] = useState("");

  const [sorting, setSorting] = useState(
    rows.map((row) => {
      return { value: row.sortingKey, sort: "asc" };
    })
  );

  useEffect(() => {
    setSorting(
      rows.map((row) => {
        return { value: row.sortingKey, sort: "asc" };
      })
    );
  }, [rows]);

  const handleSort = (key, sort) => {
    // Update the sorting icon
    const sortingData = [...sorting];
    const current = sorting.find((x) => x.value === key);
    sortingData[sortingData.indexOf(current)].sort =
      sort === "asc" ? "desc" : "asc";
    setSorting(sortingData);

    // Sort the displayed data
    const sortedRow = rows.find((x) => x.sortingKey === key);
    const isNumberSort = sortedRow.isNumbered;
    const isDateSort = sortedRow.isDate;
    let dataCopy = [...data];
    dataCopy = dataCopy.sort((a, b) => {
      let first = a[key];
      let second = b[key];
      if (isDateSort) {
        first = first.getTime();
        second = second.getTime();
      }
      if (!isNumberSort && !isDateSort) {
        if (sort === "asc") return first.localeCompare(second);
        return second.localeCompare(first);
      } else {
        if (sort === "asc") return first - second;
        return second - first;
      }
    });
    updateData(dataCopy);
  };

  const filterDataBySearch = (rowIndex) => {
    const row = data[rowIndex];
    const searchVal = searchValue.toLowerCase();
    let isMatching = false;
    sorting.forEach(({ value }) => {
      if (value && String(row[value]).toLowerCase().includes(searchVal)) {
        isMatching = true;
      }
    });
    return isMatching;
  };

  const renderItems = useCallback(() => {
    const filteredData = rowsData?.filter((x, i) => {
      if (searchValue && hasSearch) {
        if (!filterDataBySearch(i)) {
          return null;
        }
      }
      return x;
    });

    // TODO: Add a no data message
    // if (!filteredData?.length)
    //   return (
    //     <tr>
    //       <td>No data</td>
    //     </tr>
    //   );

    return filteredData.map((rowData, dataIndex) => {
      return (
        <tr key={"dataIndex" + dataIndex}>
          {rowData?.map((dataItem, dataItemIndex) => {
            if (searchValue && hasSearch) {
              if (!filterDataBySearch(dataIndex)) {
                return null;
              }
            }
            return (
              <React.Fragment key={"dataItem" + dataItemIndex}>
                <td className="table__td">{dataItem}</td>
                {hasMenu && dataItemIndex === rowData.length - 1 && (
                  <TableIcon
                    menuOptions={menuOptions}
                    handleClickCallbackProp={
                      data ? data[dataIndex][handleClickPropName] : null
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

  return (
    <div className="table__container">
      {(hasSearch || buttonLabel || secondaryButtonLabel) && (
        <div className="table__container__search-container">
          {hasSearch && (
            <InputSearch
              placeholder={t("search")}
              value={searchValue}
              onChange={setSearchValue}
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
              />
            )}
            {secondaryButtonLabel && (
              <Button
                label={secondaryButtonLabel}
                color="purple"
                onClick={secondaryButtonAction}
              />
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : !rowsData || rowsData.length === 0 ? (
        <p>{t("no_data_found")}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {rows.map((row, index) => {
                const rowSort = sorting.find(
                  (x) => x.value === row.sortingKey
                )?.sort;
                return (
                  <th key={"row" + index}>
                    <div className="table__heading-container">
                      {row.label}
                      {row.sortingKey && (
                        <Icon
                          size="sm"
                          name={rowSort === "asc" ? "sort-desc" : "sort-asc"}
                          onClick={() => handleSort(row.sortingKey, rowSort)}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table__body">{renderItems()}</tbody>
        </table>
      )}
    </div>
  );
};

const TableIcon = ({ menuOptions, handleClickCallbackProp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <td className="table-icon">
      <div className="table-icon__content">
        <Icon
          size="md"
          name="three-dots-vertical"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
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
      </div>
    </td>
  );
};

BaseTable.propTypes = {
  // Add propTypes here
};

BaseTable.defaultProps = {
  // Add defaultProps here
};
