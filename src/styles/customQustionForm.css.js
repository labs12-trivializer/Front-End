import styled, { css } from 'styled-components';
import { Wizard } from 'react-albus';
import Dropdown from 'react-dropdown';

export const QuestionWizard = styled(Wizard)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const StepTitle = styled.div`
  color: #ebecf1;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const StepForm = styled.form`
  color: #19b9e9;
  background-color: rgba(31, 71, 115, 0.75);
  padding: 2rem 0;
  margin-bottom: 1rem;
`;

export const StepTextInput = styled.input`
  font-size: 1.8rem;
  padding: 0.8rem 5.2rem 0.8rem 1rem;
  flex: 1;
`;

export const StepBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StepField = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: space-between;
`;

export const StepDropdown = styled(Dropdown)`
  .Dropdown-control {
    border-radius: 0;
    padding: 0.8rem 5.2rem 0.8rem 1rem;
    font-size: 1.8rem;
  }

  .Dropdown-menu {
    font-size: 1.8rem;
  }
`;

export const StepControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StepButton = styled.button`
  flex: 1;
  font-size: 1.8rem;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  outline: none;
  margin: 2rem 1rem 0rem;
  border-radius: 1rem;
  color: #ebecf1;
  border: 2px solid #19b9e9;
  background-color: #19b9e9;
  &:hover {
    background-color: #ebecf1;
    color: #19b9e9;
  }

  ${props =>
    props.secondary &&
    css`
      color: #1f4773;
      border: 2px solid #ebecf1;
      background-color: #ebecf1;

      &:hover {
        background-color: #1f4773;
        color: #ebecf1;
      }
    `}
`;

export const CheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 2.5rem;
  width: 2.5rem;
  background-color: #eee;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

export const StepCheckBox = styled.label`
  display: block;
  position: relative;
  padding-left: 3.5rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  user-select: none;
  font-size: 2.2rem;
  color: #ebecf1;
  margin: 1rem;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &:hover input ~ ${CheckMark} {
    background-color: #ccc;
  }

  input:checked ~ ${CheckMark} {
    background-color: #19b9e9;
  }

  input:checked ~ ${CheckMark}:after {
    display: block;
  }

  ${CheckMark}:after {
    left: 0.9rem;
    top: 0.5rem;
    width: 0.5rem;
    height: 1rem;
    border: solid white;
    border-width: 0 0.3rem 0.3rem 0;
    transform: rotate(45deg);
  }
`;
