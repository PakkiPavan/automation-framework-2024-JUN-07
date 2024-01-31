import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { Autocomplete, TextField } from '@mui/material';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// function getStyles(name, selectedValue, theme) {
//     return {
//         fontWeight:
//             selectedValue.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

export default function CustomDropdown(props) {
    const names = props.names;
    // const theme = useTheme();
    // const [selectedValue, setSelectedValue] = React.useState(props.value ? props.value : "");
    const selectedValue = props.value;

    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setSelectedValue(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    return (
        <div>
            <Autocomplete
                disablePortal
                options={names}
                size="small"
                value={selectedValue}
                onChange={(event, option) => {
                    props.onChange(option);
                }}
                disableClearable={true}
                sx={{
                    width: "200px",
                    ...(props.customStyles ? props.customStyles : {})
                }}
                renderInput={(params) => <TextField {...params} label={props.label} />}
            />
            {/* <FormControl sx={{ m: 1, width: 200 }}>
                <Select
                    displayEmpty
                    value={selectedValue}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    // renderValue={(selected) => {
                    //     if (selected.length === 0) {
                    //         return <em>{props.placeholder}</em>;
                    //     }

                    //     return selected.join(', ');
                    // }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        ".MuiSelect-select":{
                            padding: "10px"
                        }
                    }}
                >
                    <MenuItem disabled value="">
                        <em>{props.placeholder}</em>
                    </MenuItem>
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, selectedValue, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
        </div>
    );
}
