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

export const getFormattedDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formattedDate = inputDate.toLocaleString('en-US', options);

    return formattedDate;
}

export const getFormattedDayJsDate = (dayJsDate) => {
    const year = dayJsDate.year();
    const month = String(dayJsDate.month() + 1).padStart(2, '0');
    const date = String(dayJsDate.date()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;

    return formattedDate;
};

export const formatNumber = (num, decimals = 2) => {
    if (num % 1 !== 0) {
        return num.toFixed(decimals);
    } else {
        return num;
    }
}

export const overflowStyles = {
    textOverflow: "ellipsis",
    maxWidth: "200px",
    overflow: "hidden",
    whiteSpace: "nowrap",
}

export const getName = (str) => {
    let lastIndex = str.lastIndexOf("_");
    let result = str.substring(0, lastIndex);
    return result;
}

export const getId = (str) => {
    let lastIndex = str.lastIndexOf("_");
    let result = str.substring(lastIndex + 1);
    return result ? Number(result) : result;
}

export const isNullOrEmpty = (value) => {
    if (!value || value.trim() === "") {
        return true;
    }

    return false;
}