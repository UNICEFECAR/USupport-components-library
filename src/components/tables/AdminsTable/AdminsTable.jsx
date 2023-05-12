import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

import { Loading } from "../../loaders/Loading";
import { Icon } from "../../icons/Icon";

import "./admins-table.scss";
import { useCallback } from "react";

/**
 * AdminsTable
 *
 * Table to list all admins(global or country)
 *
 * @return {jsx}
 */
export const AdminsTable = ({
  isLoading,
  rows,
  data,
  t,
  handleDelete,
  handleEdit,
  adminId,
  updateData,
  searchValue,
}) => {
  const [sorting, setSorting] = useState(
    rows.map((row) => {
      return { value: row.sortingKey, sort: "asc" };
    })
  );

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

  const renderData = useCallback(() => {
    const value = searchValue?.toLowerCase();

    const searchFilter = (admin) => {
      return (
        admin.name.toLowerCase().includes(value) ||
        admin.email?.toLowerCase().includes(value) ||
        admin.phone?.toLowerCase().includes(value) ||
        t(admin.status).toLowerCase().includes(value)
      );
    };
    return data.map((admin) => {
      if (searchValue) {
        const isSearchMatch = searchFilter(admin);
        if (!isSearchMatch) return null;
      }
      return (
        <tr key={admin.adminId}>
          <td className="admins-table__table__td">
            <p className="text admins-table__table__name">{admin.name}</p>
          </td>
          <td className="admins-table__table__td">
            <div
              className={`admins-table__table__status admins-table__table__status--${
                admin.isActive ? "active" : "disabled"
              }`}
            >
              <p className="text">
                {t(admin.isActive ? "active" : "disabled")}
              </p>
            </div>
          </td>
          <td className="admins-table__table__td">
            <p className="text">{admin.email}</p>
          </td>
          <td className="admins-table__table__td">
            <p className="text">{admin.phone ? `${admin.phone}` : "N/A"}</p>
          </td>
          <TableIcon
            t={t}
            handleEdit={() => handleEdit(admin.adminId)}
            handleDelete={() => handleDelete(admin.adminId)}
            showDelete={adminId !== admin.adminId}
          />
        </tr>
      );
    });
  }, [searchValue, data]);

  return (
    <div className="admins-table__container">
      {isLoading ? (
        <Loading />
      ) : !data || data.length === 0 ? (
        <p>{t("no_admins_found")}</p>
      ) : (
        <table className="admins-table__table">
          <thead>
            <tr>
              {rows.map((row, index) => {
                const rowSort = sorting.find(
                  (x) => x.value === row.sortingKey
                )?.sort;
                return (
                  <th key={row + index}>
                    <div className="admins-table__table__heading-container">
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
          <tbody>{renderData()}</tbody>
        </table>
      )}
    </div>
  );
};

const TableIcon = ({ handleEdit, handleDelete, showDelete, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <td className="admins-table__table-icon">
      <div className="admins-table__table-icon__content">
        <Icon
          size="md"
          name="three-dots-vertical"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
          {isMenuOpen && (
            <div className="admins-table__menu">
              <div className="admins-table__menu-option" onClick={handleEdit}>
                <Icon name="edit" />
                <p>{t("edit")}</p>
              </div>

              {showDelete && (
                <div
                  className="admins-table__menu-option"
                  onClick={handleDelete}
                >
                  <Icon name="trash" />
                  <p>{t("delete_icon")}</p>
                </div>
              )}
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </td>
  );
};

AdminsTable.propTypes = {
  /**
   * Boolean to show loading
   */
  isLoading: PropTypes.bool,

  /**
   * Array of strings to be used as table headers
   */
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * Array of admins
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      adminId: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),

  /**
   * The translation function
   */
  t: PropTypes.func.isRequired,
};

AdminsTable.defaultProps = {
  // Add defaultProps here
};
