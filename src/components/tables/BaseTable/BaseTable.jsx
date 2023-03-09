import React, { useState } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

import { Loading } from "../../loaders";
import { Icon } from "../../icons/Icon";

import "./base-table.scss";

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
}) => {
  return (
    <div className="table__container">
      {isLoading ? (
        <Loading />
      ) : !rowsData || rowsData.length === 0 ? (
        <p>No data found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {rows.map((row, index) => {
                return (
                  <th key={"row" + index}>
                    <p className="text">{row}</p>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table__body">
            {rowsData?.map((rowData, dataIndex) => {
              return (
                <tr key={"dataIndex" + dataIndex}>
                  {rowData?.map((dataItem, dataItemIndex) => {
                    return (
                      <React.Fragment key={"dataItem" + dataItemIndex}>
                        <td className="table__td">{dataItem}</td>
                        {dataItemIndex === rowData.length - 1 && (
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
            })}
          </tbody>
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
