// 新概念英语青少版 1A 词汇（按教材出现顺序，共约 290 条）
// 词表来源：新东方在线词典「新概念英语青少版1A词汇表」；音标、释义、例句为自行整理，与教材可能略有出入。
// 每行：单词|英音|美音|词性|中文释义|例句|例句翻译
const RAW = `
meet|miːt|miːt|v.|遇见；认识|Nice to meet you.|很高兴认识你。
the|ðə|ðə|art.|这；那（定冠词）|The book is on the desk.|书在书桌上。
family|ˈfæməli|ˈfæməli|n.|家庭；家人|This is my family.|这是我的家人。
hello|həˈləʊ|həˈloʊ|int.|你好|Hello! I am Lucy.|你好！我是露西。
my|maɪ|maɪ|pron.|我的|This is my bag.|这是我的书包。
name|neɪm|neɪm|n.|名字|What is your name?|你叫什么名字？
is|ɪz|ɪz|v.|是|She is my friend.|她是我的朋友。
this|ðɪs|ðɪs|pron.|这，这个|This is my son.|这是我儿子。
wife|waɪf|waɪf|n.|妻子|This is my wife.|这是我妻子。
how do you do|haʊ duː juː duː|haʊ duː juː duː|phr.|你好（初次见面的问候）|How do you do? I am Tom.|你好！我是汤姆。
daughter|ˈdɔːtə|ˈdɔːtər|n.|女儿|This is my daughter, Lucy.|这是我的女儿露西。
son|sʌn|sʌn|n.|儿子|This is my son, Tom.|这是我的儿子汤姆。
hi|haɪ|haɪ|int.|嗨；你好|Hi! I am Lily.|嗨！我是莉莉。
and|ænd|ænd|conj.|和；而且|Tom and Lucy are my friends.|汤姆和露西是我的朋友。
nephew|ˈnefjuː|ˈnefjuː|n.|侄子；外甥|This is my nephew.|这是我的侄子。
nice to meet you|naɪs tə miːt juː|naɪs tə miːt juː|phr.|很高兴认识你|Nice to meet you, too.|我也很高兴认识你。
friend|frend|frend|n.|朋友|He is my good friend.|他是我的好朋友。
teacher|ˈtiːtʃə|ˈtiːtʃər|n.|教师；老师|Mr Smith is our teacher.|史密斯先生是我们的老师。
Mrs.|ˈmɪsɪz|ˈmɪsɪz|n.|夫人；太太|This is Mrs Brown.|这位是布朗太太。
one|wʌn|wʌn|num.|一|I have one sister.|我有一个姐姐。
two|tuː|tuː|num.|二|I have two books.|我有两本书。
three|θriː|θriː|num.|三|There are three birds.|有三只鸟。
four|fɔː|fɔːr|num.|四|He has four pens.|他有四支钢笔。
five|faɪv|faɪv|num.|五|I am five years old.|我五岁了。
six|sɪks|sɪks|num.|六|There are six boys.|有六个男孩。
seven|ˈsevn|ˈsevn|num.|七|It is seven o'clock.|现在是七点钟。
eight|eɪt|eɪt|num.|八|She has eight dolls.|她有八个玩偶。
nine|naɪn|naɪn|num.|九|I get up at nine.|我九点起床。
ten|ten|ten|num.|十|I have ten fingers.|我有十个手指。
eleven|ɪˈlevn|ɪˈlevn|num.|十一|There are eleven players.|有十一名球员。
twelve|twelv|twelv|num.|十二|There are twelve months in a year.|一年有十二个月。
your|jɔː|jʊr|pron.|你的，你们的|Is this your pen?|这是你的钢笔吗？
hey|heɪ|heɪ|int.|嘿|Hey! Look at that!|嘿！看那个！
good|ɡʊd|ɡʊd|adj.|好的|This is a good book.|这是一本好书。
look|lʊk|lʊk|v.|看|Look! It is a bird.|看！那是一只鸟。
a|ə|ə|art.|一个（不定冠词）|It is a cat.|它是一只猫。
wheel|wiːl|wiːl|n.|轮子；车轮|The bicycle has two wheels.|自行车有两个轮子。
green|ɡriːn|ɡriːn|adj.|绿色的|The grass is green.|草是绿色的。
OK|ˌəʊˈkeɪ|ˌoʊˈkeɪ|adj.|好的；行|OK, let's go.|好的，我们走吧。
now|naʊ|naʊ|adv.|现在|I am busy now.|我现在很忙。
flower|ˈflaʊə|ˈflaʊər|n.|花|This is a red flower.|这是一朵红花。
red|red|red|adj.|红色的|My bag is red.|我的书包是红色的。
umbrella|ʌmˈbrelə|ʌmˈbrelə|n.|雨伞|That is my umbrella.|那是我的伞。
that|ðæt|ðæt|pron.|那，那个|That is a bird.|那是一只鸟。
grey|ɡreɪ|ɡreɪ|adj.|灰色的|The cat is grey.|这只猫是灰色的。
bird|bɜːd|bɜːd|n.|鸟|The bird is in the tree.|鸟在树上。
key|kiː|kiː|n.|钥匙|Here is the key.|钥匙在这儿。
right|raɪt|raɪt|adj.|对的；正确的|Yes, that is right.|是的，那是对的。
silver|ˈsɪlvə|ˈsɪlvər|adj.|银色的|She has a silver ring.|她有一枚银戒指。
chair|tʃeə|tʃer|n.|椅子|Sit on the chair.|坐在椅子上。
table|ˈteɪbl|ˈteɪbl|n.|桌子|The book is on the table.|书在桌子上。
bicycle|ˈbaɪsɪkl|ˈbaɪsɪkl|n.|自行车|He has a new bicycle.|他有一辆新自行车。
colour|ˈkʌlə|ˈkʌlər|n.|颜色|What colour is it?|它是什么颜色？
what|wɒt|wʌt|pron.|什么|What is this?|这是什么？
white|waɪt|waɪt|adj.|白色的|The cat is white.|这只猫是白色的。
an|æn|æn|art.|一个（用于元音前）|It is an apple.|这是一个苹果。
black|blæk|blæk|adj.|黑色的|My dog is black.|我的狗是黑色的。
dress|dres|dres|n.|连衣裙|She has a new dress.|她有一条新连衣裙。
camera|ˈkæmərə|ˈkæmərə|n.|照相机|This is my camera.|这是我的照相机。
blue|bluː|bluː|adj.|蓝色的|The sky is blue.|天空是蓝色的。
desk|desk|desk|n.|书桌|My bag is on the desk.|我的书包在书桌上。
brown|braʊn|braʊn|adj.|棕色的|The horse is brown.|这匹马是棕色的。
who|huː|huː|pron.|谁|Who is he?|他是谁？
boy|bɔɪ|bɔɪ|n.|男孩|The boy is my brother.|这个男孩是我的弟弟。
which|wɪtʃ|wɪtʃ|pron.|哪一个|Which is your bag?|哪个是你的书包？
on|ɒn|ɑːn|prep.|在……上面|The pen is on the desk.|钢笔在书桌上。
man|mæn|mæn|n.|男人|The man is a doctor.|这个男人是医生。
with|wɪð|wɪð|prep.|和……一起；带有|I go to school with my friend.|我和朋友一起去上学。
Mr.|ˈmɪstə|ˈmɪstər|n.|先生|Mr Green is a teacher.|格林先生是老师。
he|hiː|hiː|pron.|他|He is my father.|他是我的爸爸。
father|ˈfɑːðə|ˈfɑːðər|n.|父亲|My father is a driver.|我的爸爸是司机。
woman|ˈwʊmən|ˈwʊmən|n.|女人|The woman is my teacher.|这位女士是我的老师。
she|ʃiː|ʃiː|pron.|她|She is my mother.|她是我的妈妈。
mother|ˈmʌðə|ˈmʌðər|n.|母亲|My mother is a nurse.|我的妈妈是护士。
girl|ɡɜːl|ɡɜːrl|n.|女孩|The girl is my sister.|这个女孩是我的姐姐。
sister|ˈsɪstə|ˈsɪstər|n.|姐；妹|She is my sister.|她是我的姐姐（妹妹）。
look at|lʊk æt|lʊk æt|phr.|看；看着|Look at the picture.|看这幅画。
young|jʌŋ|jʌŋ|adj.|年轻的|The teacher is young.|这位老师很年轻。
in|ɪn|ɪn|prep.|在……里|The cat is in the box.|猫在盒子里。
old|əʊld|oʊld|adj.|年老的；旧的|My grandfather is old.|我的爷爷年纪大了。
car|kɑː|kɑːr|n.|小汽车|My father has a new car.|我爸爸有一辆新车。
oh|əʊ|oʊ|int.|哦；啊|Oh, I see.|哦，我明白了。
cousin|ˈkʌzn|ˈkʌzn|n.|堂（表）兄弟姐妹|He is my cousin.|他是我的表哥。
so|səʊ|soʊ|adv.|这么；非常|I am so happy.|我非常高兴。
too|tuː|tuː|adv.|也；太|I like it, too.|我也喜欢它。
brother|ˈbrʌðə|ˈbrʌðər|n.|兄；弟|My brother is ten.|我的弟弟十岁了。
their|ðeə|ðer|pron.|他（她、它）们的|Their house is big.|他们的房子很大。
student|ˈstjuːdnt|ˈstuːdnt|n.|学生|I am a student.|我是一名学生。
his|hɪz|hɪz|pron.|他的|His name is Tom.|他的名字叫汤姆。
her|hɜː|hɜːr|pron.|她的；她|Her bag is blue.|她的书包是蓝色的。
new|njuː|nuː|adj.|新的|I have a new bag.|我有一个新书包。
thirteen|ˌθɜːˈtiːn|ˌθɜːrˈtiːn|num.|十三|My sister is thirteen.|我姐姐十三岁。
fourteen|ˌfɔːˈtiːn|ˌfɔːrˈtiːn|num.|十四|He is fourteen years old.|他十四岁。
fifteen|ˌfɪfˈtiːn|ˌfɪfˈtiːn|num.|十五|There are fifteen students.|有十五名学生。
sixteen|ˌsɪksˈtiːn|ˌsɪksˈtiːn|num.|十六|She is sixteen.|她十六岁。
seventeen|ˌsevnˈtiːn|ˌsevnˈtiːn|num.|十七|My cousin is seventeen.|我的表哥十七岁。
eighteen|ˌeɪˈtiːn|ˌeɪˈtiːn|num.|十八|He is eighteen.|他十八岁。
nineteen|ˌnaɪnˈtiːn|ˌnaɪnˈtiːn|num.|十九|She is nineteen.|她十九岁。
twenty|ˈtwenti|ˈtwenti|num.|二十|I have twenty books.|我有二十本书。
horse|hɔːs|hɔːrs|n.|马|The horse is brown.|这匹马是棕色的。
yellow|ˈjeləʊ|ˈjeloʊ|adj.|黄色的|The sun is yellow.|太阳是黄色的。
taxi|ˈtæksi|ˈtæksi|n.|出租车|Let's take a taxi.|我们打辆出租车吧。
well|wel|wel|adj.|健康的；好|I am very well.|我很好。
how|haʊ|haʊ|adv.|怎样；如何|How is your mother?|你妈妈好吗？
how are you|haʊ ɑː juː|haʊ ɑːr juː|phr.|你好吗|How are you? I am fine.|你好吗？我很好。
I|aɪ|aɪ|pron.|我|I am a student.|我是学生。
am|æm|æm|v.|是（用于 I 之后）|I am ten.|我十岁。
fine|faɪn|faɪn|adj.|好的；健康的|I am fine, thank you.|我很好，谢谢。
but|bʌt|bʌt|conj.|但是|I am small, but I am strong.|我个子小，但是我很强壮。
very|ˈveri|ˈveri|adv.|很；非常|She is very kind.|她非常善良。
sorry|ˈsɒri|ˈsɔːri|adj.|对不起的；难过的|Sorry, I am late.|对不起，我迟到了。
him|hɪm|hɪm|pron.|他（宾格）|Give it to him.|把它给他。
sure|ʃɔː|ʃʊr|adj.|确信的；当然|Are you sure?|你确定吗？
hot|hɒt|hɑːt|adj.|热的|It is very hot today.|今天很热。
hungry|ˈhʌŋɡri|ˈhʌŋɡri|adj.|饥饿的|I am hungry.|我饿了。
thirsty|ˈθɜːsti|ˈθɜːrsti|adj.|口渴的|I am thirsty.|我渴了。
poor|pɔː|pʊr|adj.|可怜的；贫穷的|The poor dog is hungry.|这只可怜的狗饿了。
what about|wɒt əˈbaʊt|wʌt əˈbaʊt|phr.|……怎么样|What about you?|你呢？
doctor|ˈdɒktə|ˈdɑːktər|n.|医生|My uncle is a doctor.|我叔叔是医生。
busy|ˈbɪzi|ˈbɪzi|adj.|忙的|I am very busy today.|我今天很忙。
ill|ɪl|ɪl|adj.|生病的|My mother is ill.|我妈妈生病了。
perhaps|pəˈhæps|pərˈhæps|adv.|也许；可能|Perhaps he is at home.|也许他在家。
are|ɑː|ɑːr|v.|是（用于 you, we, they）|You are my friend.|你是我的朋友。
cold|kəʊld|koʊld|adj.|冷的|It is cold today.|今天很冷。
or|ɔː|ɔːr|conj.|或者；还是|Is it red or blue?|它是红色的还是蓝色的？
clever|ˈklevə|ˈklevər|adj.|聪明的|She is a clever girl.|她是个聪明的女孩。
stupid|ˈstjuːpɪd|ˈstuːpɪd|adj.|愚蠢的|It is a stupid idea.|这是个愚蠢的主意。
sad|sæd|sæd|adj.|悲伤的|The boy is sad.|这个男孩很伤心。
happy|ˈhæpi|ˈhæpi|adj.|快乐的|I am very happy.|我很快乐。
story|ˈstɔːri|ˈstɔːri|n.|故事|This is a funny story.|这是一个有趣的故事。
funny|ˈfʌni|ˈfʌni|adj.|有趣的；滑稽的|He is a funny man.|他是个有趣的人。
silly|ˈsɪli|ˈsɪli|adj.|傻的；愚蠢的|Don't be silly.|别犯傻了。
neighbour|ˈneɪbə|ˈneɪbər|n.|邻居|He is my neighbour.|他是我的邻居。
nice|naɪs|naɪs|adj.|好的；友好的|She is a nice girl.|她是个友好的女孩。
at|æt|æt|prep.|在（某处）|He is at home.|他在家。
sport|spɔːt|spɔːrt|n.|体育运动|I like sport.|我喜欢运动。
academy|əˈkædəmi|əˈkædəmi|n.|学院|He is at the art academy.|他在艺术学院。
art|ɑːt|ɑːrt|n.|艺术；美术|I like art.|我喜欢美术。
college|ˈkɒlɪdʒ|ˈkɑːlɪdʒ|n.|学院；大学|My sister is at college.|我姐姐在上大学。
come|kʌm|kʌm|v.|来|Come here, please.|请到这儿来。
aunt|ɑːnt|ænt|n.|姑母；姨母；伯母；舅母|My aunt is a writer.|我的姑姑是作家。
writer|ˈraɪtə|ˈraɪtər|n.|作家|She is a famous writer.|她是一位著名的作家。
our|ˈaʊə|ˈaʊər|pron.|我们的|This is our school.|这是我们的学校。
husband|ˈhʌzbənd|ˈhʌzbənd|n.|丈夫|This is my husband.|这是我的丈夫。
everybody|ˈevribɒdi|ˈevribɑːdi|pron.|每个人；大家|Hello, everybody!|大家好！
thank you|θæŋk juː|θæŋk juː|phr.|谢谢你|Thank you very much.|非常感谢。
for|fɔː|fɔːr|prep.|为；给|This is for you.|这是给你的。
welcome|ˈwelkəm|ˈwelkəm|int.|欢迎|Welcome to our school!|欢迎来到我们学校！
job|dʒɒb|dʒɑːb|n.|工作；职业|What is your job?|你的职业是什么？
housewife|ˈhaʊswaɪf|ˈhaʊswaɪf|n.|家庭主妇|My mother is a housewife.|我妈妈是家庭主妇。
photographer|fəˈtɒɡrəfə|fəˈtɑːɡrəfər|n.|摄影师|He is a photographer.|他是摄影师。
policeman|pəˈliːsmən|pəˈliːsmən|n.|警察|The policeman is kind.|这位警察很和善。
postman|ˈpəʊstmən|ˈpoʊstmən|n.|邮递员|The postman has a letter for you.|邮递员有一封你的信。
actor|ˈæktə|ˈæktər|n.|男演员|He is a famous actor.|他是一位著名的演员。
accountant|əˈkaʊntənt|əˈkaʊntənt|n.|会计|My uncle is an accountant.|我叔叔是会计。
gossip|ˈɡɒsɪp|ˈɡɑːsɪp|n.|闲话；闲聊|Don't listen to gossip.|别听闲话。
over there|ˈəʊvə ðeə|ˈoʊvər ðer|phr.|在那边|The park is over there.|公园在那边。
tall|tɔːl|tɔːl|adj.|高的|My father is tall.|我爸爸个子很高。
pretty|ˈprɪti|ˈprɪti|adj.|漂亮的|She is a pretty girl.|她是个漂亮的女孩。
where|weə|wer|adv.|在哪里|Where is my bag?|我的书包在哪里？
from|frɒm|frʌm|prep.|来自|I am from China.|我来自中国。
English|ˈɪŋɡlɪʃ|ˈɪŋɡlɪʃ|adj.|英国的；英语的|He is English.|他是英国人。
American|əˈmerɪkən|əˈmerɪkən|adj.|美国的；美国人|She is American.|她是美国人。
here|hɪə|hɪr|adv.|这里|Come here, please.|请到这里来。
famous|ˈfeɪməs|ˈfeɪməs|adj.|著名的|He is a famous singer.|他是一位著名的歌手。
expensive|ɪkˈspensɪv|ɪkˈspensɪv|adj.|昂贵的|This watch is expensive.|这块手表很贵。
beautiful|ˈbjuːtɪfl|ˈbjuːtɪfl|adj.|美丽的|The flower is beautiful.|这朵花很美。
handsome|ˈhænsəm|ˈhænsəm|adj.|英俊的|He is a handsome man.|他是个英俊的男人。
wait|weɪt|weɪt|v.|等待|Wait for me, please.|请等我。
see|siː|siː|v.|看见；明白|I see a bird.|我看见一只鸟。
London|ˈlʌndən|ˈlʌndən|n.|伦敦|London is a big city.|伦敦是一座大城市。
nationality|ˌnæʃəˈnæləti|ˌnæʃəˈnæləti|n.|国籍|What is your nationality?|你的国籍是什么？
describe|dɪˈskraɪb|dɪˈskraɪb|v.|描述；描写|Please describe your friend.|请描述一下你的朋友。
short|ʃɔːt|ʃɔːrt|adj.|矮的；短的|He is short.|他个子矮。
French|frentʃ|frentʃ|adj.|法国的；法语的|She is French.|她是法国人。
fat|fæt|fæt|adj.|胖的|The cat is fat.|这只猫很胖。
thin|θɪn|θɪn|adj.|瘦的|The boy is thin.|这个男孩很瘦。
actress|ˈæktrəs|ˈæktrəs|n.|女演员|She is a famous actress.|她是一位著名的女演员。
mum|mʌm|mʌm|n.|妈妈（英）|Mum, I am home.|妈妈，我回来了。
favourite|ˈfeɪvərɪt|ˈfeɪvərɪt|adj.|最喜爱的|Red is my favourite colour.|红色是我最喜欢的颜色。
long|lɒŋ|lɔːŋ|adj.|长的|She has long hair.|她有一头长发。
schoolbag|ˈskuːlbæɡ|ˈskuːlbæɡ|n.|书包|My schoolbag is blue.|我的书包是蓝色的。
give|ɡɪv|ɡɪv|v.|给|Give me the book, please.|请把书给我。
me|miː|miː|pron.|我（宾格）|Give it to me.|把它给我。
please|pliːz|pliːz|int.|请|Sit down, please.|请坐。
here you are|hɪə juː ɑː|hɪr juː ɑːr|phr.|给你；拿着|Here you are.|给你。
pencil|ˈpensl|ˈpensl|n.|铅笔|I have a pencil.|我有一支铅笔。
case|keɪs|keɪs|n.|盒子；箱子|The pencil case is on the desk.|铅笔盒在书桌上。
put|pʊt|pʊt|v.|放；搁|Put it on the table.|把它放在桌子上。
no harm done|nəʊ hɑːm dʌn|noʊ hɑːrm dʌn|phr.|没关系；没造成伤害|Sorry! — No harm done.|对不起！——没关系。
thanks|θæŋks|θæŋks|int.|谢谢|Thanks a lot.|多谢。
dad|dæd|dæd|n.|爸爸|Dad, look at this!|爸爸，看这个！
small|smɔːl|smɔːl|adj.|小的|It is a small box.|这是一个小盒子。
ball|bɔːl|bɔːl|n.|球|He has a red ball.|他有一个红球。
box|bɒks|bɑːks|n.|盒子；箱子|The ball is in the box.|球在盒子里。
big|bɪɡ|bɪɡ|adj.|大的|The elephant is big.|大象很大。
clean|kliːn|kliːn|adj.|干净的|My room is clean.|我的房间很干净。
cup|kʌp|kʌp|n.|杯子|There is a cup on the table.|桌子上有一个杯子。
dirty|ˈdɜːti|ˈdɜːrti|adj.|脏的|The floor is dirty.|地板很脏。
floor|flɔː|flɔːr|n.|地板；楼层|The cat is on the floor.|猫在地板上。
thick|θɪk|θɪk|adj.|厚的|This is a thick book.|这是一本厚书。
under|ˈʌndə|ˈʌndər|prep.|在……下面|The cat is under the table.|猫在桌子下面。
bed|bed|bed|n.|床|The book is on the bed.|书在床上。
light|laɪt|laɪt|n.|灯；光|Turn on the light.|把灯打开。
plate|pleɪt|pleɪt|n.|盘子|There is an apple on the plate.|盘子里有一个苹果。
heavy|ˈhevi|ˈhevi|adj.|重的|The box is very heavy.|这个箱子很重。
shelf|ʃelf|ʃelf|n.|架子；搁板|The books are on the shelf.|书在书架上。
cupboard|ˈkʌbəd|ˈkʌbərd|n.|橱柜|The cups are in the cupboard.|杯子在橱柜里。
bump|bʌmp|bʌmp|n.|碰撞声；肿块|I hear a bump.|我听到砰的一声。
night|naɪt|naɪt|n.|夜晚|Good night!|晚安！
wake up|weɪk ʌp|weɪk ʌp|phr.|醒来；叫醒|Wake up! It is seven o'clock.|醒醒！七点了。
listen|ˈlɪsn|ˈlɪsn|v.|听|Listen to the teacher.|听老师讲。
there|ðeə|ðer|adv.|那里|Look over there!|看那边！
noise|nɔɪz|nɔɪz|n.|噪音；响声|I hear a noise.|我听到一个声响。
living-room|ˈlɪvɪŋ ruːm|ˈlɪvɪŋ ruːm|n.|客厅|We are in the living-room.|我们在客厅里。
burglar|ˈbɜːɡlə|ˈbɜːrɡlər|n.|入室盗贼|There is a burglar in the house!|房子里有个小偷！
nonsense|ˈnɒnsns|ˈnɑːnsens|n.|胡说；无意义的话|Nonsense! There is no burglar.|胡说！没有什么小偷。
kitchen|ˈkɪtʃɪn|ˈkɪtʃɪn|n.|厨房|My mother is in the kitchen.|我妈妈在厨房里。
torch|tɔːtʃ|tɔːrtʃ|n.|手电筒|I have a torch.|我有一个手电筒。
be careful|biː ˈkeəfl|biː ˈkerfl|phr.|小心|Be careful! The floor is wet.|小心！地板是湿的。
someone|ˈsʌmwʌn|ˈsʌmwʌn|pron.|某人|Someone is at the door.|有人在门口。
downstairs|ˌdaʊnˈsteəz|ˌdaʊnˈsterz|adv.|在楼下；到楼下|Someone is downstairs.|有人在楼下。
wide|waɪd|waɪd|adj.|宽的；张大的|The door is wide open.|门敞开着。
awake|əˈweɪk|əˈweɪk|adj.|醒着的|I am awake.|我醒着。
we|wiː|wiː|pron.|我们|We are good friends.|我们是好朋友。
all|ɔːl|ɔːl|pron.|全部；所有|We are all students.|我们都是学生。
bedroom|ˈbedruːm|ˈbedruːm|n.|卧室|My bedroom is small.|我的卧室很小。
garden|ˈɡɑːdn|ˈɡɑːrdn|n.|花园|There are flowers in the garden.|花园里有花。
door|dɔː|dɔːr|n.|门|Close the door, please.|请关门。
secretary|ˈsekrətri|ˈsekrəteri|n.|秘书|She is a secretary.|她是一名秘书。
basket|ˈbɑːskɪt|ˈbæskɪt|n.|篮子|There are apples in the basket.|篮子里有苹果。
bowl|bəʊl|boʊl|n.|碗|I have a bowl of rice.|我有一碗米饭。
apple|ˈæpl|ˈæpl|n.|苹果|I like apples.|我喜欢苹果。
orange|ˈɒrɪndʒ|ˈɔːrɪndʒ|n.|橘子；橙色|The orange is sweet.|这个橘子很甜。
house|haʊs|haʊs|n.|房子|My house is near the river.|我家在河边。
near|nɪə|nɪr|prep.|在……附近|The school is near my house.|学校在我家附近。
river|ˈrɪvə|ˈrɪvər|n.|河|The river is long.|这条河很长。
tree|triː|triː|n.|树|There is a bird in the tree.|树上有一只鸟。
pink|pɪŋk|pɪŋk|adj.|粉红色的|She has a pink dress.|她有一条粉红色的裙子。
pyjamas|pəˈdʒɑːməz|pəˈdʒæməz|n.|睡衣|He is in his pyjamas.|他穿着睡衣。
them|ðem|ðem|pron.|他（她、它）们（宾格）|I like them.|我喜欢他们。
they|ðeɪ|ðeɪ|pron.|他（她、它）们|They are my friends.|他们是我的朋友。
a bit|ə bɪt|ə bɪt|phr.|有点儿|I am a bit tired.|我有点累。
bright red|braɪt red|braɪt red|phr.|鲜红色|She has a bright red hat.|她有一顶鲜红的帽子。
shirt|ʃɜːt|ʃɜːrt|n.|衬衫|He has a white shirt.|他有一件白衬衫。
pure white|pjʊə waɪt|pjʊr waɪt|phr.|纯白色|The snow is pure white.|雪是纯白色的。
washing machine|ˈwɒʃɪŋ məˌʃiːn|ˈwɑːʃɪŋ məˌʃiːn|n.|洗衣机|We have a new washing machine.|我们有一台新洗衣机。
lovely|ˈlʌvli|ˈlʌvli|adj.|可爱的；美好的|What a lovely dress!|多漂亮的裙子啊！
those|ðəʊz|ðoʊz|pron.|那些|Those are my books.|那些是我的书。
dog|dɒɡ|dɔːɡ|n.|狗|The dog is under the table.|狗在桌子下面。
cat|kæt|kæt|n.|猫|The cat is on the bed.|猫在床上。
sock|sɒk|sɑːk|n.|短袜|I have a pair of socks.|我有一双袜子。
jump|dʒʌmp|dʒʌmp|v.|跳|The cat can jump high.|猫能跳得很高。
hurry|ˈhʌri|ˈhɜːri|v.|赶快；匆忙|Hurry up! We are late.|快点！我们迟到了。
bus|bʌs|bʌs|n.|公共汽车|I go to school by bus.|我坐公共汽车去上学。
wait a minute|weɪt ə ˈmɪnɪt|weɪt ə ˈmɪnɪt|phr.|等一下|Wait a minute, please.|请等一下。
come on|kʌm ɒn|kʌm ɑːn|phr.|快点；来吧|Come on! We are late.|快点！我们要迟到了。
dear|dɪə|dɪr|int.|天哪；亲爱的|Oh dear! I am late.|天哪！我迟到了。
school|skuːl|skuːl|n.|学校|I go to school at seven.|我七点去上学。
of course|əv kɔːs|əv kɔːrs|phr.|当然|Of course you can.|当然可以。
full|fʊl|fʊl|adj.|满的；饱的|The box is full of apples.|盒子里装满了苹果。
gee|dʒiː|dʒiː|int.|哎呀；天啊|Gee! It is so big!|哎呀！这么大！
people|ˈpiːpl|ˈpiːpl|n.|人们|There are many people here.|这里有很多人。
never mind|ˈnevə maɪnd|ˈnevər maɪnd|phr.|没关系；不要紧|Never mind. Try again.|没关系，再试一次。
mom|mɒm|mɑːm|n.|妈妈（美）|Mom, I am hungry.|妈妈，我饿了。
empty|ˈempti|ˈempti|adj.|空的|The box is empty.|盒子是空的。
seventy|ˈsevnti|ˈsevnti|num.|七十|My grandfather is seventy.|我爷爷七十岁。
eighty|ˈeɪti|ˈeɪti|num.|八十|She is eighty years old.|她八十岁了。
smart|smɑːt|smɑːrt|adj.|聪明的；时髦的|You look smart today.|你今天看起来很帅气。
these|ðiːz|ðiːz|pron.|这些|These are my socks.|这些是我的袜子。
outfit|ˈaʊtfɪt|ˈaʊtfɪt|n.|全套服装|I like her new outfit.|我喜欢她的新套装。
play|pleɪ|pleɪ|v.|玩；打（球）|I play football after school.|放学后我踢足球。
both|bəʊθ|boʊθ|pron.|两者都|We are both students.|我们俩都是学生。
elegant|ˈelɪɡənt|ˈelɪɡənt|adj.|优雅的|She looks elegant.|她看上去很优雅。
interesting|ˈɪntrəstɪŋ|ˈɪntrəstɪŋ|adj.|有趣的|This is an interesting book.|这是一本有趣的书。
tie|taɪ|taɪ|n.|领带|He has a red tie.|他有一条红领带。
um|ʌm|ʌm|int.|嗯（犹豫时）|Um, I am not sure.|嗯，我不确定。
colourful|ˈkʌləfl|ˈkʌlərfl|adj.|色彩鲜艳的|The bird is very colourful.|这只鸟色彩很鲜艳。
unusual|ʌnˈjuːʒuəl|ʌnˈjuːʒuəl|adj.|不寻常的|That is an unusual hat.|那是一顶不寻常的帽子。
all right|ɔːl raɪt|ɔːl raɪt|phr.|好的；没问题|All right, let's go.|好的，我们走吧。
part|pɑːt|pɑːrt|n.|部分；角色|I have a part in the play.|我在戏里有个角色。
shoe|ʃuː|ʃuː|n.|鞋|I have a new pair of shoes.|我有一双新鞋。
ninety|ˈnaɪnti|ˈnaɪnti|num.|九十|The old man is ninety.|这位老人九十岁了。
just|dʒʌst|dʒʌst|adv.|刚刚；只是|I am just a student.|我只是个学生。
like|laɪk|laɪk|v.|喜欢|I like apples.|我喜欢苹果。
show|ʃəʊ|ʃoʊ|v.|给……看；展示|Show me your picture.|给我看看你的画。
drawing|ˈdrɔːɪŋ|ˈdrɔːɪŋ|n.|图画；绘画|This is my drawing.|这是我画的画。
honey|ˈhʌni|ˈhʌni|n.|蜂蜜；亲爱的|I like honey.|我喜欢蜂蜜。
muscle|ˈmʌsl|ˈmʌsl|n.|肌肉|He has big muscles.|他有发达的肌肉。
strong|strɒŋ|strɔːŋ|adj.|强壮的|The man is very strong.|这个男人很强壮。
little|ˈlɪtl|ˈlɪtl|adj.|小的；年幼的|I have a little sister.|我有一个妹妹。
gymnast|ˈdʒɪmnæst|ˈdʒɪmnæst|n.|体操运动员|She is a gymnast.|她是体操运动员。
maybe|ˈmeɪbi|ˈmeɪbi|adv.|也许|Maybe he is at school.|也许他在学校。
bad|bæd|bæd|adj.|坏的|It is a bad idea.|这是个坏主意。
great|ɡreɪt|ɡreɪt|adj.|很好的；伟大的|That is a great idea!|那是个好主意！
hundred|ˈhʌndrəd|ˈhʌndrəd|num.|百|There are a hundred students.|有一百名学生。
late|leɪt|leɪt|adj.|迟的；晚的|I am late for school.|我上学迟到了。
early|ˈɜːli|ˈɜːrli|adj.|早的|I get up early.|我起得早。
time|taɪm|taɪm|n.|时间；时刻|What time is it?|现在几点了？
clock|klɒk|klɑːk|n.|钟|The clock is on the wall.|钟挂在墙上。
kid|kɪd|kɪd|n.|小孩|The kid is five.|这个小孩五岁。
in a hurry|ɪn ə ˈhʌri|ɪn ə ˈhɜːri|phr.|匆忙；急忙|I am in a hurry.|我很匆忙。
late for|leɪt fɔː|leɪt fɔːr|phr.|做……迟到|I am late for school.|我上学迟到了。
call|kɔːl|kɔːl|v.|呼叫；打电话|Call me tonight.|今晚给我打电话。
go|ɡəʊ|ɡoʊ|v.|去；走|Let's go to school.|我们去学校吧。
wow|waʊ|waʊ|int.|哇|Wow! It is so big!|哇！好大呀！
speed|spiːd|spiːd|n.|速度|The car has a high speed.|这辆车速度很快。
gate|ɡeɪt|ɡeɪt|n.|大门|The gate is open.|大门开着。
shut|ʃʌt|ʃʌt|v.|关上；关闭|Shut the door, please.|请把门关上。
slow|sləʊ|sloʊ|adj.|慢的|The tortoise is slow.|乌龟很慢。
fast|fɑːst|fæst|adj.|快的|The car is fast.|这辆车很快。
open|ˈəʊpən|ˈoʊpən|v.|打开|Open the door, please.|请开门。
catch|kætʃ|kætʃ|v.|接住；抓住|Catch the ball!|接住球！
jar|dʒɑː|dʒɑːr|n.|罐子|There is honey in the jar.|罐子里有蜂蜜。
ready|ˈredi|ˈredi|adj.|准备好的|Are you ready?|你准备好了吗？
stop|stɒp|stɑːp|v.|停止|Stop! Don't run.|停！别跑。
can|kæn|kæn|v.|能；会|I can swim.|我会游泳。
bring|brɪŋ|brɪŋ|v.|带来|Bring your book, please.|请带上你的书。
room|ruːm|ruːm|n.|房间|My room is big.|我的房间很大。
football|ˈfʊtbɔːl|ˈfʊtbɔːl|n.|足球|I play football every day.|我每天踢足球。
glass|ɡlɑːs|ɡlæs|n.|玻璃杯；玻璃|I want a glass of water.|我想要一杯水。
beside|bɪˈsaɪd|bɪˈsaɪd|prep.|在……旁边|The dog is beside the door.|狗在门旁边。
us|ʌs|ʌs|pron.|我们（宾格）|Come with us.|和我们一起来。
cheap|tʃiːp|tʃiːp|adj.|便宜的|This bag is cheap.|这个包很便宜。
window|ˈwɪndəʊ|ˈwɪndoʊ|n.|窗户|Open the window, please.|请打开窗户。
knife|naɪf|naɪf|n.|刀|Be careful with the knife.|小心那把刀。
in front of|ɪn frʌnt əv|ɪn frʌnt əv|phr.|在……前面|The dog is in front of the door.|狗在门前面。
behind|bɪˈhaɪnd|bɪˈhaɪnd|prep.|在……后面|The cat is behind the door.|猫在门后面。
bone|bəʊn|boʊn|n.|骨头|The dog has a bone.|狗有一根骨头。
fresh|freʃ|freʃ|adj.|新鲜的|The apples are fresh.|这些苹果很新鲜。
dish|dɪʃ|dɪʃ|n.|盘；菜肴|This dish is nice.|这道菜很好吃。
fair|feə|fer|adj.|公平的|That is not fair!|那不公平！
field|fiːld|fiːld|n.|田野；运动场|The boys are in the field.|男孩们在运动场上。
idea|aɪˈdɪə|aɪˈdiːə|n.|主意；想法|That is a good idea.|那是个好主意。
captain|ˈkæptɪn|ˈkæptɪn|n.|队长；船长|He is the captain of the team.|他是球队的队长。
side|saɪd|saɪd|n.|边；一方|He is on my side.|他站在我这一边。
other|ˈʌðə|ˈʌðər|adj.|其他的；另外的|Where are the other boys?|其他男孩在哪里？
referee|ˌrefəˈriː|ˌrefəˈriː|n.|裁判|The referee is on the field.|裁判在场上。
how many|haʊ ˈmeni|haʊ ˈmeni|phr.|多少|How many players are there?|有多少名球员？
player|ˈpleɪə|ˈpleɪər|n.|运动员；选手|He is a football player.|他是足球运动员。
shop|ʃɒp|ʃɑːp|n.|商店|The shop is near my house.|商店在我家附近。
street|striːt|striːt|n.|街道|The shop is in the street.|商店在街上。
boat|bəʊt|boʊt|n.|船|The boat is on the river.|船在河上。
beach|biːtʃ|biːtʃ|n.|海滩|We play on the beach.|我们在海滩上玩。
animal|ˈænɪml|ˈænɪml|n.|动物|The dog is an animal.|狗是一种动物。
cow|kaʊ|kaʊ|n.|奶牛|The cow is in the field.|奶牛在田野里。
bench|bentʃ|bentʃ|n.|长凳|The boys are on the bench.|男孩们坐在长凳上。
`.trim()

export const ncej1aWords = RAW.split('\n').map(line => {
  const f = line.split('|')
  if (f.length !== 7) throw new Error(`ncej-1a 行格式错误: ${line}`)
  return f.map(s => s.trim())
})
