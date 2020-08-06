import API from './Api';

// ES6 shuffle algorithm from https://stackoverflow.com/a/62713319/10491722
export const shuffle = (string) => {
  const shuffled = [...string];

  // Define function to return random value from i to N
  const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);

  // Shuffle a pair of two elements at random position j (Fisher-Yates)
  shuffled.forEach(
    (elem, i, arr, j = getRandomValue(i, arr.length)) =>
      ([arr[i], arr[j]] = [arr[j], arr[i]])
  );

  const strShuffled = shuffled.join('');
  return strShuffled;
};

export const submitWord = async (submission) => {
  try {
    let correct = await API.submitWord({ word: challenge.word, submitted: submission });
    return correct;
  } catch (e) {
    return e;
  }
}
