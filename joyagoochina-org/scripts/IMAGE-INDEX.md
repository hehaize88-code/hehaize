# 全站图片索引维护

`build-all-image-index.py` 从 `cnbuycha.com` 当前商品目录读取图库，并通过本站 `https://joyagoochina.org/api/product-options` 收集款式图和卖家图。它使用本项目的 `.cache/all-image-index`，不依赖其他项目、数据库、密钥或外部任务目录。

## 安装和运行

需要 Python 3.10 或以上版本。验证环境为 Python 3.12、httpx 0.28.1、Pillow 13.0.0。

```sh
python -m pip install -r scripts/image-index-requirements.txt
python scripts/build-all-image-index.py --refresh
python scripts/test-build-all-image-index.py
```

已有 `public/catalog-image-index.json` 会自动作为种子。脚本逐片验证 SHA-256 和记录数后复用 `area-v2` 特征，不重新下载已建立特征的图片。未变化的不可变分片保持原 URL；新增和变化的记录按最多 1,000 条一片输出。历史分片保留，避免正在搜索的访客读取旧 manifest 时遇到 404。

`--refresh` 更新商品和选项元数据，仍保留图片特征缓存。新增商品会从当前分页目录发现。普通重跑可复用六小时内的公开元数据缓存。首次全量构建可能较久，后续只处理新增图片；中断后直接重跑即可。

如需要明确指定已有索引或输出位置：

```sh
python scripts/build-all-image-index.py --seed-index public/catalog-image-index.json --output public
```

`--reuse-gallery-snapshot` 仅在种子索引日期为当天时启用，可复用已采集的图库；仍会检查当前目录并处理新商品。`--offline` 仅使用缓存，适合验证或离线恢复。`--limit N` 仅用于抽样，必须同时指定不同于正式 `public` 的 `--output` 目录。

## 限流和覆盖情况

默认元数据、图片各四个工作线程，每个主机最多四个请求/秒。所有线程共享主机冷却时间；429 和带 Retry-After 的临时服务错误按响应等待。单个商品选项 API 的 503 只记该商品暂不可用；401、403 或验证页面会停止请求对应主机。脚本保留配置好的代理路径，不切换网络绕过限制。

输出包括：

- `public/catalog-image-index.json`：商品、图库、款式图、卖家图、唯一图片和失败数量。
- `public/catalog-image-index/*.json`：含 SHA-256 的不可变分片。
- `.cache/all-image-index/failures.json`：失败的页面、图片、具体原因及保留旧数据的商品。
- `.cache/all-image-index/catalogue.json`、`details.json`、`candidates.json`：本次目录、商品来源和完整候选图片记录。

源页面暂时不可用时，会保留已有、已验证的图库和款式记录，并在 `staleSourcePageCount` 和失败报告中标明。`unattemptedStylePageCount`、`unattemptedProductCount` 和 `unindexedImageRecordCount` 不会把尚未处理或未成功的内容算作已覆盖。

回归测试完全离线，覆盖图库副图、款式图、卖家图、新商品增量、旧分片保持、来源身份校验、透明图特征、源接口失败后的已有数据保留，以及 Retry-After 等待。
