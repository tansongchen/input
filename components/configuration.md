# 词库配置公共片段

<!-- #region word-sources -->

基础单字词典为 `snow_pinyin.dict.yaml`。多字词库与雾凇拼音共享收词范围，分为 `snow_pinyin.base`、`snow_pinyin.ext`、`snow_pinyin.tencent`，另有用于个人词汇的 `snow_pinyin.user`。默认一起加载，词典编译后保存在 `build/` 中。

单字读音遵循《通用规范汉字字典》。词语尽可能使用单字已有的读音，不记录弱化产生的轻声和连读变调，例如“知识”用 `zhi1 shi2`，“一个”用 `yi1 ge4`；部分专有名词允许专用读音。

<!-- #endregion word-sources -->

<!-- #region word-import -->

用户文件夹中的 `snow_pinyin.user.dict.yaml` 用于批量加入个人词汇，多个方案共用。正文每行三列，以制表符分隔，依次为词、以空格分隔的完整带调拼音和词频。例如：

```text
冰雪拼音	bing1 xue3 pin1 yin1	100
```

声调用 `1`～`5` 表示，`5` 表示轻声；不要使用连读变调后的读音。多音字要填写这个词所需的读音。保留文件开头的词典头和 `...` 分隔行，加入词条后重新部署。

此文件随方案包提供，覆盖更新前应另存个人词条，更新后再合入。需要长期独立维护时，建立自己的词典文件，例如 `my_words.dict.yaml`：

```yaml
---
name: my_words
version: "1"
sort: by_weight
use_preset_vocabulary: false
...
冰雪拼音	bing1 xue3 pin1 yin1	100
```

<!-- #endregion word-import -->

<!-- #region import-single -->

然后在所用方案的补丁中，保留默认词库并追加自己的词库：

```yaml
patch:
  translator/packs/+:
    - my_words
```

词库文件不放入 `build/`；改动源文件并重新部署，由 Rime 编译。

<!-- #endregion import-single -->

<!-- #region packs-single -->

若希望减少词库体积，可以在所用方案的补丁中覆盖词库列表。例如保留基础词库、扩展词库和个人词库，不加载腾讯词库：

```yaml
patch:
  translator/packs:
    - snow_pinyin.base
    - snow_pinyin.ext
    - snow_pinyin.user
```

裁剪会改变可用词和候选排序，重新部署后生效。

<!-- #endregion packs-single -->

<!-- #region user-dict-single -->

如果练习时希望保持原始词频，可以关闭音节码用户词典：

```yaml
patch:
  translator/enable_user_dict: false
```

重新部署后，不再使用或记录所配置翻译器的个人词频，也不再通过它们自动造词；已有用户词典不会被删除。删除这项补丁并重新部署，即可恢复。

<!-- #endregion user-dict-single -->

<!-- #region import-jianpin -->

然后在所用方案的补丁中，保留默认词库并追加自己的词库；主翻译器和多字词简拼翻译器都需要配置：

```yaml
patch:
  translator/packs/+:
    - my_words
  jianpin/packs/+:
    - my_words
```

词库文件不放入 `build/`；改动源文件并重新部署，由 Rime 编译。

<!-- #endregion import-jianpin -->

<!-- #region packs-jianpin -->

若希望减少词库体积，可以在所用方案的补丁中覆盖词库列表。例如保留基础词库、扩展词库和个人词库，不加载腾讯词库：

```yaml
patch:
  translator/packs:
    - snow_pinyin.base
    - snow_pinyin.ext
    - snow_pinyin.user
  jianpin/packs:
    - snow_pinyin.base
    - snow_pinyin.ext
    - snow_pinyin.user
```

裁剪会改变可用词和候选排序，重新部署后生效。两份列表应保持一致，避免普通编码和多字词简拼能查到的词不同。

<!-- #endregion packs-jianpin -->

<!-- #region user-dict-jianpin -->

如果练习时希望保持原始词频，可以关闭音节码用户词典：

```yaml
patch:
  translator/enable_user_dict: false
  jianpin/enable_user_dict: false
```

重新部署后，不再使用或记录所配置翻译器的个人词频，也不再通过它们自动造词；已有用户词典不会被删除。删除这项补丁并重新部署，即可恢复。主翻译器和多字词简拼翻译器分别控制，因此上例同时关闭两者。

<!-- #endregion user-dict-jianpin -->

<!-- #region candidate-menu -->

可以在本方案的补丁中设置每页候选数，例如：

```yaml
patch:
  menu/page_size: 6
```

选重键和部分数字键承担方案功能，调整每页候选数时应同时检查选重键是否够用；具体选重、翻页和编辑方式见本方案的相关章节。修改后重新部署。

<!-- #endregion candidate-menu -->
