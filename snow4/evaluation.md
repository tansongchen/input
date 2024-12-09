
# 评测数据

下列技术测试采用的词频为个人统计得到的社交媒体词频（语料来源：[GitHub 仓库](https://github.com/codemayq/chinese-chatbot-corpus)）经 jieba 默认词典分词得到的词频。

## 离散能力

以单音节词最长编码为 4 码（无韵尾音节补 o），统计《通用规范汉字表》中的 8105 字共 8773 字音，得到如下分布：

| 单音节词 | 长度  | 字音数  | 频率     |
| ---- | --- | ---- | ------ |
| 一键   | 1   | 6    | 17.01% |
| 二键   | 2   | 170  | 62.91% |
| 三键   | 3   | 510  | 12.69% |
| 四键   | 4   | 1123 | 5.57%  |
| 页内选重 | 5   | 3524 | 1.74%  |
| 翻页选重 | 6   | 3445 | 0.07%  |
| 总和   |     | 8773 |        |

可见，即使不使用辅助码，单音节词的选重率也不到 2%，翻页率不到 0.1%。一键、两键占比 80%，前三键占比 92%。

以多音节词最长编码为 6 码，统计雾凇拼音词库中的词频前六万词，得到如下分布：

| 多音节词 | 长度  | 词音数   | 频率     |
| ---- | --- | ----- | ------ |
| 三键   | 3   | 2640  | 58.25% |
| 四键   | 4   | 23758 | 26.18% |
| 五键   | 5   | 17167 | 11.40% |
| 六键   | 6   | 12329 | 3.63%  |
| 页内选重 | 7   | 4092  | 0.54%  |
| 翻页选重 | 8   | 14    | 0.00%  |
| 总和   |     | 60000 |        |

## 手感

单音节词当量为 1.286，多音节词当量为 1.333，总当量为 1.318。用指分布如图所示。除 a 键使用频率较高外，其余均较为合理。

![](https://images.tansongchen.com/1716519097.png)