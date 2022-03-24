import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { theme } from './theme';

const Mobile: React.FC = ({ children }) => {
    const isMobile = useMediaQuery({
        query: theme.size.mobile,
    });
    return <React.Fragment>{isMobile && children}</React.Fragment>;
};

const PC: React.FC = ({ children }) => {
    const isPc = useMediaQuery({
        query: '(min-width:769px) ',
    });
    return <React.Fragment>{isPc && children}</React.Fragment>;
};

export { Mobile, PC };
