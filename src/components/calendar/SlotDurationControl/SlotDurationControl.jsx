import React from "react";

import "./slot-duration-control.scss";

/**
 * SlotDurationControl
 *
 * How long a slot is: 30 minutes or an hour.
 *
 * This sits at the top of the slot menu, above the normal / campaign /
 * organization rows, because duration belongs to the time itself rather than to
 * one of those pools - the same 16:00 cannot be half an hour for a campaign and
 * an hour for an organization.
 *
 * On a slot that is already open it changes the length; on an empty cell it
 * chooses the length the slot will be opened with.
 *
 * @return {jsx}
 */
export const SlotDurationControl = ({
  value,
  onChange,
  disabled,
  options = [30, 60],
  t,
}) => {
  const labelFor = (minutes) =>
    minutes === 60
      ? t("duration_one_hour")
      : t("duration_minutes", { minutes });

  return (
    <div
      className="slot-duration-control"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="small-text slot-duration-control__label">
        {t("slot_duration")}
      </p>
      <div className="slot-duration-control__options" role="group">
        {options.map((minutes) => (
          <button
            key={minutes}
            type="button"
            aria-pressed={Number(value) === minutes}
            disabled={disabled}
            className={[
              "small-text",
              "slot-duration-control__option",
              Number(value) === minutes
                ? "slot-duration-control__option--selected"
                : "",
              disabled ? "slot-duration-control__option--disabled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={(event) => {
              event.stopPropagation();
              if (disabled || Number(value) === minutes) return;
              onChange(minutes);
            }}
          >
            {labelFor(minutes)}
          </button>
        ))}
      </div>
    </div>
  );
};
