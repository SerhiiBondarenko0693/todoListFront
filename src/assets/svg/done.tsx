import React, { SVGProps } from 'react';

const DoneSVG: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        style={{ color: "red",
            width: '30px',
            height: '30px',
        }}
        viewBox="0 0 48 48"
        {...props}
    >
        <path d="M0 0h48v48h-48z" fill="none"/>
        <path d="M18 32.34l-8.34-8.34-2.83 2.83 11.17 11.17 24-24-2.83-2.83z"/>
    </svg>
);

export default DoneSVG;