import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { login, logout } from './login';
import { fetchWords, fetchUser } from './exercises';
import { showAlert } from './alerts';
import { postSentence } from './createSentences';
import { getWithCollectionAndQueryString, axiosReq } from './axiosMethods';
import { updateSettings } from './updateSettings';

//Ignore punctuation and lower case
const transform = (e) => {
  return e.toLowerCase().replace(/[^a-z]/g, '');
};

//DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const createSentenceForm = document.querySelector('.create-sentence-form');
const createTaskForm = document.querySelector('.create-task-form');
const answerBtn = document.querySelector('.btn-answer');
const startBtn = document.querySelector('.btn-start');
const audio = document.querySelector('audio');
const userDataForm = document.querySelector('.user-view');
const select = document.querySelector('select');

//STATES

let sentences;
let user;
let quNum = 0;
let missingWord;

//Populate states
(async () => {
  sentences = await fetchWords();
})();

(async () => {
  user = await fetchUser();
})();

// DELEGATION
//Login
if (loginForm) {
  console.log('hello from index.js');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn)
  logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

if (createSentenceForm) {
  createSentenceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sentence = document.getElementById('spanish').value;
    const translation = document.getElementById('english').value;
    const level = document.getElementById('level').value;
    const vivaRef = document.getElementById('vivaRef').value;
    const tense = document.getElementById('tense').value;
    const grammar = document.getElementById('grammar').value;

    postSentence(sentence, translation, level, vivaRef, tense, grammar);
  });
}

//Need to set up changing exercise functionality with radio buttons

// if (createTaskForm) {
//   createTaskForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const body = {
//       query: {
//         limit: document.querySelector('#sentencesLimit').value,
//         level: {
//           gte: document.querySelector('#levelGte').value,
//           lte: document.querySelector('#levelLte').value,
//         },
//         vivaref: {
//           gte: document.querySelector('#vivaRefGte').value,
//           lte: document.querySelector('#vivaRefLte').value,
//         },
//       },
//       task: {
//         sentences: [],
//         teacher: null,
//         exercise: 'gapped',
//       },
//     };
//     axiosReq('tasks/teacher-set', body, 'POST');
//   });
// }

//Lets a teacher assign a task to students in a class
//This requires 3 API calls so there is probably a better way of doing it (all in the back end?)
if (createTaskForm) {
  createTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      //Get search params from DOM
      const setTaskQuery = new URLSearchParams({
        limit: document.querySelector('#sentencesLimit').value,
        'level[gte]': document.querySelector('#levelGte').value,
        'level[lte]': document.querySelector('#levelLte').value,
        'vivaRef[gte]': document.querySelector('#vivaRefGte').value,
        'vivaRef[lte]': document.querySelector('#vivaRefLte').value,
      });
      const query = decodeURIComponent(setTaskQuery.toString());
      //Get sentences with API
      const filteredSentences = await getWithCollectionAndQueryString(
        'sentences',
        query
      );

      //Create new task for class
      const body = {
        sentences: filteredSentences.data.data.data,
        teacher: null,
        exercise: 'gapped',
      };
      const newTask = await axiosReq('tasks', body, 'POST');

      // Assign task to class or students
      const patchBody = {
        $push: { tasks: newTask.data.data.data._id },
      };
      axiosReq(`classes/${select.value}`, patchBody, 'PATCH');
    } catch (err) {
      showAlert('error', err);
    }
  });
}

//Update user data
if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = ('name', document.getElementById('name').value);
    const email = ('email', document.getElementById('email').value);
    const form = { name, email };
    updateSettings(form, 'data');
  });

//Languages exercise
// if (document.querySelector('.triple__radio')) {
//   console.log(sentences)
//   displayGappedQu(sentences[quNum].sentence);
// }

const playAudio = (e) => {
  if (e.keyCode === 82) {
    document.querySelector('audio').play();
  }
};

//Replay audio if R key hit (needs a better solution - will play when user types R as part of an answer)

if (document.querySelector('.triple__radio')) {
  document.addEventListener('keydown', playAudio);

  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    displayGappedQu(sentences[quNum].sentence);
    audio.src = `/audio/${sentences[quNum].audio}`;
    document.querySelector('audio').play();
  });

  answerBtn.addEventListener('click', (e) => {
    if (document.querySelector('input').value == missingWord) {
      quNum++;
      displayGappedQu(sentences[quNum].sentence);
      audio.src = `/audio/${sentences[quNum].audio}`;
      audio.play();
      showAlert('success', 'Correct!');
      document.querySelector('input').value = '';
    } else {
      console.log(sentences);
      console.log(user);
      sentences.splice(quNum + 5, 0, sentences[quNum]);
      quNum++;
      console.log(sentences);
      displayGappedQu(sentences[quNum].sentence);
      audio.src = `/audio/${sentences[quNum].audio}`;
      audio.play();
      showAlert('error', 'Wrong!');
      document.querySelector('input').value = '';
    }
  });
}

const displayGappedQu = (e) => {
  const slicedSentence = e.split(' ');
  const randomNum = Math.floor(Math.random() * slicedSentence.length);
  missingWord = slicedSentence[randomNum];
  slicedSentence.splice(randomNum, 1, '________');
  const rejoinedSentence = slicedSentence.join(' ');
  document.querySelector('.card__text').textContent = rejoinedSentence;
};

//FIX URL
const fixedEncodeURI = (str) => {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
};
