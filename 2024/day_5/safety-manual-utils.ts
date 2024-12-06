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

export type IncorrectUpdates = Input;

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

const fixRule = (update: Update, rule: PageOrderingRule) => {
  const beforeIndex = update.pages.findIndex((page) =>
    page === rule.mustAppearBefore
  );
  const afterIndex = update.pages.findIndex((page) =>
    page === rule.mustAppearAfter
  );
  update.pages.splice(beforeIndex, 1);
  update.pages.splice(afterIndex, 0, rule.mustAppearBefore);
  return update;
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

const filterRelevantRules = (update: Update, allRules: PageOrderingRule[]) => {
  const allRelevantRules: PageOrderingRule[] = [];
  for (let rule of allRules) {
    if (
      update.pages.includes(rule.mustAppearBefore) &&
      update.pages.includes(rule.mustAppearAfter)
    ) {
      allRelevantRules.push(rule);
    }
  }
  return allRelevantRules;
};

export const fixIncorrectUpdates = (incorrectUpdates: IncorrectUpdates) => {
  const fixedUpdates: Update[] = [];
  for (const incorrectUpdate of incorrectUpdates.updates) {
    let fixedUpdate = { ...incorrectUpdate };
    const allRelevantRules = filterRelevantRules(
      incorrectUpdate,
      incorrectUpdates.pageOrderingRules,
    );
    let relevantRules = [...allRelevantRules];
    while (relevantRules.length > 0) {
      const [currentRule] = relevantRules.splice(0, 1);
      if (!currentRule) {
        throw new Error("no rule to process");
      }
      if (!checkRule(fixedUpdate, currentRule)) {
        console.log(
          fixedUpdate.line,
          "with ",
          fixedUpdate.pages,
          "violates ",
          currentRule,
        );
        fixedUpdate = fixRule(fixedUpdate, currentRule);
        relevantRules = [...allRelevantRules];
        console.log("after violation fixed: ", fixedUpdate);
      } else {
        console.log("rule ", currentRule, " is not violated");
      }
    }
    console.log(
      "incorrect update",
      incorrectUpdate,
      " was fixed and is now ",
      fixedUpdate,
    );
    fixedUpdates.push(fixedUpdate);
  }
  return fixedUpdates;
};

export const mapToMiddlePageNumber = (update: Update) => {
  return update.pages[Math.floor(update.pages.length / 2)];
};
