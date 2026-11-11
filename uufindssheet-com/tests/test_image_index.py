import hashlib, html, importlib.util, io, json, os, pathlib, tempfile, time, unittest
from unittest.mock import patch
from types import SimpleNamespace
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('image_index',ROOT/'scripts/build-image-index.py')
builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)

class IndexBuilderTests(unittest.TestCase):
    def test_html_cache_expires_but_image_cache_is_retained(self):
        with tempfile.TemporaryDirectory() as directory:
            cache=pathlib.Path(directory);url='https://example.com/item';key=hashlib.sha256(url.encode()).hexdigest()
            old=time.time()-6*3600-1
            for kind in ['html-2026-11-11','images']:
                p=cache/kind/(key+'.bin');p.parent.mkdir();p.write_bytes(b'old');os.utime(p,(old,old))
            response=SimpleNamespace(status_code=200,headers={'Content-Type':'text/plain'},ok=True,content=b'new')
            with patch.object(builder,'CACHE',cache),patch.object(builder,'session') as session:
                session.return_value.get.return_value=response
                self.assertEqual(builder.fetch(url,'images'),b'old');session.return_value.get.assert_not_called()
                self.assertEqual(builder.fetch(url,'html-2026-11-11'),b'new');self.assertEqual(session.return_value.get.call_count,1)
                self.assertEqual(builder.fetch(url,'html-2026-11-11'),b'new');self.assertEqual(session.return_value.get.call_count,1)
    def test_detail_collects_non_first_photos_and_ignores_related(self):
        source='<section class="product-detail"><h1>Jacket</h1><a href="https://weidian.com/item.html?itemID=7884462272">Original</a>'+''.join(f'<img itemprop="image" src="/media/products/3485/{i}.jpg">' for i in [1,2,3,4,1])+'</section><img itemprop="image" src="/related.jpg">'
        d=builder.parse_detail(source)
        self.assertEqual(d['sourceId'],'7884462272');self.assertEqual(len(d['images']),4)
        self.assertTrue(d['images'][1].endswith('/2.jpg'))
    def test_style_index_binds_real_attribute_to_product(self):
        model={'result':{'default_model':{'item_info':{'item_id':12345},'sku_properties':{'attr_list':[{'attr_values':[{'attr_id':99,'img':'https://si.geilicdn.com/red.jpg'},{'attr_id':100,'img':'https://wrong.example/red.jpg'}]}]}}}}
        source='<script id="__rocker-render-inject__" data-obj=\''+json.dumps(model)+'\'></script>'
        self.assertEqual(builder.parse_options(source,'12345'),[{'image':'https://si.geilicdn.com/red.jpg','styleId':'99'}])
        encoded='<script id="__rocker-render-inject__" data-obj="'+html.escape(json.dumps(model),quote=True)+'"></script>'
        self.assertEqual(builder.parse_options(encoded,'12345'),builder.parse_options(source,'12345'))
        with self.assertRaises(ValueError):builder.parse_options(source,'98765')
    def test_public_options_response_preserves_real_style_identity(self):
        response={'sourceId':'12345','groups':[{'values':[{'id':'99','image':'https://si.geilicdn.com/red.jpg'},{'id':'100','image':'https://wrong.example/red.jpg'}]}]}
        self.assertEqual(builder.parse_options_api(response,'12345'),[{'image':'https://si.geilicdn.com/red.jpg','styleId':'99'}])
        with self.assertRaises(ValueError):builder.parse_options_api(response,'98765')
        with self.assertRaises(ValueError):builder.parse_options_api({'error':'Temporarily unavailable'},'12345')
    def test_area_hash_uses_source_cells(self):
        im=Image.new('RGB',(18,16));im.putdata([(255-(x//2)*20,100,50) for y in range(16) for x in range(18)])
        output=io.BytesIO();im.save(output,format='PNG');d=builder.descriptor(output.getvalue())
        self.assertEqual(d['hash'],'1'*64);self.assertEqual(len(d['cells']),48)
        self.assertEqual(d['cells'][:3],[245,100,50])
    def test_transparency_is_composited_on_white(self):
        im=Image.new('RGBA',(18,16),(0,0,0,0));output=io.BytesIO();im.save(output,format='PNG');d=builder.descriptor(output.getvalue())
        self.assertEqual(d['hash'],'0'*64);self.assertEqual(d['cells'],[255]*48)

if __name__=='__main__':unittest.main()
