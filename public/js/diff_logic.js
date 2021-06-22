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
      // CAVEAT: if the word contains any regex metacharacters, then it might not work as intended
      // if that's a problem, you'd need to escape it (either escape it in the list of synonyms, OR add escaping code here, but not both)
      string = string.replace(new RegExp(`\\b${word}\\b`, 'gi'), (orig) => `${this.identString()}${encode(orig)}##`);
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

// using an encoding which consists only of numbers and punctuation, in order to avoid the risk of an accidental double-replacement
function encode(str) {
  return str.split('').map((c) => c.charCodeAt(0)).join(',');
}
function decode(str) {
  return str.split(',').map((num) => String.fromCharCode(num-0)).join('');
}

export function runDiff(correct_answer, student_answer) {
  synonyms.forEach((syn) => {
    correct_answer = syn.normalize(correct_answer);
    student_answer = syn.normalize(student_answer);
  });

  const correct_answer_subs = [];
  const student_answer_subs = [];

  correct_answer = correct_answer.replace(/(##SYNONYM_\d+##)([^#]+)##/g, (_, match1, match2) => {
    correct_answer_subs.push(decode(match2));
    return match1;
  })
  student_answer = student_answer.replace(/(##SYNONYM_\d+##)([^#]+)##/g, (_, match1, match2) => {
    student_answer_subs.push(decode(match2));
    return match1;
  })

  //console.log(correct_answer, correct_answer_subs);
  console.log(student_answer, student_answer_subs);

  const diffs = diffWords(correct_answer, student_answer, { ignoreCase: true });

  // we want to return both versions (synonym-aware), SO, let's do a shallow clone on these diffs
  const student = diffs.map((diff) => ({...diff}));
  const original = diffs.map((diff) => ({...diff}));
  student.forEach((diff) => {
    diff.value = diff.value.replace(/##SYNONYM_\d+##/g, () => student_answer_subs.shift()); 
  })
  original.forEach((diff) => {
    diff.value = diff.value.replace(/##SYNONYM_\d+##/g, () => correct_answer_subs.shift()); 
  })

  return {student, original};
}

window.runDiff = runDiff;
window.synonyms = synonyms;
