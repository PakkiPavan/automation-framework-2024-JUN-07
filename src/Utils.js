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
