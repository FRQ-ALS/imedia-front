import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

export default function DropDownMenu(props) {

    const openReportHandler = (e) => {

    }


  return (
    <Paper sx={{ width: 150, maxWidth: '100%', position:'absolute', opacity:'1' }}>
      <MenuList>
        <MenuItem onClick={event =>console.log("clicking on absent")}   >
          <ListItemText>View Report</ListItemText>
        </MenuItem>
        <MenuItem onClick={event =>console.log("clicking on absent")}>
          <ListItemText>Mark absent</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
