import test from 'node:test';
import assert from 'node:assert/strict';
import {parseListingStyles, parseAgentLinks} from '../commerce/detail.mjs';

test('Weidian styles keep real color and size combinations and seller prices',()=>{
  const model={
    item_info:{item_id:7506441136,imgs:['https://si.geilicdn.com/product.jpg']},
    sku_properties:{
      attr_list:[{attr_title:'Model',attr_values:[{attr_id:321,attr_value:'Black',img:'https://si.geilicdn.com/black.jpg'}]},
        {attr_title:'Size',attr_values:[{attr_id:654,attr_value:'EU36',img:''}]}],
      sku:{'111111111':{id:111111111,attr_ids:'321-654',price:'169.00',stock:5}}
    }
  };
  const encoded=JSON.stringify({result:{default_model:model}}).replaceAll('"','&quot;');
  const markup='<script id="__rocker-render-inject__" data-obj="'+encoded+'"></script>';
  const result=parseListingStyles(markup,'7506441136');
  assert.equal(result.groups[0].values[0].image,'https://si.geilicdn.com/black.jpg');
  assert.equal(result.groups[1].values[0].image,'');
  assert.deepEqual(result.variants[0].attributes,['321','654']);
  assert.equal(result.variants[0].price,169);
  assert.throws(()=>parseListingStyles(markup,'1111111111'));
});
test('other-agent list includes only source-supplied links carrying the matching product ID',()=>{
  const link=(url,agent)=>'<a href="'+url+'" class="platform-option"><span>'+agent+'</span></a>';
  const markup=link('https://litbuy.com/product/weidian/7506441136','LitBuy')+link('https://example.com/','Homepage')+link('https://example.com/item/1111111111','Wrong')+link('https://www.pikobuy.com/product/detail?id=7506441136','PikoBuy');
  assert.deepEqual(parseAgentLinks(markup,'7506441136'),[{name:'LitBuy',href:'https://litbuy.com/product/weidian/7506441136'}]);
});
