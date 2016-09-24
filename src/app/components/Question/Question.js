import React from 'react';

import * as styles from './question.css';
import merge from '../../../styles/utils/merge';


const QuestionOption = ({ onClick, attempt, children, answer, showAnswer }) => {
  const style = merge(
    styles.option,
    attempt === children && styles.optionSelected,
    showAnswer && answer === children && styles.optionCorrect,
    showAnswer && answer !== children && styles.optionWrong,
  );
  return <li style={style} onClick={onClick} >{children}</li>;
};

export default class Question extends React.Component {

  render() {
    const { children, showAnswer, answer, cards, attempt, onClick, ...props } = this.props;
    if (!cards.length) return null;

    const options = [cards[0].name, cards[1].name, 'both', 'unknown'];
    const optionProps = { answer, attempt, showAnswer };

    return (
      <section { ...props }>
        <p>{children}</p>
        <ul style={styles.options}>
          {options.map((option, i) => (
            <QuestionOption {...optionProps} onClick={() => onClick(option)} key={i}>
              {option}
            </QuestionOption>
          ))}
        </ul>
      </section>
    );
  }
}
