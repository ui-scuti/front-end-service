import styled, { css } from "styled-components";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { Card } from "react-bootstrap";
import ListItem from "@material-ui/core/ListItem";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import { ToggleButton } from "react-bootstrap";

export const Input = styled.input`
  display: block;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  color: white;
`;
export const BasicInput = styled(Input)`
  border-bottom: 1px solid #556a86;
`;
export const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.button.secondary} !important;
  border-bottom: 2px solid ${({ theme }) => theme.colors.button.secondary} !important;
  margin-right: 1rem;
  :active,
  :focus {
    outline: none;
  }
  :disabled {
    color: #ababab !important;
    cursor: not-allowed !important;
  }
`;

export const ButtonDangerSimple = styled(Button)`
  color: ${({ theme }) => theme.colors.button.danger} !important;
  border-bottom: 0px !important;
`;

export const ButtonDanger = styled(ButtonDangerSimple)`
  border-bottom: 2px solid ${({ theme }) => theme.colors.button.danger} !important;
`;

export const ToolbarButton = styled(Button)`
  color: ${({ theme }) => theme.colors.button.color} !important;
  padding: 0px;
  pdding-left: 8px;
  border-bottom: 0px !important;
`;

export const ButtonLink = styled(ToolbarButton)`
  color: ${({ theme }) => theme.colors.button.link} !important;
`;

export const SimpleButtonHighlight = styled(Button)`
  border: 0px !important;
  outline: none;
  background: none;
  font-weight: 700;
  margin: 0px;
  color: ${({ theme }) => theme.colors.button.color} !important;
  ${(props) =>
    props.disabled
      ? css`
          color: #232323;
        `
      : css`
          color: ${({ theme }) => theme.colors.button.color} !important;
        `};
`;
export const SimpleAnchorHighlight = styled.a`
  border: 0px !important;
  outline: none;
  background: none;
  font-weight: 700;
  margin: 1px 6px;
  color: ${({ theme }) => theme.colors.button.color} !important;
`;

export const ButtonHighlight = styled(SimpleButtonHighlight)`
  border-bottom: 2px solid ${({ theme }) => theme.colors.button.color} !important;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0px 8px 8px 0px;
  object-fit: cover;
`;

export const LinkText = styled.span`
  margin-left: 8px;
  font-size: 14px;
`;

export const PopoverItem = styled.span`
  fontsize: 18px;
  color: #d6d6d6;
`;


export const ThemedAutocomplete = styled(Autocomplete)`
  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.colors.input.border} !important;
  }

  .MuiInput-underline:before {
    border-color: ${({ theme }) => theme.colors.input.border} !important;
  }

  .MuiInputLabel-animated {
    color: ${({ theme }) => theme.colors.input.border} !important;
  }

  .MuiInputBase-input {
    color: ${({ theme }) => theme.colors.input.placeholder} !important;
  }
  .MuiInputLabel-outlined {
    color: ${({ theme }) => theme.colors.input.placeholder} !important;
  }

  .Mui-disabled > .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.colors.input.disabled} !important;
  }
  .Mui-disabled .MuiInputLabel-outlined {
    color: ${({ theme }) => theme.colors.input.disabled} !important;
  }

  .Mui-disabled .MuiInputLabel-outlined {
    color: ${({ theme }) => theme.colors.input.disabled} !important;
  }

  .Mui-disabled > .MuiAutocomplete-endAdornment {
    display: none !important;
  }
`;

export const ToggleButtonItem = styled(ToggleButton)`
  color: ${({ theme }) => theme.colors.toggle.color} !important;
  border-color: ${({ theme }) => theme.colors.toggle.color} !important;
  background: ${({ theme }) => theme.colors.toggle.bg} !important;
  .active {
    color: ${({ theme }) => theme.colors.toggle.colorActive} !important;
    background: ${({ theme }) => theme.colors.toggle.bgActive} !important;
  }
  :hover {
    color: ${({ theme }) => theme.colors.toggle.bg} !important;
    background: ${({ theme }) => theme.colors.toggle.color} !important;
  }
`;

export const CardTitle = styled(Card.Title)`
  color: ${({ theme }) => theme.colors.card.title} !important;
  color: white;
  font-weight: 300;
  font-size: 15px;
  margin: 8px;
  display: flex;
`;

export const ThemedListItem = styled(ListItem)`
  color: ${({ theme }) => theme.colors.card.title} !important;
  margin: 0px !important;
  background: transparent !important;
  border-left: 10px solid transparent !important;
  font-weight: 700;
  ${(props) => props.selected && listItemSelectionStyle}
`;

export const ThemedTab = styled(Tab)`
  color: ${({ theme }) => theme.colors.link.color} !important;
`;

export const TransparentLink = styled.a`
  height: 100%;
  width: 100%;
  background: transparent;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const listItemSelectionStyle = css`
  border: 1px solid ${({ theme }) => theme.colors.modal.btn.border} !important;
  border-left: 10px solid ${({ theme }) => theme.colors.modal.btn.border} !important;
`;

export const ThemedVerticalDivider = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.modal.btn.border};
  margin: 0px 12px 4px 0px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline;
`;
export const ThemedHorizontalDivider = styled.div`
  border-top: 2px solid ${({ theme }) => theme.colors.modal.btn.border};
  margin: 0px 12px 4px 0px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline;
`;
