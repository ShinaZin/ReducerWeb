import * as React from 'react';
export const Loader = () =>
    // tslint:disable-next-line:jsx-wrap-multiline
    <div className="flexbox flex-align-center flex-just-center"  >
        <div
            data-role="preloader"
            data-type="ring"
            data-style="dark"
            style={{ top: '50%', position: 'absolute' }}
        />
    </div>;
