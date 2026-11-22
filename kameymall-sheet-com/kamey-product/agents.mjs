export function purchaseLinks(id, source) {
  const link = encodeURIComponent(source);
  return [
    ['Oopbuy', 'https://oopbuy.com/goods/details?id='+id+'&channel=weidian'],
    ['Kakobuy', 'https://www.kakobuy.com/item/details?url='+link],
    ['HipoBuy', 'https://hipobuy.com/product/weidian/'+id],
    ['USFans', 'https://www.usfans.com/product/3/'+id],
    ['Litbuy', 'https://litbuy.com/product/2/'+id],
    ['Superbuy', 'https://www.superbuy.com/en/page/buy/?url='+link],
    ['LoveGoBuy', 'https://www.lovegobuy.com/product?id='+id+'&shop_type=weidian'],
    ['Sugargoo', 'https://www.sugargoo.com/products?productLink='+link],
    ['RizzitGO', 'https://rizzitgo.com/detail-page?goodsId='+id+'&source=3'],
    ['Joyagoo', 'https://joyagoo.com/product/?id='+id+'&shop_type=weidian'],
    ['OrientDig', 'https://orientdig.com/product/?id='+id+'&shop_type=weidian'],
    ['CNShopper', 'https://cnshopper.com/goods/detail?keyword='+id+'&platform=weidian'],
    ['VigorBuy', 'https://vigorbuy.com/product/2/'+id],
    ['BBDBuy', 'https://link.bbdbuy.com/goods/WEIDIAN/'+id],
    ['CSSBuy', 'https://www.cssbuy.com/shop/goodsDetail?type=micro&id='+id],
    ['EastMallBuy', 'https://www.eastmallbuy.com/web/#/item/index?tp=micro&tid='+id+'&searchlang=en'],
    ['ItaoBuy', 'https://www.itaobuy.com/product-detail?url='+link],
    ['OOTDBuy', 'https://www.ootdbuy.com/goods/details?id='+id+'&channel=weidian'],
    ['FansBuy', 'https://fansbuy.com/item-micro-'+id+'.html'],
    ['GTBuy', 'https://www.gtbuy.com/product/weidian/'+id],
    ['HubBuy', 'https://hubbuy.com/product/2/'+id],
    ['LoongBuy', 'https://loongbuy.com/product-details?url='+link],
    ['PonyBuy', 'https://m.ponybuy.com/pages/products/details?id='+id+'&platform_id=3']
  ];
}
