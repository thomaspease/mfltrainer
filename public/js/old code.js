let state;
document.querySelector('#translations').addEventListener('click', (e) => {
  state = 'translation';
  displayQu(sentences[quNum].sentence);
  audio.src = `/audio/${sentences[quNum].audio}`;
});
document.querySelector('#transcriptions').addEventListener('click', (e) => {
  state = 'transcription';
  audio.src = `/audio/${sentences[quNum].audio}`;
});
document.querySelector('#gapped_questions').addEventListener('click', (e) => {
  state = 'gapped';
  displayGappedQu(sentences[quNum].sentence);
  audio.src = `/audio/${sentences[quNum].audio}`;
  audio.play();
});

if (state === 'translation') {
  if (
    transform(document.querySelector('input').value) ==
    transform(sentences[quNum].sentence)
  ) {
    quNum++;
    displayQu(sentences[quNum].sentence);
    console.log('Correct');
  } else {
    console.log(transformedSentence);
    console.log(transformedInput);
    sentences.splice(quNum + 5, 0, sentences[quNum]);
    quNum++;
    displayQu(sentences[quNum].sentence);
    console.log('Incorrect');
  }
}
