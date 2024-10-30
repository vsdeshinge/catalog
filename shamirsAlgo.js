
const testcase1 = require('./testcase1.json');
const testcase2 = require('./testcase2.json');
const testcase3 = require('./testcase3.json');


function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    let constantTerm = 0;

    for (let i = 0; i < points.length; i++) {
        const [xi, yi] = points[i];
        let term = yi;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const [xj, _] = points[j];
                term *= (0 - xj) / (xi - xj);
            }
        }
        constantTerm += term;
    }

    return Math.round(constantTerm);
}


function findSecret(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;
    const points = [];

    
    for (let i = 1; i <= n; i++) {
        if (jsonData[i.toString()]) {
            const x = i;
            const yBase = parseInt(jsonData[i.toString()].base, 10);
            const yValue = jsonData[i.toString()].value;
            const y = decodeValue(yBase, yValue);
            points.push([x, y]);
        }
    }

   
    points.sort((a, b) => a[0] - b[0]);
    
    const selectedPoints = points.slice(0, k);

    

    
    const secret = lagrangeInterpolation(selectedPoints);
    
    return secret;
}

console.log("Secret for Test Case 1:", findSecret(testcase1));
console.log("Secret for Test Case 2:", findSecret(testcase2));
console.log("Secret for Test Case 3:", findSecret(testcase3));

