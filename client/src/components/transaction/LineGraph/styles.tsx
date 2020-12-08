import styled from 'styled-components';

export const StyledLineGraph = styled.div`
  padding: 10px;
  width: auto;
  height: auto;
  background-color: #fff;
`;

export const CustomTooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  padding: 0.5rem;
  background-color: rgba(238, 238, 239, 0.4);
  border: 0.5px solid rgb(209, 209, 214);
  border-radius: 10px;
`;

export const TooltipText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.3rem;
`;

type ColorBoxProps = {
  color: string;
};

export const TooltipColorBox = styled.div<ColorBoxProps>`
  width: 13px;
  height: 13px;
  margin-right: 3px;
  border: 1px solid white;
  background: ${(props) => props.color};
`;
