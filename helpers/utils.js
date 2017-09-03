const _getSubSentence = (inputSentence, len) => {
  return inputSentence.split(' ').slice(0, len).join(' ')
}