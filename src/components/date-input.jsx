"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Datepicker from "tailwind-datepicker-react";

const DateInput = ({ title, label, state = "default", className, inputClassName, ...props }) => {
  const [show, setShow] = useState(false);

  const handleChange = selectedDate => {
    console.log(selectedDate);
  };

  const handleClose = state => {
    setShow(state);
  };

  const datepickerClassNames = cn(
    "w-full rounded p-2 border border-black/30 text-sm focus:ring-1 focus:outline-none",
    state === "default" &&
      "placeholder-text-[#808080] focus:border-primary-blue focus:ring-primary-blue",
    state === "error" && "placeholder-text-[#D80707] focus:border-[#D80707] focus:ring-[#D80707]",
    inputClassName
  );

  const options = {
    title: title || "Pick a date",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: datepickerClassNames,
    defaultDate: new Date("2022-01-01"),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  };

  return (
    <div className={cn("flex flex-col gap-1 group", className)}>
      {label && (
        <label
          className={cn(
            "text-xs",
            state === "default" && "text-[#808080]",
            state === "error" && "text-[#D80707]",
            "group-focus-within:text-primary-blue"
          )}
        >
          {title}
        </label>
      )}
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
        datepickerClassNames={datepickerClassNames}
        {...props}
      />
    </div>
  );
};

export default DateInput;
