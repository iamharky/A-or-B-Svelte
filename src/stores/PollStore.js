import {writable} from 'svelte/store';

const PollStore = writable([
  {
    id: 1,
    question: "React Native or Flutter?",
    answerA: "React Native",
    answerB: "Flutter",
    votesA: 14,
    votesB: 10
  }
]);

export default PollStore;