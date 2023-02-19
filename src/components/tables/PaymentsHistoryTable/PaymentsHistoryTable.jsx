import React from "react";
import PropTypes from "prop-types";

import { Loading } from "../../loaders/Loading";

import { Button } from "../../buttons/Button";

import { getTime, getDateView } from "../../../utils";

import "./payments-history-table.scss";

/**
 * PaymentsHistoryTable
 *
 * PaymentsHist
 *
 * @return {jsx}
 */
export const PaymentsHistoryTable = ({
  isLoading,
  rows,
  data,
  t,
  handleViewMore,
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");
  return (
    <div className="payments-history-table__container">
      {isLoading ? (
        <Loading />
      ) : !data || data.length === 0 ? (
        <p>{t("no_payments_history_found")}</p>
      ) : (
        <table className="payments-history-table__table">
          <thead>
            <tr>
              {rows.map((row, index) => {
                return <th key={row + index}>{t(row)}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => {
              return (
                <tr key={payment.paymentId}>
                  <td className="payments-history-table__table__td">
                    <p className="text payments-history-table__table__name">
                      {t(payment.service)}
                    </p>
                  </td>
                  <td className="payments-history-table__table__td">
                    {payment.price}
                    {currencySymbol}
                  </td>
                  <td className="payments-history-table__table__td">
                    {getDateView(payment.date)} - {getTime(payment.date)}
                  </td>
                  <td className="payments-history-table__table__td">
                    <Button
                      type="link"
                      label={t("more_details")}
                      onClick={() => handleViewMore(payment.paymentId)}
                    ></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

PaymentsHistoryTable.propTypes = {
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
      paymentId: PropTypes.string,
      service: PropTypes.string,
      price: PropTypes.number,
      date: PropTypes.string,
    })
  ),

  /**
   * The translation function
   */
  t: PropTypes.func.isRequired,
};

PaymentsHistoryTable.defaultProps = {
  // Add defaultProps here
};
