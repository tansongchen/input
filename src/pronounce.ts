import { addDict, customPinyin, pinyin, convert } from "pinyin-pro";
import CompleteDict from "@pinyin-pro/data/complete.json";

const diff2 = {
  这个: "zhè gè",
  部分: "bù fèn",
  任务: "rèn wù",
  那个: "nà gè",
  皇上: "huáng shàng",
  认识: "rèn shí",
  师父: "shī fù",
  知识: "zhī shí",
  行当: "háng dàng",
  道行: "dào héng",
  胖子: "pàng zǐ",
  答应: "dā yìng",
  太监: "tài jiàn",
  休息: "xiū xī",
  合同: "hé tóng",
  头发: "tóu fà",
  要是: "yào shì",
  路上: "lù shàng",
  大夫: "dài fū",
  便宜: "pián yí",
  石头: "shí tóu",
  漂亮: "piào liàng",
  弟兄: "dì xiōng",
  丫头: "yā tóu",
  弟弟: "dì dì",
  王爷: "wáng yé",
  家伙: "jiā huǒ",
  椅子: "yǐ zǐ",
  念头: "niàn tóu",
  寻思: "xún sī",
  亲戚: "qīn qī",
  胳膊: "gē bó",
  咳嗽: "ké sòu",
  叶子: "yè zǐ",
  模糊: "mó hú",
  称呼: "chēng hū",
  委屈: "wěi qū",
  伯伯: "bó bó",
  圈子: "quān zǐ",
  见识: "jiàn shí",
  都督: "dū dū",
  相公: "xiàng gōng",
  打量: "dǎ liáng",
  舌头: "shé tóu",
  行李: "xíng lǐ",
  孙子: "sūn zǐ",
  拳头: "quán tóu",
  骨头: "gǔ tóu",
  馒头: "mán tóu",
  头儿: "tóu ér",
  折腾: "zhē téng",
  木头: "mù tóu",
  动弹: "dòng tán",
  少爷: "shào yé",
  尾巴: "wěi bā",
  哑巴: "yǎ bā",
  车子: "chē zǐ",
  担子: "dàn zǐ",
  女婿: "nǚ xù",
  被子: "bèi zǐ",
  吆喝: "yāo hè",
  里头: "lǐ tóu",
  伺候: "cì hòu",
  枕头: "zhěn tóu",
  外头: "wài tóu",
  结实: "jiē shí",
  王八: "wáng bā",
  句子: "jù zǐ",
  扎实: "zhā shí",
  指头: "zhǐ tóu",
  畜生: "chù shēng",
  棍子: "gùn zǐ",
  含糊: "hán hū",
  扇子: "shàn zǐ",
  喇叭: "lǎ bā",
  燕子: "yàn zǐ",
  个子: "gè zǐ",
  会儿: "huì ér",
  作坊: "zuō fáng",
  风筝: "fēng zhēng",
  屯子: "tún zǐ",
  罪过: "zuì guò",
  曲子: "qǔ zǐ",
  应酬: "yìng chóu",
  前头: "qián tóu",
  杆子: "gān zǐ",
  后头: "hòu tóu",
  约莫: "yuē mò",
  帖子: "tiě zǐ",
  吓唬: "xià hǔ",
  沙子: "shā zǐ",
  别扭: "biè nǐu",
  思量: "sī liáng",
  盖子: "gài zǐ",
  条子: "tiáo zǐ",
  姥姥: "lǎo lǎo",
  迷糊: "mí hū",
  蛤蟆: "há má",
  钉子: "dīng zǐ",
  巴结: "bā jié",
  扫帚: "sào zhǒu",
  头子: "tóu zǐ",
  裁缝: "cái féng",
  倒腾: "dǎo téng",
  嚷嚷: "rāng rāng",
  柜子: "guì zǐ",
  膏药: "gāo yào",
  估量: "gū liáng",
  相声: "xiàng shēng",
  片子: "piān zǐ",
  尺子: "chǐ zǐ",
  斗篷: "dǒu péng",
  铺子: "pù zǐ",
  底子: "dǐ zǐ",
  锄头: "chú tóu",
  疟疾: "nüè jí",
  唠叨: "láo dāo",
  妃子: "fēi zǐ",
  卷子: "juàn zǐ",
  巷子: "xiàng zǐ",
  风头: "fēng tóu",
  格子: "gé zǐ",
  调子: "diào zǐ",
  转悠: "zhuàn yōu",
  爪子: "zhuǎ zǐ",
  单子: "dān zǐ",
  用处: "yòng chù",
  窝囊: "wō náng",
  知会: "zhī huì",
  日头: "rì tóu",
  化子: "huà zǐ",
  栅栏: "zhà lán",
  场子: "chǎng zǐ",
  兴头: "xìng tóu",
  约摸: "yuē mō",
  空儿: "kòng ér",
  估摸: "gū mō",
  厂子: "chǎng zǐ",
  跟头: "gēn tóu",
  累赘: "léi zhuì",
  哈欠: "hā qiàn",
  空子: "kòng zǐ",
  刷子: "shuā zǐ",
  塞子: "sāi zǐ",
  兆头: "zhào tóu",
  啊哈: "ā hā",
  准头: "zhǔn tóu",
  佛爷: "fó yé",
  薄荷: "bò hé",
  来头: "lái tóu",
  冒失: "mào shī",
  眯缝: "mī fèng",
  号子: "hào zǐ",
  拾掇: "shí duō",
  簸箕: "bò jī",
  磨蹭: "mó cèng",
  蚂蚱: "mà zhà",
  撮合: "cuō hé",
  趔趄: "liè qiè",
  台子: "tái zǐ",
  行头: "xíng tóu",
  炮仗: "pào zhàng",
  凉快: "liáng kuài",
  溜达: "liū dá",
  苗头: "miáo tóu",
  勾搭: "gōu dā",
  份子: "fèn zǐ",
  结巴: "jiē bā",
  杠子: "gàng zǐ",
  夹子: "jiā zǐ",
  铃铛: "líng dāng",
  糊糊: "hū hū",
  浪头: "làng tóu",
  模子: "mú zǐ",
  芋头: "yù tóu",
  跳蚤: "tiào zǎo",
  挑子: "tiāo zǐ",
  盖头: "gài tóu",
  答理: "dā lǐ",
  晃荡: "huàng dàng",
  臊子: "sào zǐ",
  度数: "dù shù",
  姘头: "pīn tóu",
  浆糊: "jiàng hù",
  看头: "kàn tóu",
  盼头: "pàn tóu",
  弥撒: "mí sā",
  里子: "lǐ zǐ",
  调调: "diào diào",
  捻子: "niǎn zǐ",
  骨碌: "gū lù",
  碌碡: "liù zhóu",
  片儿: "piàn ér",
  叉子: "chā zǐ",
  蛾子: "é zǐ",
  簿子: "bù zǐ",
  奔头: "bèn tóu",
  乐子: "lè zǐ",
  乜斜: "miē xié",
  划拉: "huá lā",
  絮叨: "xù dāo",
  扎挣: "zhá zhēng",
  垛子: "duò zǐ",
  糨糊: "jiàng hù",
  芫荽: "yán suī",
  芥末: "jiè mò",
  酌量: "zhuó liàng",
  榔头: "láng tóu",
  赚头: "zhuàn tóu",
  想头: "xiǎng tóu",
  宽绰: "kuān chuò",
  核儿: "hú ér",
  缝子: "fèng zǐ",
  骨子: "gǔ zǐ",
  叨咕: "dáo gū",
  笼子: "lóng zǐ",
  爷爷: "yé yé",
  奶奶: "nǎi nǎi",
  姥爷: "lǎo yé",
  爸爸: "bà bà",
  妈妈: "mā mā",
  婶婶: "shěn shěn",
  舅舅: "jiù jìu",
  姑姑: "gū gū",
  叔叔: "shū shū",
  姨夫: "yí fū",
  舅母: "jiù mǔ",
  姑父: "gū fù",
  姐夫: "jiě fū",
  婆婆: "pó pó",
  公公: "gōng gōng",
  舅子: "jiù zǐ",
  姐姐: "jiě jiě",
  哥哥: "gē gē",
  妹妹: "mèi mèi",
  妹夫: "mèi fū",
  姨子: "yí zǐ",
  宝宝: "bǎo bǎo",
  娃娃: "wá wá",
  孩子: "hái zǐ",
  日子: "rì zǐ",
  样子: "yàng zǐ",
  狮子: "shī zǐ",
  身子: "shēn zǐ",
  架子: "jià zǐ",
  嫂子: "sǎo zǐ",
  鼻子: "bí zǐ",
  亭子: "tíng zǐ",
  折子: "zhé zǐ",
  面子: "miàn zǐ",
  脖子: "bó zǐ",
  辈子: "bèi zǐ",
  帽子: "mào zǐ",
  拍子: "pāi zǐ",
  柱子: "zhù zǐ",
  辫子: "biàn zǐ",
  鸽子: "gē zǐ",
  房子: "fáng zǐ",
  丸子: "wán zǐ",
  摊子: "tān zǐ",
  牌子: "pái zǐ",
  胡子: "hú zǐ",
  鬼子: "guǐ zǐ",
  矮子: "ǎi zǐ",
  鸭子: "yā zǐ",
  小子: "xiǎo zǐ",
  影子: "yǐng zǐ",
  屋子: "wū zǐ",
  对子: "duì zǐ",
  点子: "diǎn zǐ",
  本子: "běn zǐ",
  种子: "zhǒng zǐ",
  儿子: "ér zǐ",
  兔子: "tù zǐ",
  骗子: "piàn zǐ",
  院子: "yuàn zǐ",
  猴子: "hóu zǐ",
  嗓子: "sǎng zǐ",
  侄子: "zhí zǐ",
  柿子: "shì zǐ",
  钳子: "qián zǐ",
  虱子: "shī zǐ",
  瓶子: "píng zǐ",
  豹子: "bào zǐ",
  筷子: "kuài zǐ",
  篮子: "lán zǐ",
  绳子: "shéng zǐ",
  嘴巴: "zuǐ bā",
  耳朵: "ěr duǒ",
  茄子: "qié zǐ",
  琵琶: "pí pá",
  蘑菇: "mó gū",
  葫芦: "hú lú",
  狐狸: "hú lí",
  桔子: "jú zǐ",
  盒子: "hé zǐ",
  桌子: "zhuō zǐ",
  竹子: "zhú zǐ",
  师傅: "shī fù",
  衣服: "yī fú",
  袜子: "wà zǐ",
  杯子: "bēi zǐ",
  刺猬: "cì wèi",
  麦子: "mài zǐ",
  队伍: "duì wǔ",
  鱼儿: "yú ér",
  馄饨: "hún tún",
  灯笼: "dēng lóng",
  庄稼: "zhuāng jià",
  聪明: "cōng míng",
  镜子: "jìng zǐ",
  银子: "yín zǐ",
  盘子: "pán zǐ",
  力气: "lì qì",
  席子: "xí zǐ",
  林子: "lín zǐ",
  丈夫: "zhàng fū",
  豆腐: "dòu fǔ",
  喜欢: "xǐ huān",
  生意: "shēng yì",
  眉毛: "méi máo",
  混混: "hùn hùn",
  财主: "cái zhǔ",
  厚道: "hòu dào",
  里脊: "lǐ jǐ",
  格格: "gé gé",
  闺女: "guī nǚ",
  磨叽: "mó jī",
  杠杠: "gàng gàng",
  框框: "kuàng kuàng",
  精神: "jīng shén",
  揉搓: "róu cuō",
  垃圾: "lā jī",
  慢慢: "màn màn",
};
const diff3 = {
  实际上: "shí jì shàng",
  这会儿: "zhè huì ér",
  不在乎: "bú zài hū",
  有点儿: "yǒu diǎn ér",
  发脾气: "fā pí qì",
  压根儿: "yà gēn ér",
  那会儿: "nà huì ér",
  自个儿: "zì gě ér",
  少奶奶: "shào nǎi nǎi",
  山里红: "shān lǐ hóng",
  好好儿: "hǎo hāo ér",
  好意思: "hǎo yì sī",
  没意思: "méi yì sī",
  戏班子: "xì bān zǐ",
  外甥女: "wài shēng nǚ",
  劳什子: "láo shí zǐ",
  知识面: "zhī shí miàn",
  护士长: "hù shì zhǎng",
  枪杆子: "qiāng gǎn zǐ",
  癞蛤蟆: "lài há má",
  脊梁骨: "jǐ liáng gǔ",
  说笑话: "shuō xiào huà",
  玻璃钢: "bō lí gāng",
  软骨头: "ruǎn gǔ tóu",
  打哆嗦: "dǎ duō suō",
  夜猫子: "yè māo zǐ",
  气头上: "qì tóu shàng",
  糊涂虫: "hú tú chóng",
  笔杆子: "bǐ gǎn zǐ",
  占便宜: "zhàn pián yí",
  挨个儿: "āi gè ér",
  那阵儿: "nà zhèn ér",
  大师傅: "dà shī fù",
  打呼噜: "dǎ hū lū",
  广渠门: "guǎng qú mén",
  大婶儿: "dà shěn ér",
  脚丫子: "jiǎo yā zǐ",
  窝里斗: "wō lǐ dòu",
  个头儿: "gè tóu ér",
  糊涂账: "hú tú zhàng",
  大猩猩: "dà xīng xīng",
  闷葫芦: "mèn hú lú",
  哈巴狗: "hǎ bā gǒu",
  石子儿: "shí zǐ ér",
  丁点儿: "dīng diǎn ér",
  傻劲儿: "shǎ jìn ér",
  铅玻璃: "qiān bō lí",
  屎壳郎: "shǐ ké làng",
  尥蹶子: "liào juě zǐ",
  卡脖子: "qiǎ bó zǐ",
  红澄澄: "hóng dèng dèng",
  当间儿: "dāng jiàn ér",
  担担面: "dàn dàn miàn",
  爪尖儿: "zhuǎ jiān ér",
  支着儿: "zhī zhāo ér",
  折跟头: "zhē gēn tóu",
  阴着儿: "yīn zhāo ér",
  烟卷儿: "yān juǎn ér",
  信皮儿: "xìn pí ér",
  水漂儿: "shuǐ piāo ér",
  什件儿: "shí jiàn ér",
  撒呓挣: "sā yì zhèng",
  努劲儿: "nǔ jìn ér",
  泥娃娃: "ní wá wá",
  哪会儿: "nǎ huì ér",
  闷头儿: "mēn tóu ér",
  没谱儿: "méi pǔ ér",
  铆劲儿: "mǎo jìn ér",
  坤角儿: "kūn jué ér",
  汗褂儿: "hàn guà ér",
  够劲儿: "gòu jìn ér",
  嘎渣儿: "gā zhā ér",
  逗闷子: "dòu mèn zǐ",
  滴溜儿: "dī liù ér",
  大轴子: "dà zhòu zǐ",
  打板子: "dǎ bǎn zǐ",
  寸劲儿: "cùn jìn ér",
  醋劲儿: "cù jìn ér",
  揣手儿: "chuāi shǒu ér",
  冲劲儿: "chòng jìn ér",
  奔头儿: "bèn tóu ér",
  娃娃亲: "wá wá qīn",
  死劲儿: "sǐ jìn ér",
  骨朵儿: "gū duǒ ér",
};
const diff4 = {
  迷迷糊糊: "mí mí hū hū",
  不可收拾: "bù kě shōu shí",
  模模糊糊: "mó mó hū hū",
  如之奈何: "rú zhī nài hé",
  踏踏实实: "tā tā shí shí",
  顶头上司: "dǐng tóu shàng sī",
  含含糊糊: "hán hán hū hū",
  玻璃纤维: "bō lí xiān wéi",
  吵吵闹闹: "chāo chāo nào nào",
  唠唠叨叨: "láo láo dāo dāo",
  叽叽喳喳: "jī jī zhā zhā",
  稀里糊涂: "xī lǐ hú tú",
  大大咧咧: "dà dà liē liē",
  粗心大意: "cū xīn dà yì",
  好好先生: "hǎo hǎo xiān shēng",
  骂骂咧咧: "mà mà liē liē",
  河北梆子: "hé běi bāng zǐ",
  正儿八经: "zhèng ér bā jīng",
  不识抬举: "bù shí tái jǔ",
  服服帖帖: "fú fú tiē tiē",
  噼里啪啦: "pī lǐ pā lā",
  稀里哗啦: "xī lǐ huā lā",
  负债累累: "fù zhài lěi lěi",
  没头苍蝇: "méi tóu cāng yíng",
  失而复得: "shī ér fù dé",
  鼓鼓囊囊: "gǔ gǔ nāng nāng",
  有机玻璃: "yǒu jī bō lí",
  骨头架子: "gǔ tóu jià zǐ",
  一丁点儿: "yī dīng diǎn ér",
  吊儿郎当: "diào ér láng dāng",
  河南梆子: "hé nán bāng zǐ",
  漂漂亮亮: "piào piào liàng liàng",
  小家子气: "xiǎo jiā zǐ qì",
  钢化玻璃: "gāng huà bō lí",
  狐狸尾巴: "hú lí wěi bā",
  打马虎眼: "dǎ mǎ hǔ yǎn",
  疙疙瘩瘩: "gē gē dā dā",
  这么点儿: "zhè me diǎn ér",
  绣花枕头: "xiù huā zhěn tóu",
  大人先生: "dà rén xiān shēng",
  多劳多得: "duō láo duō dé",
  曲里拐弯: "qū lǐ guǎi wān",
  哩哩啦啦: "lī lī lā lā",
  夹层玻璃: "jiā céng bō lí",
  攒眉蹙额: "cuán méi cù é",
  与时消息: "yǔ shí xiāo xī",
  香培玉琢: "xiāng péi yù zhuó",
  握粟出卜: "wò sù chū bǔ",
  天宝当年: "tiān bǎo dāng nián",
  数理逻辑: "shù lǐ luó jí",
  石英玻璃: "shí yīng bō lí",
  沙鸥翔集: "shā ōu xiáng jí",
  权倾中外: "quán qīng zhōng wài",
  内修外攘: "nèi xiū wài rǎng",
  内柔外刚: "nèi róu wài gāng",
  内峻外和: "nèi jùn wài hé",
  龙游曲沼: "lóng yóu qū zhǎo",
  牢什古子: "láo shí gǔ zǐ",
  经纶济世: "jīng lún jì shì",
  花不棱登: "huā bù lēng dēng",
  红不棱登: "hóng bù lēng dēng",
  广文先生: "guǎng wén xiān shēng",
  恩不放债: "ēn bú fàng zhài",
  东方将白: "dōng fāng jiāng bái",
  打闷葫芦: "dǎ mèn hú lú",
  谄上抑下: "chǎn shàng yì xià",
  不亦善夫: "bù yì shàn fū",
  叶落归根: "yè luò guī gēn",
  枝大于本: "zhī dà yú běn",
  还珠格格: "huán zhū gé gé",
};
const diff5 = {
  行行出状元: "háng háng chū zhuàng yuán",
  竹筒倒豆子: "zhú tǒng dào dòu zǐ",
};
const completeDiff = `
一个舒服	yī gè shū fú
一大部分	yī dà bù fèn
一小部分	yī xiǎo bù fèn
一少部分	yī shǎo bù fèn
一路上	yī lù shàng
一部分	yī bù fèn
一部分一	yī bù fèn yī
一部分一部分	yī bù fèn yī bù fèn
一部分分	yī bù fèn fēn
一部分千户	yī bù fèn qiān hù
一部分台	yī bù fèn tái
一部分周	yī bù fèn zhōu
一部分回	yī bù fèn huí
一部分班	yī bù fèn bān
一部分瓦	yī bù fèn wǎ
一部分第	yī bù fèn dì
上上个月	shàng shàng gè yuè
上个	shàng gè
上个世纪	shàng gè shì jì
上个季度	shàng gè jì dù
上个星期	shàng gè xīng qī
上个月	shàng gè yuè
上岁数	shàng suì shù
下下个月	xià xià gè yuè
下个世纪	xià gè shì jì
下个季度	xià gè jì dù
下个星期	xià gè xīng qī
下个月	xià gè yuè
不可估量	bù kě gū liáng
不含糊	bù hán hū
不哼不哈	bù hēng bù hā
不怕困难	bù pà kùn nán
不断耷拉	bù duàn dā lā
专项合同	zhuān xiàng hé tóng
东萨哈	dōng sà hā
严重困难	yán zhòng kùn nán
主合同	zhǔ hé tóng
丽丽	lì lì
乌拉草	wū lā cǎo
乐亭	lào tíng
乐亭县	lào tíng xiàn
乐陵	lào líng
乐陵县	lào líng xiàn
乐陵市	lào líng shì
书写困难	shū xiě kùn nán
买卖合同	mǎi mài hé tóng
亚哈	yà hā
些个	xiē gè
产销合同	chǎn xiāo hé tóng
京哈	jīng hā
亲口答应	qīn kǒu dā yìng
从乐亭	cóng lào tíng
伊克哈	yī kè hā
伊斯哈	yī sī hā
伊蒂哈	yī dì hā
众街坊	zhòng jiē fāng
估量	gū liáng
作坊	zuō fáng
作坊式	zuō fáng shì
佩里哈	pèi lǐ hā
侍太监	shì tài jiàn
供销合同	gōng xiāo hé tóng
依样画葫芦	yī yàng huà hú lú
依样葫芦	yī yàng hú lú
依葫芦画瓢	yī hú lú huà piáo
保险合同	bǎo xiǎn hé tóng
信守合同	xìn shǒu hé tóng
假合同	jiǎ hé tóng
停当	tíng dàng
克服困难	kè fú kùn nán
其余部分	qí yú bù fèn
内廷太监	nèi tíng tài jiàn
冒泡泡	mào pào pào
冯太监	féng tài jiàn
冰糖葫芦	bīng táng hú lú
出个价	chū gè jià
分割部分	fēn gē bù fèn
切瑳琢磨	qiè cuō zuó mó
划拉	huá lā
刘太监	liú tài jiàn
制哪个呢	zhì nǎ gè ne
剃头发	tì tóu fà
剪头发	jiǎn tóu fà
努尔哈	nǔ ěr hā
劳动合同	láo dòng hé tóng
劳动合同制	láo dòng hé tóng zhì
劳太监	láo tài jiàn
十分困难	shí fēn kùn nán
十来个	shí lái gè
半拉	bàn lǎ
半拉子	bàn lǎ zǐ
半路上	bàn lù shàng
卓阿哈	zhuó ā hā
南京路上好八连	nán jīng lù shàng hǎo bā lián
博尔哈	bó ěr hā
卡哈	kǎ hā
卢太监	lú tài jiàn
印模糊剂	yìn mó hū jì
去模糊	qù mó hū
反覆思量	fǎn fù sī liáng
叨叨	dāo dāo
叨唠	dāo láo
叫个不停	jiào gè bù tíng
司天太监	sī tiān tài jiàn
司礼太监	sī lǐ tài jiàn
吆喝	yāo hè
吆喝声	yāo hè shēng
合同	hé tóng
合同书	hé tóng shū
合同价	hé tóng jià
合同制	hé tóng zhì
合同商	hé tóng shāng
合同工	hé tóng gōng
合同文书	hé tóng wén shū
合同文本	hé tóng wén běn
合同期	hé tóng qī
合同条款	hé tóng tiáo kuǎn
合同法	hé tóng fǎ
合同纠纷	hé tóng jiū fēn
合同范本	hé tóng fàn běn
合同规定	hé tóng guī dìng
合同诈骗	hé tóng zhà piàn
合同额	hé tóng é
吐哈	tǔ hā
吞咽困难	tūn yàn kùn nán
含糊	hán hū
含糊不明	hán hū bù míng
含糊不清	hán hū bù qīng
含糊其词	hán hū qí cí
含糊其辞	hán hū qí cí
含糊地	hán hū de
吵吵	chāo chāo
吹头发	chuī tóu fà
吹泡泡	chuī pào pào
呵呵哈	hē hē hā
呼吸困难	hū xī kùn nán
和丽丽	hé lì lì
哈勒哈	hā lè hā
哈哈	hā hā
哈尔哈	hā ěr hā
哪个	nǎ gè
哭丧着脸	kū sàng zhe liǎn
唠叨	láo dāo
商量	shāng liáng
商量余地	shāng liáng yú dì
商量对策	shāng liáng duì cè
商量研究	shāng liáng yán jiū
啊哈	ā hā
嗳呀	āi yā
嗳声叹气	āi shēng tàn qì
嚏喷	tì pēn
嚷嚷	rāng rāng
回家路上	huí jiā lù shàng
困难	kùn nán
困难严重	kùn nán yán zhòng
困难性	kùn nán xìng
困难户	kùn nán hù
困难生	kùn nán shēng
困难群众	kùn nán qún zhòng
困难者	kùn nán zhě
困难职工	kùn nán zhí gōng
困难重重	kùn nán chóng chóng
圪节	gē jié
坂崎琢磨	bǎn qí zuó mó
埃尔哈	āi ěr hā
塔哈	tǎ hā
大声嚷嚷	dà shēng rāng rāng
大大咧咧	dà dà liē liē
大大落落	dà dà luò luò
大用处	dà yòng chù
大街坊	dà jiē fāng
大部分	dà bù fèn
大部分具	dà bù fèn jù
大部分处	dà bù fèn chù
大部分种	dà bù fèn zhǒng
太监	tài jiàn
太监急	tài jiàn jí
头发	tóu fà
头发丝	tóu fà sī
头发屑	tóu fà xiè
头发菜	tóu fà cài
奥庆哈	ào qìng hā
好些个	hǎo xiē gè
好你个	hǎo nǐ gè
好好儿	hǎo hǎo ér
委托合同	wěi tuō hé tóng
嫩葫芦	nèn hú lú
子太监	zǐ tài jiàn
孙丽丽	sūn lì lì
孙麻哈	sūn má hā
实际上	shí jì shàng
实际困难	shí jì kùn nán
宫太监	gōng tài jiàn
宫都太监	gōng dōu tài jiàn
宫里太监	gōng lǐ tài jiàn
小作坊	xiǎo zuō fáng
小太监	xiǎo tài jiàn
小迷糊	xiǎo mí hū
少部分	shǎo bù fèn
尼思哈	ní sī hā
履行合同	lǚ xíng hé tóng
岁数	suì shù
巴结	bā jié
布特哈	bù tè hā
师徒合同	shī tú hé tóng
帕尔哈	pà ěr hā
常太监	cháng tài jiàn
干太监	gān tài jiàn
度数	dù shù
开了个	kāi le gè
张太监	zhāng tài jiàn
弥撒	mí sā
弥撒曲	mí sā qǔ
当个	dāng gè
德令哈	dé lìng hā
快当	kuài dāng
念叨	niàn dāo
思量	sī liáng
想了个	xiǎng le gè
意味著	yì wèi zhe
扎挣	zhá zhēng
打了个	dǎ le gè
打哈	dǎ hā
打灯笼	dǎ dēng lóng
打着灯笼	dǎ zhe dēng lóng
打转转	dǎ zhuàn zhuàn
打量	dǎ liáng
打量出	dǎ liáng chū
打闷葫芦	dǎ mèn hú lú
承值太监	chéng zhí tài jiàn
承包合同	chéng bāo hé tóng
承奉太监	chéng fèng tài jiàn
担担面	dàn dàn miàn
拉哈	lā hā
挺舒服	tǐng shū fú
捡了个	jiǎn le gè
换衣服	huàn yī fú
掂量	diān liáng
掂量掂量	diān liáng diān liáng
掉头发	diào tóu fà
掌事太监	zhǎng shì tài jiàn
掩口葫芦	yǎn kǒu hú lú
搞了个	gǎo le gè
搭拉	dā lā
搭街坊	dā jiē fāng
撒呓挣	sā yì zhēng
撕毁合同	sī huǐ hé tóng
支棱	zhī léng
数叨	shǔ dāo
新嫩葫芦	xīn nèn hú lú
於	wū
无法估量	wú fǎ gū liáng
旧衣服	jiù yī fú
晒衣服	shài yī fú
晕糊糊	yūn hú hú
晾衣服	liàng yī fú
曹太监	cáo tài jiàn
最舒服	zuì shū fú
望弥撒	wàng mí sā
本合同	běn hé tóng
朱衣太监	zhū yī tài jiàn
李丽丽	lǐ lì lì
杜丽丽	dù lì lì
条贯部分	tiáo guàn bù fèn
杨太监	yáng tài jiàn
极端困难	jí duān kùn nán
格利哈	gé lì hā
格布哈	gé bù hā
梁太监	liáng tài jiàn
梦作坊	mèng zuō fáng
梭哈	suō hā
梳头发	shū tóu fà
槽坊	cáo fāng
模糊	mó hū
模糊不清	mó hū bù qīng
模糊化	mó hū huà
模糊地	mó hū de
模糊声	mó hū shēng
模糊学	mó hū xué
模糊性	mó hū xìng
模糊控制	mó hū kòng zhì
模糊推理	mó hū tuī lǐ
模糊数学	mó hū shù xué
模糊认识	mó hū rèn shí
模糊论	mó hū lùn
模糊起来	mó hū qǐ lái
模糊集	mó hū jí
模糊音	mó hū yīn
正琢磨	zhèng zuó mó
比量	bǐ liáng
比量齐观	bǐ liáng qí guān
毫不含糊	háo bù hán hū
毫无用处	háo wú yòng chù
气头上	qì tóu shàng
水晶灯笼	shuǐ jīng dēng lóng
水葫芦	shuǐ hú lú
没商量	méi shāng liáng
油葫芦	yóu hú lú
沿路上	yán lù shàng
法律合同	fǎ lǜ hé tóng
泡泡	pào pào
泡泡吧	pào pào bā
泡泡堂	pào pào táng
泡泡浴	pào pào yù
泡泡糖	pào pào táng
泡泡纱	pào pào shā
泡泡网	pào pào wǎng
泡泡鱼	pào pào yú
泡泡龙	pào pào lóng
洗头发	xǐ tóu fà
洗衣服	xǐ yī fú
浆糊	jiàng hú
浆衣服	jiāng yī fú
添置衣服	tiān zhì yī fú
漂亮衣服	piào liàng yī fú
灯笼	dēng lóng
灯笼椒	dēng lóng jiāo
灯笼花	dēng lóng huā
灯笼裤	dēng lóng kù
灰糊糊	huī hú hú
烂糊	làn hú
烫头发	tàng tóu fà
焦糊糊	jiāo hú hú
照葫芦画瓢	zhào hú lú huà piáo
爱克哈	ài kè hā
牙哈	yá hā
牛轧糖	niú gá táng
猪蹄膀	zhū tí páng
王丽丽	wáng lì lì
王太监	wáng tài jiàn
班大太监	bān dà tài jiàn
理头发	lǐ tóu fà
琢磨	zuó mó
琢磨不透	zuó mó bù tòu
用处	yòng chù
电动葫芦	diàn dòng hú lú
留头发	liú tóu fà
疙疙瘩瘩	gē gē da da
疙里疙瘩	gē lǐ gē da
白头发	bái tóu fà
白糊糊	bái hú hú
皇上	huáng shàng
盖丽丽	gài lì lì
直嚷嚷	zhí rāng rāng
眯缝	mī fèng
瞎琢磨	xiā zuó mó
研究商量	yán jiū shāng liáng
砥砺琢磨	dǐ lì zuó mó
确守合同	què shǒu hé tóng
碰到困难	pèng dào kùn nán
磨叨	mò dāo
私自答应	sī zì dā yìng
稠糊	chóu hú
稳当	wěn dāng
稳当性	wěn dāng xìng
穆哈	mù hā
穿衣服	chuān yī fú
窝囊	wō náng
窝囊废	wō náng fèi
窝囊气	wō náng qì
窝里窝囊	wō lǐ wō náng
童跟著	tóng gēn zhe
第十一部分	dì shí yī bù fèn
等分部分	děng fēn bù fèn
答不答应	dá bù dā yìng
答应	dā yìng
答应下来	dā yìng xià lái
签合同	qiān hé tóng
签订合同	qiān dìng hé tóng
米哈	mǐ hā
米德哈	mǐ dé hā
糊糊	hú hú
糖葫芦	táng hú lú
糨糊	jiàng hú
紧接著	jǐn jiē zhe
絮叨	xù dāo
红头发	hóng tóu fà
红灯笼	hóng dēng lóng
红衣服	hóng yī fú
纳哈	nà hā
组成部分	zǔ chéng bù fèn
细部分解	xì bù fèn jiě
经济合同	jīng jì hé tóng
给你个	gěi nǐ gè
绝大部分	jué dà bù fèn
缝衣服	féng yī fú
网易泡泡	wǎng yì pào pào
网路上	wǎng lù shàng
罪过	zuì guò
翘棱	qiáo léng
老街坊	lǎo jiē fāng
耷拉	dā lā
耽搁	dān gē
耽搁到	dān gē dào
胳肢窝	gā zhī wō
脱勒哈	tuō lè hā
脱衣服	tuō yī fú
舒尔哈	shū ěr hā
舒服	shū fú
舒服些	shū fú xiē
艾齐纳哈	ài qí nà hā
花衣服	huā yī fú
苑太监	yuàn tài jiàn
萌牙困难	méng yá kùn nán
萨丽哈	sà lì hā
萨利哈	sà lì hā
萨哈	sà hā
葫芦	hú lú
葫芦丝	hú lú sī
葫芦依样	hú lú yī yàng
葫芦兄弟	hú lú xiōng dì
葫芦头	hú lú tóu
葫芦套	hú lú tào
葫芦娃	hú lú wá
葫芦山	hú lú shān
葫芦岛	hú lú dǎo
葫芦岛市	hú lú dǎo shì
葫芦巴	hú lú bā
葫芦状	hú lú zhuàng
葫芦科	hú lú kē
葫芦花	hú lú huā
葫芦茶	hú lú chá
葫芦蔓	hú lú wàn
葫芦藓	hú lú xiǎn
葫芦藤	hú lú téng
薄荷	bò hé
薄荷叶	bò hé yè
薄荷油	bò hé yóu
薄荷精	bò hé jīng
薄荷糖	bò hé táng
薄荷脑	bò hé nǎo
薄荷醇	bò hé chún
薄荷香	bò hé xiāng
蚂螂	mā láng
血肉模糊	xuè ròu mó hū
行当	háng dàng
街坊	jiē fāng
街坊四邻	jiē fāng sì lín
街坊邻居	jiē fāng lín jū
街坊邻里	jiē fāng lín lǐ
衣服	yī fú
补钉	bǔ dìng
裁缝	cái féng
裁缝业	cái féng yè
裁缝师	cái féng shī
裁缝店	cái féng diàn
裁缝机	cái féng jī
裁衣服	cái yī fú
裘丽丽	qiú lì lì
西尔哈	xī ěr hā
西萨哈	xī sà hā
西葫芦	xī hú lú
要式合同	yào shì hé tóng
解决困难	jiě jué kùn nán
解除合同	jiě chú hé tóng
订合同	dìng hé tóng
诸多困难	zhū duō kùn nán
诺成合同	nuò chéng hé tóng
豁拳	huá quán
貉	mò
贝恩哈	bèi ēn hā
财政困难	cái zhèng kùn nán
贴身衣服	tiē shēn yī fú
费思量	fèi sī liáng
赔本赚吆喝	péi běn zhuàn yāo hè
赞哈	zàn hā
路上	lù shàng
路上行人	lù shàng xíng rén
路上车	lù shàng chē
蹄膀	tí páng
轧差	gá chā
轧账	gá zhàng
轧轧	gá gá
轧轧声	gá gá shēng
转包合同	zhuǎn bāo hé tóng
转文	zhuǎi wén
转转	zhuàn zhuàn
转转看	zhuàn zhuàn kàn
这个	zhè gè
这部分	zhè bù fèn
迷糊	mí hū
追思弥撒	zhuī sī mí sā
通过商量	tōng guò shāng liáng
遇到困难	yù dào kùn nán
遵守合同	zūn shǒu hé tóng
那个	nà gè
那个游戏	nà gè yóu xì
那太监	nà tài jiàn
那小太监	nà xiǎo tài jiàn
郝太监	hǎo tài jiàn
部分	bù fèn
部分冠	bù fèn guàn
部分加电	bù fèn jiā diàn
部分合子	bù fèn hé zǐ
部分合成	bù fèn hé chéng
郭丽丽	guō lì lì
酌量	zhuó liáng
重合同	zhòng hé tóng
重复部分	chóng fù bù fèn
重重困难	chóng chóng kùn nán
野葫芦引	yě hú lú yǐn
金葫芦	jīn hú lú
锦灯笼	jǐn dēng lóng
闷葫芦	mèn hú lú
阿哈	ā hā
阿姆哈	ā mǔ hā
阿富哈	ā fù hā
阿尔哈	ā ěr hā
阿尔摩哈	ā ěr mó hā
阿思哈	ā sī hā
阿斯哈	ā sī hā
陈丽丽	chén lì lì
陈太监	chén tài jiàn
陶作坊	táo zuō fāng
随口答应	suí kǒu dā yìng
集体合同	jí tǐ hé tóng
面糊糊	miàn hú hú
韩太监	hán tài jiàn
顺口答应	shùn kǒu dā yìng
顺当	shùn dàng
风流罪过	fēng liú zuì guò
饮水困难	yǐn shuǐ kùn nán
马尼哈	mǎ ní hā
马斯哈	mǎ sī hā
马监太监	mǎ jiān tài jiàn
马路上	mǎ lù shàng
骂咧	mà liē
魏太监	wèi tài jiàn
鲁卜哈	lǔ bǔ hā
鲁梅哈	lǔ méi hā
麦蒙哈	mài méng hā
麻麻糊糊	má má hú hú
黄头发	huáng tóu fà
黄衣服	huáng yī fú
黏糊	nián hū
黑作坊	hēi zuō fāng
黑头发	hēi tóu fà
黑衣服	hēi yī fú
`;

