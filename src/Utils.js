export const defaultDatePickerStyles = {
    margin: "5px 10px",
    ".MuiInputBase-input": {
        padding: "10px"
    },
    textField: {
        sx: {
            width: "170px",
        }
    }
};

export const defaultDatePickerSlotPropsStyles = {
    ".MuiInputBase-input": {
        padding: "10px"
    },
    textField: {
        sx: {
            width: "170px",
            ...defaultDatePickerStyles
        }
    }
};

export const defaultTextfieldStyles = {
    '.MuiInputBase-input': {
        padding: "12px"
    },
    '.MuiOutlinedInput-notchedOutline': {
        top: "0"
    }
};

export const getFormattedDate = (date) => {
    let currentDate = new Date(date.split("T")[0]);
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let day = currentDate.getDate();
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();
    let formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}