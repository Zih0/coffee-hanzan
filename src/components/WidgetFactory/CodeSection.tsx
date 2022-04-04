import React, { useContext } from 'react';

import { AuthContext } from '@contexts/AuthContext';

function CodeSection() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {`<script type='text/javascript' src='https://d1o5y4v9jefboq.cloudfront.net/widget.js'></script><script type='text/javascript'>coffeeWidget.init('Buy me a coffee', '#11111','#ffffff', ${user.nickname});coffeeWidget.draw();</script>`}
        </div>
    );
}

export default CodeSection;
