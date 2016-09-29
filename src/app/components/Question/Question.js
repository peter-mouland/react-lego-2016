import Preact, { h } from 'preact';

const QuestionOption = ({ onClick, attempt, option, answer, showAnswer }) => {
  const classNames = ['question__option'];
  if (attempt === option) {
    classNames.push('question__option--selected');
  }
  if (showAnswer) {
    classNames.push(answer === option ? 'question__option--correct' : 'question__option--wrong');
  }
  return <li className={classNames.join(' ')} onClick={onClick} >{option}</li>;
};

export default class Question extends Preact.Component {

  render({ children, showAnswer, answer, cards, attempt, onClick, ...props }, {}) {
    if (!cards.length) return null;

    const options = [cards[0].name, cards[1].name, 'both', 'unknown'];
    const optionProps = { answer, attempt, showAnswer };
    return (
      <section className="question" { ...props }>
        <p>{children}</p>
        <ul className="question__options">
          {options.map((option, i) => (
            <QuestionOption {...optionProps} onClick={() => onClick(option)} key={i} option={option} />
          ))}
        </ul>
      </section>
    );
  }
}
