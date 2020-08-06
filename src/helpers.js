import API from './Api';

// ES6 shuffle algorithm from https://stackoverflow.com/a/62713319/10491722
export const shuffle = (string) => {
  const shuffled = [...string];
  const clone = shuffled;

  // Define function to return random value from i to N
  const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);

  // Shuffle a pair of two elements at random position j (Fisher-Yates)
  shuffled.forEach((elem, i, arr, j = getRandomValue(i, arr.length)) => {
    [clone[i], clone[j]] = [clone[j], clone[i]];
  });

  const strShuffled = shuffled.join('');
  return strShuffled;
};

export const getWord = async () => {
  try {
    const word = await API.getWord();
    return word;
  } catch (e) {
    return e;
  }
};

export const submitWord = async (submission) => {
  try {
    const correct = await API.submitWord(submission);
    return correct;
  } catch (e) {
    return e;
  }
};
