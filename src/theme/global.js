import { createGlobalStyle } from 'styled-components';

export const globalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};

  }

  nav {
    background : ${({ theme }) => theme.colors.sidebar.bg.end} !important;
  }

  a {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.button.color} !important;
  }

  .dropdown-menu {
    background-color: ${({ theme }) => theme.colors.modal.bg};
    padding: 4px;
}
  
`;