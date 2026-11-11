import json
from pathlib import Path
p=Path(__file__).resolve().parent.parent/'src/content/editorial.json'
d=json.loads(p.read_text(encoding='utf-8'))
titles=[
('如何使用 USFans 商品表：下单前的完整检查指南','通过商品分类、图片和原始链接建立候选清单，逐项核对款式、价格和购买条件。'),
('USFans 新手下单指南：从商品链接到仓库验货','梳理商品选择、付款、采购、到仓检查和提交国际包裹的完整流程。'),
('USFans QC 照片怎么看：发货前的检查清单','检查款式、标签、数量和可见瑕疵，了解照片能说明什么，以及何时需要向客服进一步确认。'),
('USFans 运费由哪些费用组成？','区分商品款、国内运费、国际运费预付款和可选服务，避免把商品标价当成到手总价。'),
('USFans 实际重量与体积重：如何看懂计费','了解包装尺寸如何影响计费，并根据所选线路核对最终重量和费用。'),
('USFans 仓储与合箱：如何安排等待和发货','记录各商品的到仓时间、检查进度和仓储期限，合理安排等待、合箱与发货。'),
('USFans 退换货指南：申请前需要确认什么','核对申请期限、商品状态、卖家要求和相关费用，准备清晰证据后再提交售后申请。'),
('USFans 支付失败却已扣款：排查与联系客服指南','先核对交易与订单状态，整理必要记录，避免在原交易未确认时重复付款。'),
('USFans 包裹追踪：出库后如何查看物流','区分订单与包裹状态，读懂物流记录，并准备联系客服所需的信息。'),
('USFans 包装与运输保险：选择前的检查清单','根据商品特点选择包装，并核对保险额度、适用条件与除外责任。')]
for article,(title,description) in zip(d['zh']['articles'],titles):article['title']=title;article['description']=description
# Use the site's Chinese terminology consistently instead of a literal spreadsheet translation.
def polish(o):
    if isinstance(o,dict):return {k:polish(v) for k,v in o.items()}
    if isinstance(o,list):return [polish(v) for v in o]
    if isinstance(o,str):return o.replace('电子表格','商品表').replace('产品证据','商品信息与图片').replace('您的第一份 USFans 订单','您的首次 USFans 订单')
    return o
d['zh']=polish(d['zh'])
p.write_text(json.dumps(d,ensure_ascii=False),encoding='utf-8')
