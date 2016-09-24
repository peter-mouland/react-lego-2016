const navHeight = '2em';
const footerHeight = '2em';
const contentHeight = `calc(100vh - ${parseInt(navHeight, 10) + parseInt(footerHeight, 10)}em)`;

export const layout = {
  width: '100%'
};

export const nav = {
  padding: '0 2.25%',
  height: navHeight
};

export const navHeader = {
  marginRight: '10px',
  borderRight: '6px double currentColor',
  paddingRight: '10px'
};

export const navLink = {
  margin: '0 6px',
  lineHeight: '2em',

  ':firstOfType': {
    marginLeft: 0
  },
  ':lastOfType': {
    marginRight: 0
  }
};

const clearfix = {
  content: '',
  display: 'table',
  clear: 'both'
};

export const content = {
  minHeight: contentHeight,
  padding: '0 2.25%',

  '::before': clearfix,
  '::after': clearfix
};

export const footer = {
  padding: '0 2.25%',
  height: footerHeight,
  lineHeight: '2em'
};
