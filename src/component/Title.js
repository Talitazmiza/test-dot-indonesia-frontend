import React from 'react';
import styled from 'styled-components';

// implement styled components
// Create Title component that render <h3> tag

export default function Title() {
    const Background = styled.section`
      padding: 4em;
      background: papayawhip;
    `;

    const Text = styled.h3`
      font-size: 1.5em;
      font-align: center;
      color: palevioletred;
      text-align: center;
    `;

    return (
        <Background>
            <Text>Cat-o Facts🐱</Text>
        </Background>
    );
}



