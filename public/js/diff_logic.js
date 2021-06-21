import { diffWords } from 'diff';


// using this for a crude locally-unique identifier
var SYNONYM_COUNT = 0;
class Synonym {
  constructor(...words) {
    this.words = words;
    this.id = SYNONYM_COUNT++;
  }

  normalize(string) {
    this.words.forEach((word) => {
      string = string.replace(new RegExp(word, 'gi'), this.identString());
    })

    return string;
  }

  canonWord() {
    return this.words[0];
  }

  identString() {
    return `##SYNONYM_${this.id}##`;
  }
}

// ADD NEW SYNONYMS HERE
const synonyms = [
  new Synonym("isn't", "is not"),
  new Synonym("it's", "it is"),
];

export function runDiff(correct_answer, student_answer) {
  synonyms.forEach((syn) => {
    correct_answer = syn.normalize(correct_answer);
    student_answer = syn.normalize(student_answer);
  });

  const diffs = diffWords(correct_answer, student_answer, { ignoreCase: true });
  diffs.forEach((diff) => {
    synonyms.forEach((syn) => {
      diff.value = diff.value.replace(syn.identString(), syn.canonWord()); 
    });
  })

  return diffs;
}
