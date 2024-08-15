import React, { useState } from 'react';
import { Button, Box, Collapse, Stack } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';


import AppLinks from 'src/layouts/full/vertical/header/AppLinks';
import QuickLinks from 'src/layouts/full/vertical/header/QuickLinks';

const MobileSidebar = () => {
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)

    return (
        <>

            <Box p={3}>

                <Stack direction="column" spacing={2} >



                    <Button color="inherit"
                        onClick={() => setToggle2(!toggle2)}
                        endIcon={<IconChevronDown width={20} />}
                        sx={{
                            justifyContent: 'space-between'
                        }}>Pages</Button>
                    {toggle2 && (
                        <Collapse in={toggle2}>
                            <Box overflow="hidden" ml={1}>
                                <AppLinks />
                                <QuickLinks />
                            </Box>
                        </Collapse>
                    )}

                </Stack>
            </Box>
        </>


    );
};

export default MobileSidebar;
