import assert from 'node:assert/strict';
import {compareWeights} from '../src/scripts/weight-calculator.js';
const parcel={actual:4,length:40,width:30,height:30,divisor:6000};
assert.deepEqual(compareWeights(parcel),{volumetric:6,chargeable:6});
assert.deepEqual(compareWeights({...parcel,divisor:5000}),{volumetric:7.2,chargeable:7.2});
assert.equal(compareWeights({...parcel,actual:8}).chargeable,8);
for(const value of [0,-1,NaN,Infinity,1000001]) assert.equal(compareWeights({...parcel,divisor:value}),null);
assert.equal(compareWeights({...parcel,actual:0}),null);
console.log('PASS weight examples, actual-weight maximum, invalid inputs and bounds');
