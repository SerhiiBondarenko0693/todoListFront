import React, { SVGProps } from 'react';

const DeleteSVG: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        style={{ color: "red",
            width: '30px',
            height: '30px',
        }}
        viewBox="0 0 1024 1024"
        {...props}
    >
        <path fill="red" d="M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32zm370.752 448-90.496-90.496 45.248-45.248L512 530.752l90.496-90.496 45.248 45.248L557.248 576l90.496 90.496-45.248 45.248L512 621.248l-90.496 90.496-45.248-45.248L466.752 576z"></path>
    </svg>
);

export default DeleteSVG;