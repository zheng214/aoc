const line = ' * @example input: 10; output: { 1: true, 2: true, 3: true, 6: true, 10: true }'
const description = {};
const _example = line.split('@example')[1].trim();
const [input, output] = _example.split(/; /g);
const inputValue = input.split('input: ')[1]
const outputValue = output.split('output: ')[1]
const example = { inputValue, outputValue };
description.examples = description.examples ? [...description.examples, example] : [example];
console.log(example)