
function AnswerMessage(props: { message: string; correct: string }) {
  const { message, correct } = props;

  return (
    <div className={`text-center w-[280px] ${message === 'c' ? 'bg-green-600' : 'bg-red-600'} text-white p-3 rounded-md`}>
      {message === 'c' && <p>Resposta correta!</p>}
      {message === 'e' && <p>A resposta correta é: <br/> {correct}</p>}
    </div>
  )
}

export default AnswerMessage;