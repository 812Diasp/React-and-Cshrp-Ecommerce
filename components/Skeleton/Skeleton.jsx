import React from 'react';

// eslint-disable-next-line react/prop-types
function Skeleton({ width, height, style }) {
    const defaultStyle = {
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        display: 'block',
        marginBottom: '10px',
        ...style
    }

    return <div style={{ ...defaultStyle, width, height }} />;
}
export default Skeleton;