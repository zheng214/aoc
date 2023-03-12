let sequence = '3113322113';

for (let i = 0; i < 50 /* i < 40 */; i++) {
    const chunks = sequence.match(/(\d)\1*/g);
    sequence = chunks.map((x) => {
        const digit = x.substring(0,1);
        const length = x.length;
        return `${length}${digit}`;
    }).join('')
}

console.log(sequence.length)

