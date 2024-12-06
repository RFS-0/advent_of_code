import { splitByComma, splitByNewLine } from "@strings";

export type Update = {
  line: number;
  pages: number[];
};

export type PageOrderingRule = {
  mustAppearBefore: number;
  mustAppearAfter: number;
};

export type Input = {
  pageOrderingRules: PageOrderingRule[];
  updates: Update[];
};

export const parseInput = (input: string) => {
  const lines = splitByNewLine(input);

  const endOfRules = lines.findIndex((line) => line.length === 0);
  const pageOrderingRules: PageOrderingRule[] = [];
  const updates: Update[] = [];
  for (let rawRule of lines.slice(0, endOfRules)) {
    const [before, after] = rawRule.split("|");
    pageOrderingRules.push({
      mustAppearBefore: parseInt(before),
      mustAppearAfter: parseInt(after),
    });
  }
  let line = 1;
  for (const rawPages of lines.splice(endOfRules + 1, lines.length)) {
    const update: number[] = [];
    if (rawPages.length === 0) {
      continue;
    }
    for (const rawPage of splitByComma(rawPages)) {
      update.push(parseInt(rawPage));
    }
    updates.push({
      line,
      pages: update,
    });
    line++;
  }
  return {
    pageOrderingRules,
    updates,
  } as Input;
};

const checkRule = (update: Update, rule: PageOrderingRule) => {
  const indexOfBefore = update.pages.findIndex((page) =>
    page === rule.mustAppearBefore
  );
  const indexOfAfter = update.pages.findIndex((page) =>
    page === rule.mustAppearAfter
  );
  return (indexOfBefore === -1 || indexOfAfter === -1) ||
    (indexOfBefore < indexOfAfter);
};

export const filterCorrectUpdates = (parsed: Input) => {
  const correctUpdates: Update[] = [];
  for (const update of parsed.updates) {
    let isCorrect = true;
    for (const rule of parsed.pageOrderingRules) {
      isCorrect = checkRule(update, rule);
      if (!isCorrect) {
        break;
      }
    }
    if (isCorrect) {
      correctUpdates.push(update);
    }
  }
  return correctUpdates;
};

export const mapToMiddlePageNumber = (update: Update) => {
  return update.pages[Math.floor(update.pages.length / 2)];
};
