<script setup>
import Practice from '../components/Practice.vue'

const shengjie = `
d	F
i	D
sh	S
ji	A
zh	G
xi	R
u	E
b	W
z	Q
f	T
gu	V
m	C
li	X
h	Z
l	B
qi	DF
ü	SD
g	SF
t	AF
hu	ER
zhu	WE
r	WR
ch	QR
du	CV
di	XC
k	XV
#	ZV
n	DG
bi	SG
shu	AG
zu	EF
ti	WF
mi	QF
chu	DV
qü	SV
s	AV
ni	CF
c	XF
tu	ZF
xü	DR
jü	SR
su	AR
p	EG
lu	WG
ru	QG
ku	CG
pi	XG
cu	ZG
lü	AS
nu	SE
nü	XD
`.trim().split('\n').map(x => x.split('\t')).map(([front, back]) => ({ front, back }));;

const yundiao = `
ˋ	J
ē	K
ˇ	L
ˉ	;
è	H
ˊ	U
ēng	I
àn	O
é	P
éng	Y
ě	M
ēn	,
èi	.
án	/
ā	N
èng	JK
ào	KL
én	JL
ài	J;
ān	UI
à	IO
àng	UO
ǒu	UP
ǎn	M,
āng	,.
òu	M.
ǎo	M/
èn	HK
ái	HL
ěng	H;
áng	JI
ǎng	JO
ěn	JP
ǎ	MK
óu	ML
éi	M;
ěi	J,
āo	J.
ōu	J/
ēi	UK
á	UL
áo	U;
ǎi	HI
āi	HO
`.trim().split('\n').map(x => x.split('\t')).map(([front, back]) => ({ front, back }));;
</script>

# 拼写规则

冰雪一拼中，一击可以打出一个带调音节。请首先参考[拼读并击](https://github.com/zhanghaozhecn/rime-pindu-chord-type)的页面学习如何将带调音节分解为声介和韵调，然后可以在本页面练习声介和韵调元素的并击键位组合。

## 声介练习

<Practice :data="shengjie" name="pdbj-shengjie" :combo="true" />

## 韵调练习

<Practice :data="yundiao" name="pdbj-yundiao" :combo="true" />
