import generateName from 'sillyname';
import {randomSuperhero} from 'superheroes';
var sillyName = generateName();
var superhero = randomSuperhero();

console.log(`Hello ${sillyName}`);
console.log(`I am ${superhero}`);
