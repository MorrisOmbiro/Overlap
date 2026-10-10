import { textDictionary } from "../data";

const generatePassageText = (
  difficultyIndex: number,
  random: () => number = Math.random,
  usedSentences = new Set<string>(),
): string => {
  const { dictionary, levels } = textDictionary;
  const configuration = levels[difficultyIndex];
  const wordBanks = [
    dictionary.adjectives.slice(0, configuration.adjectiveCount),
    dictionary.subjects.slice(0, configuration.subjectCount),
    dictionary.verbs.slice(0, configuration.verbCount),
    dictionary.objects.slice(0, configuration.objectCount),
    dictionary.places.slice(0, configuration.placeCount),
  ];
  const combinationCount = wordBanks.reduce(
    (count, words) => count * words.length,
    1,
  );

  const sentenceFromIndex = (combinationIndex: number): string => {
    const words = wordBanks.map((bank) => {
      const word = bank[combinationIndex % bank.length];
      combinationIndex = Math.floor(combinationIndex / bank.length);
      return word;
    });
    return `The ${words.join(" ")}.`;
  };

  return Array.from({ length: configuration.sentenceCount }, () => {
    const startingIndex = Math.floor(random() * combinationCount);
    for (let offset = 0; offset < combinationCount; offset++) {
      const sentence = sentenceFromIndex(
        (startingIndex + offset) % combinationCount,
      );
      if (!usedSentences.has(sentence)) {
        usedSentences.add(sentence);
        return sentence;
      }
    }
    throw new Error("The sentence dictionary has been exhausted.");
  }).join(" ");
};

export { generatePassageText };