function resolve(
  word: string,
  simp_list: string[],
  ref_list: string[],
  dict: Map<string, string[]>
) {
  let resolved = true;
  let chars = [...word];
  const updatedList = ref_list.map((syllable, i) => {
    const char = chars[i];
    const simp = simp_list[i];
    const possible = dict.get(char)!;
    if (syllable.startsWith(simp)) return syllable;
    if (possible.length === 1) return possible[0];
    if (possible.filter((p) => p.startsWith(simp)).length === 1) {
      return possible.find((p) => p.startsWith(simp))!;
    }
    resolved = false;
    return syllable;
  });
  return [resolved, updatedList.join(" ")] as const;
}

function fixDictEntry(
  word: string,
  pinyin_list: string[],
  dict: Map<string, string[]>
) {
  let resolved = true;
  const updatedList = pinyin_list.map((syllable, i) => {
    const char = word[i];
    const possible = dict
      .get(char)
      ?.map((x) => x.replace("5", "0").replace("v", "ü"));
    if (!possible) return syllable;
    const syllableNum = convert(syllable, { format: "symbolToNum" });
    const syllableWithoutTone = syllableNum.replace(/\d/g, "");
    if (possible.includes(syllableNum)) return syllable;
    if (possible.length === 1) return convert(possible[0]);
    if (
      possible.filter((p) => p.startsWith(syllableWithoutTone)).length === 1
    ) {
      return convert(possible.find((p) => p.startsWith(syllableWithoutTone))!);
    }
    resolved = false;
    return syllable;
  });
  return [resolved, updatedList.join(" ")] as const;
}

