// ES6 shuffle algorithm from https://stackoverflow.com/a/62713319/10491722
const shuffle = (string) => {
  let shuffle = [...string];

  // Define function to return random value from i to N
  const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);

  // Shuffle a pair of two elements at random position j (Fisher-Yates)
  shuffle.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

  return shuffle.join('');
}

export default shuffle;
