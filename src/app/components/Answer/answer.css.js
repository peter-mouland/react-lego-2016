import { itemColor, itemColorCorrect } from '../../../styles/utils/colours.css';

export const cardItemValue = {
  display: 'block'
};

export const option = {
  width: '49%',
  float: 'left',
  marginRight: '1%',
  padding: '1%',
  border: `1px dashed ${itemColor}`
};

export const optionAnswer = {
  border: `2px solid ${itemColorCorrect}`
};

export const optionTitle = {
  fontWeight: 'bold',
  display: 'inline-block',
  width: '40%',
  minWidth: '100px'
};

export const optionValue = {
  display: 'inline-block',
  width: '60%',
  margin: '0',
  minWidth: '150px'
};
