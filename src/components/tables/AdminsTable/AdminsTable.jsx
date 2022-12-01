import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

import { Loading } from "../../loaders/Loading";
import { Icon } from "../../icons/Icon";

import "./admins-table.scss";

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
}) => {
  return (
    <div className="admins-table__container">
      {isLoading ? (
        <Loading />
      ) : (
        <table className="admins-table__table">
          <thead>
            <tr>
              {rows.map((row, index) => {
                return <th key={row + index}>{t(row)}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((admin) => {
              return (
                <tr key={admin.adminId}>
                  <td className="admins-table__table__td">
                    <p className="text admins-table__table__name">
                      {admin.name + " " + (admin.surname || "")}
                    </p>
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
                    <p className="text">
                      {}
                      {admin.phone
                        ? `${admin.phonePrefix} ${admin.phone}`
                        : "N/A"}
                    </p>
                  </td>
                  <TableIcon
                    t={t}
                    handleEdit={() => handleEdit(admin.adminId)}
                    handleDelete={() => handleDelete(admin.adminId)}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const TableIcon = ({ handleEdit, handleDelete, t }) => {
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

              <div className="admins-table__menu-option" onClick={handleDelete}>
                <Icon name="trash" />
                <p>{t("delete_icon")}</p>
              </div>
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
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,

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
      phonePrefix: PropTypes.string,
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
