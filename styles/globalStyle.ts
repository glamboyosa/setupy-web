import { createGlobalStyle } from 'styled-components';
const globalStyle = createGlobalStyle`
:root {
  --white-shade: #fafafa;
  --black: #000000;
  --white: #ffffff;
  --int-blue: #360ccc;
  
}
*, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    
};
html {
  font-size: 62.5%;
}
body {
  box-sizing: border-box;
  font-family: 'Padauk', sans-serif;
  
}
`;
export default globalStyle;
