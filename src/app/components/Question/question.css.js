import { itemColor, itemColorCorrect, itemColorWrong, itemColorSelected } from '../../../styles/utils/colours.css';

export const options = {
  padding: 0
};

export const option = {
  display: 'block',
  border: `1px dashed ${itemColor}`,
  padding: '4px',
  margin: '4px',
  cursor: 'pointer'
};

export const optionSelected = {
  border: `2px solid ${itemColorSelected}`
};

export const optionWrong = {
  borderColor: itemColorWrong
};

export const optionCorrect = {
  borderColor: itemColorCorrect
};
