import assert from 'node:assert/strict';
import {parseWeidianStyles} from '../worker/weidian-styles.js';
const wrap=model=>'<script id="__rocker-render-inject__" data-obj="'+JSON.stringify({result:{default_model:model}}).replaceAll('&','&amp;').replaceAll('"','&#34;')+'">';
const model={item_info:{item_id:'12345678'},sku_properties:{attr_list:[{attr_title:'Color',attr_values:[{attr_id:1,attr_value:'Black & white',img:'https://si.geilicdn.com/black.jpg'},{attr_id:2,attr_value:'Blue',img:'https://si.geilicdn.com/blue.jpg'},{attr_id:3,attr_value:'Unsafe',img:'javascript:alert(1)'}]},{attr_title:'Size',attr_values:[{attr_id:4,attr_value:'S'},{attr_id:5,attr_value:'M'}]}],sku:{a:{img:'https://si.geilicdn.com/black.jpg'},b:{img:'https://si.geilicdn.com/black.jpg'}}}};
const styles=parseWeidianStyles(wrap(model),'12345678');assert.equal(styles.length,2);assert.equal(styles[0].name,'Black & white');assert.throws(()=>parseWeidianStyles(wrap(model),'99999999'),/identity/);assert.throws(()=>parseWeidianStyles('<html>Busy</html>','12345678'),/unavailable/);
assert.deepEqual(parseWeidianStyles(wrap({item_info:{item_id:'12345678'}}),'12345678'),[]);
console.log('Verified variant grouping, HTML decoding, item identity, unsafe image rejection and missing source handling.');