function processCompleteDict() {
  const diff = new Map<string, string>();
  for (const line of completeDiff.trim().split("\n")) {
    const [key, value] = line.split("\t");
    diff.set(key, value);
  }
  const newDict: Record<string, [string, number, string]> = {};
  const undetermined: string[][] = [];

  for (const [word, value] of Object.entries(CompleteDict)) {
    const pinyin = diff.get(word) ?? value[0];
    const [resolved, updated] = fixDictEntry(
      word,
      pinyin.split(" "),
      new Map()
    );
    newDict[word] = [updated, value[1], value[2]];
    if (!resolved) {
      undetermined.push([word, updated]);
    }
  }
  return newDict;
}

customPinyin(diff2);
customPinyin(diff3);
customPinyin(diff4);
customPinyin(diff5);
const completeDict = processCompleteDict();
addDict(completeDict);

export function addPronunciation(content: string) {
  const lines = content.trim().split("\n");
  const pronounced: string[] = [];
  for (const line of lines) {
    try {
      const [word] = line.split("\t");
      if (!word) continue;
      const ref_list = pinyin(word, {
        toneType: "num",
        v: true,
        nonZh: "removed",
        type: "array",
        toneSandhi: false,
      }).map((x) => x.replaceAll("0", "5"));
      pronounced.push([word, ref_list.join(" "), 100].join("\t"));
    } catch (e) {
      console.error(e);
    }
  }
  return pronounced.join("\n");
}
