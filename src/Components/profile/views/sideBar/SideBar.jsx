import React from 'react';

function SideBar(props) {
    return (
        <Box
            as="aside"
            flex={1}
            mr={{ base: 0, md: 5 }}
            mb={{ base: 5, md: 0 }}
            bg="white"
            rounded="md"
            borderWidth={1}
            borderColor="brand.light"
            style={{ transform: 'translateY(-100px)' }}
        >
        </Box>
    );
}

export default SideBar;