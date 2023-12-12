import { ReactNode } from 'react';

import { ArrowForwardIos } from '@mui/icons-material';
import { Box, ListItemIcon, MenuItem } from '@mui/material';

const ListMenuItem = ({ children }: { children: ReactNode }) => {
  return (
    <MenuItem
      sx={{ justifyContent: 'space-between', backgroundColor: 'white' }}
    >
      <Box display={'flex'} alignItems="center">
        {children}
      </Box>
      <ListItemIcon sx={{ justifyContent: 'end' }}>
        <ArrowForwardIos fontSize="small" />
      </ListItemIcon>
    </MenuItem>
  );
};

export default ListMenuItem;
