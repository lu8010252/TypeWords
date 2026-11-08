// 新概念英语青少版 1B 词汇（按教材出现顺序）
// 词表来源：新东方在线词典「新概念英语（青少版）1B词汇表」；音标、释义、例句为自行整理，与教材可能略有出入。
// 每行：单词|英音|美音|词性|中文释义|例句|例句翻译
const RAW = `
London|ˈlʌndən|ˈlʌndən|n.|伦敦|London is a big city.|伦敦是一座大城市。
eye|aɪ|aɪ|n.|眼睛|She has blue eyes.|她有一双蓝眼睛。
fun|fʌn|fʌn|n.|乐趣；有趣的事|We have fun at the park.|我们在公园里玩得很开心。
believe|bɪˈliːv|bɪˈliːv|v.|相信|I believe you.|我相信你。
together|təˈɡeðə|təˈɡeðər|adv.|一起|We go to school together.|我们一起去上学。
Thames|temz|temz|n.|泰晤士河|The Thames is a river in London.|泰晤士河是伦敦的一条河。
bridge|brɪdʒ|brɪdʒ|n.|桥|There is a bridge over the river.|河上有一座桥。
tower|ˈtaʊə|ˈtaʊər|n.|塔|The tower is very tall.|这座塔很高。
really|ˈrɪəli|ˈriːəli|adv.|真正地；真的|Is it really true?|这真的是真的吗？
pass|pɑːs|pæs|v.|传递；经过|Pass me the salt, please.|请把盐递给我。
binoculars|bɪˈnɒkjələz|bɪˈnɑːkjələrz|n.|双筒望远镜|He looks through the binoculars.|他用双筒望远镜看。
any|ˈeni|ˈeni|pron.|任何；一些|Do you have any pens?|你有钢笔吗？
ship|ʃɪp|ʃɪp|n.|大船；轮船|The ship is on the sea.|船在海上。
some|sʌm|sʌm|pron.|一些|I have some apples.|我有一些苹果。
Big Ben|bɪɡ ben|bɪɡ ben|n.|大本钟|Big Ben is in London.|大本钟在伦敦。
its|ɪts|ɪts|pron.|它的|The dog wags its tail.|狗摇着它的尾巴。
classroom|ˈklɑːsruːm|ˈklæsruːm|n.|教室|Our classroom is big.|我们的教室很大。
park|pɑːk|pɑːrk|n.|公园|We play in the park.|我们在公园里玩。
church|tʃɜːtʃ|tʃɜːrtʃ|n.|教堂|The church is old.|这座教堂很古老。
cinema|ˈsɪnəmə|ˈsɪnəmə|n.|电影院|We go to the cinema on Sunday.|我们星期天去看电影。
smile|smaɪl|smaɪl|v.|微笑|Smile, please!|请笑一笑！
watch|wɒtʃ|wɑːtʃ|v.|观看；注视|I watch TV after dinner.|晚饭后我看电视。
balance|ˈbæləns|ˈbæləns|n.|平衡|She keeps her balance well.|她很会保持平衡。
do|duː|duː|v.|做；干|What do you do after school?|放学后你做什么？
try|traɪ|traɪ|v.|尝试|Try again!|再试一次！
as well|æz wel|æz wel|phr.|也；同样|I like tennis as well.|我也喜欢网球。
easy|ˈiːzi|ˈiːzi|adj.|容易的|This question is easy.|这个问题很容易。
good at|ɡʊd æt|ɡʊd æt|phr.|擅长|She is good at maths.|她擅长数学。
gymnastics|dʒɪmˈnæstɪks|dʒɪmˈnæstɪks|n.|体操|She likes gymnastics.|她喜欢体操。
useless|ˈjuːsləs|ˈjuːsləs|adj.|无用的；无能的|I am useless at football.|我踢足球很差。
maths|mæθs|mæθs|n.|数学（英）|I like maths.|我喜欢数学。
music|ˈmjuːzɪk|ˈmjuːzɪk|n.|音乐|She likes music.|她喜欢音乐。
take|teɪk|teɪk|v.|拿；带；拍（照）|Take your umbrella.|带上你的伞。
take a photo|teɪk ə ˈfəʊtəʊ|teɪk ə ˈfoʊtoʊ|phr.|拍照|Can I take a photo of you?|我可以给你拍张照吗？
gym|dʒɪm|dʒɪm|n.|体育馆；健身房|We are in the gym.|我们在体育馆里。
difficult|ˈdɪfɪkəlt|ˈdɪfɪkəlt|adj.|困难的|This question is difficult.|这个问题很难。
drive|draɪv|draɪv|v.|驾驶|My father can drive.|我爸爸会开车。
ride|raɪd|raɪd|v.|骑|I can ride a bicycle.|我会骑自行车。
speak|spiːk|spiːk|v.|说；讲（语言）|Can you speak English?|你会说英语吗？
tennis|ˈtenɪs|ˈtenɪs|n.|网球|I play tennis on Sundays.|我星期天打网球。
cook|kʊk|kʊk|v.|烹饪；做饭|My father can cook.|我爸爸会做饭。
dinner|ˈdɪnə|ˈdɪnər|n.|正餐；晚饭|Dinner is ready.|晚饭好了。
help|help|help|v.|帮助|Can you help me?|你能帮我吗？
rice|raɪs|raɪs|n.|米饭；大米|I like rice.|我喜欢米饭。
water|ˈwɔːtə|ˈwɔːtər|n.|水|Can I have some water?|我可以喝点水吗？
pan|pæn|pæn|n.|平底锅|The pan is hot.|平底锅很烫。
chop|tʃɒp|tʃɑːp|v.|切；剁|Chop the onions, please.|请把洋葱切碎。
onion|ˈʌnjən|ˈʌnjən|n.|洋葱|I don't like onions.|我不喜欢洋葱。
spoon|spuːn|spuːn|n.|勺子|I eat soup with a spoon.|我用勺子喝汤。
get|ɡet|ɡet|v.|得到；拿到|Get me a spoon, please.|请给我拿把勺子。
fork|fɔːk|fɔːk|n.|叉子|I eat with a knife and fork.|我用刀叉吃饭。
drawer|drɔː|drɔːr|n.|抽屉|The forks are in the drawer.|叉子在抽屉里。
hand|hænd|hænd|n.|手|Wash your hands.|洗洗你的手。
wet|wet|wet|adj.|湿的|My hands are wet.|我的手湿了。
open|ˈəʊpən|ˈoʊpən|adj.|开着的；营业的|The restaurant is open.|这家餐厅在营业。
restaurant|ˈrestrɒnt|ˈrestərɑːnt|n.|餐馆|We eat at a restaurant.|我们在餐馆吃饭。
yeah|jeə|jeə|int.|是的（口语）|Yeah, I like it.|是的，我喜欢。
must|mʌst|mʌst|v.|必须|I must go now.|我现在必须走了。
jug|dʒʌɡ|dʒʌɡ|n.|水壶；罐|There is milk in the jug.|罐里有牛奶。
dry|draɪ|draɪ|adj.|干的|The towel is dry.|毛巾是干的。
food|fuːd|fuːd|n.|食物|I like Chinese food.|我喜欢中国菜。
sugar|ˈʃʊɡə|ˈʃʊɡər|n.|糖|I want some sugar.|我想要一些糖。
milk|mɪlk|mɪlk|n.|牛奶|I drink milk every day.|我每天喝牛奶。
scanner|ˈskænə|ˈskænər|n.|扫描仪|We have a new scanner.|我们有一台新扫描仪。
computer|kəmˈpjuːtə|kəmˈpjuːtər|n.|电脑|I have a new computer.|我有一台新电脑。
packet|ˈpækɪt|ˈpækɪt|n.|小包；一包|I want a packet of tea.|我想要一包茶。
tea|tiː|tiː|n.|茶|Would you like some tea?|你想喝点茶吗？
bottle|ˈbɒtl|ˈbɑːtl|n.|瓶子|There is a bottle of water on the table.|桌上有一瓶水。
orange juice|ˈɒrɪndʒ dʒuːs|ˈɔːrɪndʒ dʒuːs|n.|橙汁|I want a glass of orange juice.|我想要一杯橙汁。
fridge|frɪdʒ|frɪdʒ|n.|冰箱|The milk is in the fridge.|牛奶在冰箱里。
sea|siː|siː|n.|海|The sea is blue.|大海是蓝色的。
eat|iːt|iːt|v.|吃|What do you eat for breakfast?|你早餐吃什么？
finish|ˈfɪnɪʃ|ˈfɪnɪʃ|v.|完成；结束|I finish my homework at six.|我六点钟做完作业。
why|waɪ|waɪ|adv.|为什么|Why are you late?|你为什么迟到？
Why not|waɪ nɒt|waɪ nɑːt|phr.|为什么不呢|Let's go to the park. — Why not?|我们去公园吧。——好啊！
tired|ˈtaɪəd|ˈtaɪərd|adj.|累的；疲倦的|I am very tired.|我很累。
problem|ˈprɒbləm|ˈprɑːbləm|n.|问题；困难|I have a problem.|我有个问题。
lots of|lɒts əv|lɑːts əv|phr.|许多|We have lots of apples.|我们有很多苹果。
fish|fɪʃ|fɪʃ|n.|鱼；鱼肉|I like fish.|我喜欢吃鱼。
salad|ˈsæləd|ˈsæləd|n.|沙拉|I want a salad.|我想要一份沙拉。
dish|dɪʃ|dɪʃ|n.|菜肴；盘子|This dish is delicious.|这道菜很好吃。
drink|drɪŋk|drɪŋk|v.|喝|Would you like a drink?|你想喝点什么吗？
peach|piːtʃ|piːtʃ|n.|桃子|The peach is sweet.|桃子很甜。
help yourself|help jɔːˈself|help jɔːrˈself|phr.|请随便吃；请自便|Help yourself to some cake.|请随便吃点蛋糕。
meat|miːt|miːt|n.|肉|I don't eat meat.|我不吃肉。
grape|ɡreɪp|ɡreɪp|n.|葡萄|These grapes are sweet.|这些葡萄很甜。
buy|baɪ|baɪ|v.|买|I want to buy some bread.|我想买些面包。
bread|bred|bred|n.|面包|I have bread for breakfast.|我早餐吃面包。
cake|keɪk|keɪk|n.|蛋糕|This is a birthday cake.|这是一个生日蛋糕。
tin|tɪn|tɪn|n.|罐头；锡|I want a tin of tomatoes.|我想要一罐番茄。
cheese|tʃiːz|tʃiːz|n.|奶酪|I like cheese.|我喜欢奶酪。
butter|ˈbʌtə|ˈbʌtər|n.|黄油|I want bread and butter.|我想要面包和黄油。
surprise|səˈpraɪz|sərˈpraɪz|n.|惊喜；惊奇|It is a surprise for you.|这是给你的惊喜。
lesson|ˈlesn|ˈlesn|n.|课；一节课|We have an English lesson today.|我们今天有一节英语课。
half|hɑːf|hæf|n.|一半；半小时|It is half past seven.|现在是七点半。
past|pɑːst|pæst|prep.|（时间）过|It is ten past six.|现在是六点十分。
talk|tɔːk|tɔːk|v.|说话；交谈|We talk about music.|我们谈论音乐。
quarter|ˈkwɔːtə|ˈkwɔːrtər|n.|一刻钟；四分之一|It is a quarter past four.|现在是四点一刻。
find|faɪnd|faɪnd|v.|找到；发现|I can't find my key.|我找不到我的钥匙了。
bye|baɪ|baɪ|int.|再见|Bye! See you tomorrow.|再见！明天见。
when|wen|wen|adv.|什么时候|When do you get up?|你什么时候起床？
look for|lʊk fɔː|lʊk fɔːr|phr.|寻找|I look for my pen.|我在找我的钢笔。
next|nekst|nekst|adj.|下一个的|What is next?|下一个是什么？
homework|ˈhəʊmwɜːk|ˈhoʊmwɜːrk|n.|家庭作业|I do my homework after school.|放学后我做作业。
then|ðen|ðen|adv.|然后；那时|I eat breakfast, then I go to school.|我吃早餐，然后去上学。
wash|wɒʃ|wɑːʃ|v.|洗|I wash my hands before dinner.|我饭前洗手。
breakfast|ˈbrekfəst|ˈbrekfəst|n.|早餐|I have breakfast at seven.|我七点吃早餐。
blues|bluːz|bluːz|n.|蓝调音乐|He likes the blues.|他喜欢蓝调音乐。
want|wɒnt|wɑːnt|v.|想要|I want a cup of tea.|我想要一杯茶。
not really|nɒt ˈrɪəli|nɑːt ˈriːəli|phr.|不太；并不是|Do you like it? — Not really.|你喜欢吗？——不太喜欢。
something|ˈsʌmθɪŋ|ˈsʌmθɪŋ|pron.|某事；某物|I want something to eat.|我想吃点东西。
train|treɪn|treɪn|n.|火车|I go to London by train.|我坐火车去伦敦。
stomach|ˈstʌmək|ˈstʌmək|n.|胃；肚子|My stomach hurts.|我肚子疼。
have got|hæv ɡɒt|hæv ɡɑːt|phr.|有；拥有|I have got a new bike.|我有一辆新自行车。
how much|haʊ mʌtʃ|haʊ mʌtʃ|phr.|多少；多少钱|How much is this bag?|这个包多少钱？
pot|pɒt|pɑːt|n.|罐；壶|There is a pot of tea on the table.|桌上有一壶茶。
start|stɑːt|stɑːrt|v.|开始|School starts at eight.|学校八点开始上课。
morning|ˈmɔːnɪŋ|ˈmɔːrnɪŋ|n.|早晨；上午|I get up early in the morning.|我早上起得早。
yoghurt|ˈjɒɡət|ˈjoʊɡərt|n.|酸奶|I like strawberry yoghurt.|我喜欢草莓酸奶。
canteen|kænˈtiːn|kænˈtiːn|n.|食堂|We have lunch in the canteen.|我们在食堂吃午饭。
terrible|ˈterəbl|ˈterəbl|adj.|糟糕的；可怕的|The weather is terrible.|天气糟透了。
much|mʌtʃ|mʌtʃ|adv.|很；非常；许多|Thank you very much.|非常感谢你。
fruit|fruːt|fruːt|n.|水果|I eat fruit every day.|我每天吃水果。
chocolate|ˈtʃɒklət|ˈtʃɔːklət|n.|巧克力|I like chocolate.|我喜欢巧克力。
beer|bɪə|bɪr|n.|啤酒|He drinks a glass of beer.|他喝了一杯啤酒。
paper|ˈpeɪpə|ˈpeɪpər|n.|纸|I need some paper.|我需要一些纸。
string|strɪŋ|strɪŋ|n.|细绳；线|I need a piece of string.|我需要一根绳子。
money|ˈmʌni|ˈmʌni|n.|钱|I have no money.|我没有钱。
spare|speə|sper|adj.|多余的；备用的|I have a spare key.|我有一把备用钥匙。
good morning|ɡʊd ˈmɔːnɪŋ|ɡʊd ˈmɔːrnɪŋ|phr.|早上好|Good morning, teacher!|老师早上好！
a lot of|ə lɒt əv|ə lɑːt əv|phr.|许多|There are a lot of people here.|这里有很多人。
shy|ʃaɪ|ʃaɪ|adj.|害羞的|The girl is shy.|这个女孩很害羞。
many|ˈmeni|ˈmeni|pron.|许多|There are many books.|有很多书。
introduce|ˌɪntrəˈdjuːs|ˌɪntrəˈduːs|v.|介绍|Let me introduce my friend.|让我介绍一下我的朋友。
to|tuː|tuː|prep.|到；向|I go to school by bus.|我坐公共汽车去上学。
study|ˈstʌdi|ˈstʌdi|v.|学习；研究|I study English every day.|我每天学英语。
true|truː|truː|adj.|真的；真实的|That is true.|那是真的。
always|ˈɔːlweɪz|ˈɔːlweɪz|adv.|总是|I always get up at seven.|我总是七点起床。
CD|ˌsiː ˈdiː|ˌsiː ˈdiː|n.|光盘；激光唱片|I have a new CD.|我有一张新光盘。
DVD|ˌdiː viː ˈdiː|ˌdiː viː ˈdiː|n.|数字视频光盘|We watch a DVD at home.|我们在家看光盘。
jacket|ˈdʒækɪt|ˈdʒækɪt|n.|夹克；短外套|He has a black jacket.|他有一件黑夹克。
magazine|ˌmæɡəˈziːn|ˈmæɡəziːn|n.|杂志|I read a magazine.|我在看杂志。
video|ˈvɪdiəʊ|ˈvɪdioʊ|n.|录像；视频|We watch a video in class.|我们在课上看视频。
blouse|blaʊz|blaʊs|n.|女衬衫|She has a white blouse.|她有一件白衬衫。
skirt|skɜːt|skɜːrt|n.|裙子|She has a red skirt.|她有一条红裙子。
vegetable|ˈvedʒtəbl|ˈvedʒtəbl|n.|蔬菜|I eat vegetables every day.|我每天吃蔬菜。
relative|ˈrelətɪv|ˈrelətɪv|n.|亲戚|He is my relative.|他是我的亲戚。
kind|kaɪnd|kaɪnd|n.|种类|What kind of music do you like?|你喜欢哪种音乐？
think|θɪŋk|θɪŋk|v.|想；认为|I think it is nice.|我认为它很好。
Japanese|ˌdʒæpəˈniːz|ˌdʒæpəˈniːz|adj.|日本的；日本人|He is Japanese.|他是日本人。
remember|rɪˈmembə|rɪˈmembər|v.|记得|I remember your name.|我记得你的名字。
know|nəʊ|noʊ|v.|知道；认识|I know him.|我认识他。
lucky|ˈlʌki|ˈlʌki|adj.|幸运的|You are lucky.|你真幸运。
another|əˈnʌðə|əˈnʌðər|pron.|另一个|I want another cup of tea.|我想再来一杯茶。
like|laɪk|laɪk|prep.|像；如同|She looks like her mother.|她长得像她妈妈。
birthday|ˈbɜːθdeɪ|ˈbɜːrθdeɪ|n.|生日|Today is my birthday.|今天是我的生日。
at any time|æt ˈeni taɪm|æt ˈeni taɪm|phr.|随时|You can call me at any time.|你可以随时给我打电话。
British|ˈbrɪtɪʃ|ˈbrɪtɪʃ|adj.|英国的；英国人|She is British.|她是英国人。
German|ˈdʒɜːmən|ˈdʒɜːrmən|adj.|德国的；德国人|He is German.|他是德国人。
plastic|ˈplæstɪk|ˈplæstɪk|adj.|塑料的|This is a plastic bag.|这是一个塑料袋。
leather|ˈleðə|ˈleðər|adj.|皮革的|He has a leather jacket.|他有一件皮夹克。
CD player|ˌsiː ˈdiː ˈpleɪə|ˌsiː ˈdiː ˈpleɪər|n.|CD 播放机|I have a new CD player.|我有一台新的 CD 播放机。
Italian|ɪˈtæliən|ɪˈtæljən|adj.|意大利的；意大利人|She is Italian.|她是意大利人。
Korean|kəˈriːən|kəˈriːən|adj.|韩国的；韩国人|He is Korean.|他是韩国人。
handbag|ˈhændbæɡ|ˈhændbæɡ|n.|手提包|This is my mother's handbag.|这是我妈妈的手提包。
clock|klɒk|klɑːk|n.|钟|The clock is on the wall.|钟挂在墙上。
Swiss|swɪs|swɪs|adj.|瑞士的；瑞士人|This is a Swiss watch.|这是一块瑞士手表。
very much|ˈveri mʌtʃ|ˈveri mʌtʃ|phr.|非常；很|I like it very much.|我非常喜欢它。
love|lʌv|lʌv|v.|爱；热爱|I love my family.|我爱我的家人。
salmon|ˈsæmən|ˈsæmən|n.|三文鱼|I like salmon.|我喜欢三文鱼。
piece|piːs|piːs|n.|一块；一片|I want a piece of cake.|我想要一块蛋糕。
tonight|təˈnaɪt|təˈnaɪt|adv.|今晚|What are you doing tonight?|你今晚做什么？
potato|pəˈteɪtəʊ|pəˈteɪtoʊ|n.|土豆|I like potatoes.|我喜欢土豆。
lettuce|ˈletɪs|ˈletɪs|n.|生菜|I want some lettuce.|我想要一些生菜。
cucumber|ˈkjuːkʌmbə|ˈkjuːkʌmbər|n.|黄瓜|The cucumber is fresh.|这根黄瓜很新鲜。
fantastic|fænˈtæstɪk|fænˈtæstɪk|adj.|极好的；奇妙的|The food is fantastic.|这食物太棒了。
pick|pɪk|pɪk|v.|挑选；采摘|Pick a card.|挑一张卡片。
strawberry|ˈstrɔːbəri|ˈstrɔːberi|n.|草莓|I like strawberries.|我喜欢草莓。
dessert|dɪˈzɜːt|dɪˈzɜːrt|n.|甜点|What is for dessert?|甜点是什么？
healthy|ˈhelθi|ˈhelθi|adj.|健康的；有益健康的|Fruit is healthy.|水果有益健康。
meal|miːl|miːl|n.|一餐；饭|Breakfast is the first meal of the day.|早餐是一天中的第一餐。
worry|ˈwʌri|ˈwɜːri|v.|担心|Don't worry.|别担心。
cream|kriːm|kriːm|n.|奶油|I like cream on my cake.|我喜欢蛋糕上放奶油。
first|fɜːst|fɜːrst|adv.|首先；第一|First, wash your hands.|首先，把手洗干净。
hate|heɪt|heɪt|v.|恨；讨厌|I hate onions.|我讨厌洋葱。
sweet|swiːt|swiːt|adj.|甜的|The cake is sweet.|蛋糕很甜。
wine|waɪn|waɪn|n.|葡萄酒|He has a glass of wine.|他喝了一杯葡萄酒。
weekend|ˌwiːkˈend|ˈwiːkend|n.|周末|I play tennis at the weekend.|我周末打网球。
shopping|ˈʃɒpɪŋ|ˈʃɑːpɪŋ|n.|购物|I go shopping on Saturday.|我星期六去购物。
supermarket|ˈsuːpəmɑːkɪt|ˈsuːpərmɑːrkɪt|n.|超市|We buy food at the supermarket.|我们在超市买食物。
make|meɪk|meɪk|v.|制作；做|My mother makes a cake.|我妈妈做了一个蛋糕。
shopping list|ˈʃɒpɪŋ lɪst|ˈʃɑːpɪŋ lɪst|n.|购物清单|I have a shopping list.|我有一张购物清单。
need|niːd|niːd|v.|需要|I need some bread.|我需要一些面包。
loaf|ləʊf|loʊf|n.|一条面包|I want a loaf of bread.|我想要一条面包。
Sunday|ˈsʌndeɪ|ˈsʌndeɪ|n.|星期日|I play football on Sunday.|我星期天踢足球。
lunch|lʌntʃ|lʌntʃ|n.|午饭|We have lunch at twelve.|我们十二点吃午饭。
boring|ˈbɔːrɪŋ|ˈbɔːrɪŋ|adj.|无聊的|This film is boring.|这部电影很无聊。
ice cream|ˌaɪs ˈkriːm|ˈaɪs kriːm|n.|冰淇淋|I like ice cream.|我喜欢冰淇淋。
nasty|ˈnɑːsti|ˈnæsti|adj.|讨厌的；难吃的|The food is nasty.|这食物很难吃。
anything|ˈeniθɪŋ|ˈeniθɪŋ|pron.|任何东西|Would you like anything to drink?|你想喝点什么吗？
else|els|els|adv.|其他；另外|What else do you need?|你还需要什么？
bar|bɑː|bɑːr|n.|条；块|I want a bar of chocolate.|我想要一块巧克力。
soap|səʊp|soʊp|n.|肥皂|I need a bar of soap.|我需要一块肥皂。
large|lɑːdʒ|lɑːrdʒ|adj.|大的|I want a large pizza.|我想要一个大比萨。
match|mætʃ|mætʃ|n.|比赛|We watch a football match.|我们看一场足球赛。
girlfriend|ˈɡɜːlfrend|ˈɡɜːrlfrend|n.|女朋友|This is his girlfriend.|这是他的女朋友。
self-service|ˌself ˈsɜːvɪs|ˌself ˈsɜːrvɪs|adj.|自助的|This is a self-service restaurant.|这是一家自助餐厅。
menu|ˈmenjuː|ˈmenjuː|n.|菜单|Can I see the menu, please?|请给我看看菜单好吗？
soup|suːp|suːp|n.|汤|I want some soup.|我想喝点汤。
tomato|təˈmɑːtəʊ|təˈmeɪtoʊ|n.|番茄|I like tomato soup.|我喜欢番茄汤。
sauce|sɔːs|sɔːs|n.|酱；调味汁|I like tomato sauce.|我喜欢番茄酱。
dear|dɪə|dɪr|adj.|亲爱的；贵的|Dear Tom, how are you?|亲爱的汤姆，你好吗？
lady|ˈleɪdi|ˈleɪdi|n.|女士；夫人|The lady is my teacher.|这位女士是我的老师。
glove|ɡlʌv|ɡlʌv|n.|手套|I have a pair of gloves.|我有一副手套。
already|ɔːlˈredi|ɔːlˈredi|adv.|已经|I have already finished.|我已经做完了。
jeans|dʒiːnz|dʒiːnz|n.|牛仔裤|He has blue jeans.|他有一条蓝色牛仔裤。
newspaper|ˈnjuːzpeɪpə|ˈnuːzpeɪpər|n.|报纸|My father reads a newspaper.|我爸爸在看报纸。
toothache|ˈtuːθeɪk|ˈtuːθeɪk|n.|牙痛|I have a toothache.|我牙疼。
look|lʊk|lʊk|v.|看起来|You look tired.|你看起来很累。
awful|ˈɔːfl|ˈɔːfl|adj.|糟糕的；可怕的|I feel awful.|我感觉很难受。
dentist|ˈdentɪst|ˈdentɪst|n.|牙医|I go to the dentist.|我去看牙医。
patient|ˈpeɪʃnt|ˈpeɪʃnt|n.|病人|The doctor sees a patient.|医生在看病人。
appointment|əˈpɔɪntmənt|əˈpɔɪntmənt|n.|预约；约会|I have an appointment at ten.|我十点钟有个预约。
emergency|ɪˈmɜːdʒənsi|ɪˈmɜːrdʒənsi|n.|紧急情况|Call 120 in an emergency.|遇到紧急情况请打 120。
today|təˈdeɪ|təˈdeɪ|adv.|今天|What day is it today?|今天星期几？
afternoon|ˌɑːftəˈnuːn|ˌæftərˈnuːn|n.|下午|I play football in the afternoon.|我下午踢足球。
miserable|ˈmɪzrəbl|ˈmɪzrəbl|adj.|痛苦的；难受的|I feel miserable.|我觉得很难受。
feel|fiːl|fiːl|v.|感觉|How do you feel?|你感觉怎么样？
earache|ˈɪəreɪk|ˈɪreɪk|n.|耳痛|I have an earache.|我耳朵疼。
hope|həʊp|hoʊp|v.|希望|I hope you feel better.|我希望你感觉好些。
day|deɪ|deɪ|n.|天；日|What day is it today?|今天是星期几？
Monday|ˈmʌndeɪ|ˈmʌndeɪ|n.|星期一|I have maths on Monday.|我星期一有数学课。
Tuesday|ˈtjuːzdeɪ|ˈtuːzdeɪ|n.|星期二|We have art on Tuesday.|我们星期二上美术课。
Wednesday|ˈwenzdeɪ|ˈwenzdeɪ|n.|星期三|I play tennis on Wednesday.|我星期三打网球。
Thursday|ˈθɜːzdeɪ|ˈθɜːrzdeɪ|n.|星期四|We have music on Thursday.|我们星期四上音乐课。
Friday|ˈfraɪdeɪ|ˈfraɪdeɪ|n.|星期五|Friday is my favourite day.|星期五是我最喜欢的一天。
Saturday|ˈsætədeɪ|ˈsætərdeɪ|n.|星期六|I go shopping on Saturday.|我星期六去购物。
headache|ˈhedeɪk|ˈhedeɪk|n.|头痛|I have a headache.|我头疼。
sick|sɪk|sɪk|adj.|生病的；恶心的|I feel sick.|我觉得恶心。
stomach-ache|ˈstʌmək eɪk|ˈstʌmək eɪk|n.|胃痛|I have a stomach-ache.|我肚子疼。
flu|fluː|fluː|n.|流感|She has the flu.|她得了流感。
cold|kəʊld|koʊld|n.|感冒；寒冷|I have a cold.|我感冒了。
every|ˈevri|ˈevri|adj.|每个；每一|I go to school every day.|我每天去上学。
different|ˈdɪfrənt|ˈdɪfrənt|adj.|不同的|The two bags are different.|这两个包不一样。
weather|ˈweðə|ˈweðər|n.|天气|What is the weather like today?|今天天气怎么样？
mean|miːn|miːn|v.|意思是；意味着|What does this word mean?|这个词是什么意思？
quite|kwaɪt|kwaɪt|adv.|相当；十分|It is quite cold today.|今天相当冷。
ever|ˈevə|ˈevər|adv.|曾经；从来|Have you ever been to London?|你去过伦敦吗？
warm|wɔːm|wɔːrm|adj.|温暖的|It is warm in spring.|春天很暖和。
England|ˈɪŋɡlənd|ˈɪŋɡlənd|n.|英格兰；英国|London is in England.|伦敦在英格兰。
summer|ˈsʌmə|ˈsʌmər|n.|夏天|It is hot in summer.|夏天很热。
sunny|ˈsʌni|ˈsʌni|adj.|阳光充足的|It is a sunny day.|今天是个大晴天。
Atlantic|ətˈlæntɪk|ətˈlæntɪk|n.|大西洋|The Atlantic is a big ocean.|大西洋是一个大洋。
climate|ˈklaɪmət|ˈklaɪmət|n.|气候|The climate here is warm.|这里的气候很温暖。
often|ˈɒfn|ˈɔːfn|adv.|经常|It often rains in England.|英国经常下雨。
rain|reɪn|reɪn|n.|雨|I like the rain.|我喜欢雨。
sometimes|ˈsʌmtaɪmz|ˈsʌmtaɪmz|adv.|有时|Sometimes I walk to school.|有时我走路去上学。
especially|ɪˈspeʃəli|ɪˈspeʃəli|adv.|特别；尤其|I like fruit, especially apples.|我喜欢水果，尤其是苹果。
July|dʒuˈlaɪ|dʒuˈlaɪ|n.|七月|My birthday is in July.|我的生日在七月。
cool|kuːl|kuːl|adj.|凉爽的；酷的|It is cool in autumn.|秋天很凉爽。
difficulty|ˈdɪfɪkəlti|ˈdɪfɪkəlti|n.|困难|He has difficulty with maths.|他学数学有困难。
change|tʃeɪndʒ|tʃeɪndʒ|v.|改变；变化|The weather changes quickly.|天气变化很快。
month|mʌnθ|mʌnθ|n.|月；月份|There are twelve months in a year.|一年有十二个月。
temperature|ˈtemprətʃə|ˈtemprətʃər|n.|温度；气温|The temperature is low today.|今天气温很低。
China|ˈtʃaɪnə|ˈtʃaɪnə|n.|中国|I am from China.|我来自中国。
spring|sprɪŋ|sprɪŋ|n.|春天|Flowers come out in spring.|春天花儿开了。
shine|ʃaɪn|ʃaɪn|v.|照耀；发光|The sun shines.|太阳照耀着。
sun|sʌn|sʌn|n.|太阳|The sun is bright.|太阳很明亮。
cloudy|ˈklaʊdi|ˈklaʊdi|adj.|多云的|It is cloudy today.|今天多云。
season|ˈsiːzn|ˈsiːzn|n.|季节|Spring is my favourite season.|春天是我最喜欢的季节。
usually|ˈjuːʒuəli|ˈjuːʒuəli|adv.|通常|I usually get up at seven.|我通常七点起床。
never|ˈnevə|ˈnevər|adv.|从不；绝不|I never eat meat.|我从不吃肉。
autumn|ˈɔːtəm|ˈɔːtəm|n.|秋天|Leaves fall in autumn.|秋天树叶落下。
winter|ˈwɪntə|ˈwɪntər|n.|冬天|It is cold in winter.|冬天很冷。
snow|snəʊ|snoʊ|n.|雪|There is snow in winter.|冬天有雪。
France|frɑːns|fræns|n.|法国|Paris is in France.|巴黎在法国。
Russia|ˈrʌʃə|ˈrʌʃə|n.|俄罗斯|Russia is a big country.|俄罗斯是一个大国。
Africa|ˈæfrɪkə|ˈæfrɪkə|n.|非洲|Africa is hot.|非洲很热。
windy|ˈwɪndi|ˈwɪndi|adj.|有风的|It is windy today.|今天风很大。
same|seɪm|seɪm|adj.|相同的|We are in the same class.|我们在同一个班。
happy|ˈhæpi|ˈhæpi|adj.|快乐的|Happy birthday!|生日快乐！
return|rɪˈtɜːn|rɪˈtɜːrn|v.|返回；归还|Return the book to me.|把书还给我。
August|ˈɔːɡəst|ˈɔːɡəst|n.|八月|We have a holiday in August.|我们八月放假。
year|jɪə|jɪr|n.|年|There are twelve months in a year.|一年有十二个月。
present|ˈpreznt|ˈpreznt|n.|礼物|This is a present for you.|这是给你的礼物。
bike|baɪk|baɪk|n.|自行车|I ride my bike to school.|我骑自行车去上学。
gear|ɡɪə|ɡɪr|n.|齿轮；装备|The bike has six gears.|这辆自行车有六个挡。
traffic|ˈtræfɪk|ˈtræfɪk|n.|交通；车辆|There is a lot of traffic.|车很多。
dangerous|ˈdeɪndʒərəs|ˈdeɪndʒərəs|adj.|危险的|It is dangerous to play here.|在这里玩很危险。
about|əˈbaʊt|əˈbaʊt|prep.|关于|This book is about animals.|这本书是关于动物的。
safe|seɪf|seɪf|adj.|安全的|It is safe here.|这里很安全。
date|deɪt|deɪt|n.|日期|What is the date today?|今天几号？
question|ˈkwestʃən|ˈkwestʃən|n.|问题|I have a question.|我有一个问题。
ask|ɑːsk|æsk|v.|问；请求|Ask the teacher.|去问老师。
special|ˈspeʃl|ˈspeʃl|adj.|特别的|Today is a special day.|今天是个特别的日子。
January|ˈdʒænjuəri|ˈdʒænjueri|n.|一月|January is cold.|一月很冷。
February|ˈfebruəri|ˈfebrueri|n.|二月|February is the shortest month.|二月是最短的月份。
March|mɑːtʃ|mɑːrtʃ|n.|三月|It is windy in March.|三月风很大。
last|lɑːst|læst|adj.|上一个的；最后的|Last month was very cold.|上个月非常冷。
December|dɪˈsembə|dɪˈsembər|n.|十二月|Christmas is in December.|圣诞节在十二月。
after|ˈɑːftə|ˈæftər|prep.|在……以后|I play football after school.|放学后我踢足球。
before|bɪˈfɔː|bɪˈfɔːr|prep.|在……以前|Wash your hands before dinner.|饭前要洗手。
April|ˈeɪprəl|ˈeɪprəl|n.|四月|It rains a lot in April.|四月雨水多。
May|meɪ|meɪ|n.|五月|May is a warm month.|五月是个温暖的月份。
June|dʒuːn|dʒuːn|n.|六月|Children's Day is in June.|儿童节在六月。
September|sepˈtembə|sepˈtembər|n.|九月|School starts in September.|学校九月开学。
October|ɒkˈtəʊbə|ɑːkˈtoʊbər|n.|十月|National Day is in October.|国庆节在十月。
November|nəʊˈvembə|noʊˈvembər|n.|十一月|It is cold in November.|十一月很冷。
parent|ˈpeərənt|ˈperənt|n.|父亲或母亲；（复）父母|My parents are teachers.|我的父母是老师。
international|ˌɪntəˈnæʃnəl|ˌɪntərˈnæʃnəl|adj.|国际的|It is an international race.|这是一场国际比赛。
event|ɪˈvent|ɪˈvent|n.|比赛项目；事件|The race is a big event.|这场比赛是一件大事。
race|reɪs|reɪs|n.|赛跑；比赛|He wins the race.|他赢得了比赛。
mile|maɪl|maɪl|n.|英里|It is one mile from here.|离这里一英里。
runner|ˈrʌnə|ˈrʌnər|n.|跑步者|He is a good runner.|他是个好跑手。
world|wɜːld|wɜːrld|n.|世界|He is the fastest runner in the world.|他是世界上跑得最快的人。
Australia|ɒˈstreɪliə|ɔːˈstreɪljə|n.|澳大利亚|Sydney is in Australia.|悉尼在澳大利亚。
compete|kəmˈpiːt|kəmˈpiːt|v.|比赛；竞争|He competes in the marathon.|他参加马拉松比赛。
European|ˌjʊərəˈpiːən|ˌjʊrəˈpiːən|adj.|欧洲的；欧洲人|He is a European runner.|他是一名欧洲选手。
impressive|ɪmˈpresɪv|ɪmˈpresɪv|adj.|令人印象深刻的|His time is impressive.|他的成绩令人印象深刻。
rank|ræŋk|ræŋk|v.|排名；列为|He ranks first in the world.|他排名世界第一。
marathon|ˈmærəθən|ˈmærəθɑːn|n.|马拉松|He runs the marathon.|他跑马拉松。
practice|ˈpræktɪs|ˈpræktɪs|v.|练习；训练|I practice every day.|我每天练习。
Moroccan|məˈrɒkən|məˈrɑːkən|adj.|摩洛哥的；摩洛哥人|He is a Moroccan runner.|他是一名摩洛哥选手。
Brazilian|brəˈzɪliən|brəˈzɪljən|adj.|巴西的；巴西人|She is Brazilian.|她是巴西人。
Canadian|kəˈneɪdiən|kəˈneɪdiən|adj.|加拿大的；加拿大人|He is Canadian.|他是加拿大人。
Chinese|ˌtʃaɪˈniːz|ˌtʃaɪˈniːz|adj.|中国的；中文|I speak Chinese.|我说中文。
name|neɪm|neɪm|n.|名字|My name is Lucy.|我的名字叫露西。
New York|ˌnjuː ˈjɔːk|ˌnuː ˈjɔːrk|n.|纽约|New York is a big city.|纽约是一座大城市。
country|ˈkʌntri|ˈkʌntri|n.|国家|China is a big country.|中国是个大国。
Australian|ɒˈstreɪliən|ɔːˈstreɪljən|adj.|澳大利亚的；澳大利亚人|He is Australian.|他是澳大利亚人。
live|lɪv|lɪv|v.|居住；生活|I live in Beijing.|我住在北京。
Sydney|ˈsɪdni|ˈsɪdni|n.|悉尼|Sydney is in Australia.|悉尼在澳大利亚。
language|ˈlæŋɡwɪdʒ|ˈlæŋɡwɪdʒ|n.|语言|English is a language.|英语是一种语言。
Brazil|brəˈzɪl|brəˈzɪl|n.|巴西|Brazil is in South America.|巴西在南美洲。
Sao Paulo|ˌsaʊ ˈpaʊləʊ|ˌsaʊ ˈpaʊloʊ|n.|圣保罗|Sao Paulo is a big city.|圣保罗是一座大城市。
Portuguese|ˌpɔːtʃʊˈɡiːz|ˌpɔːrtʃʊˈɡiːz|adj.|葡萄牙的；葡萄牙语|They speak Portuguese in Brazil.|巴西人说葡萄牙语。
Germany|ˈdʒɜːməni|ˈdʒɜːrməni|n.|德国|Berlin is in Germany.|柏林在德国。
Berlin|bɜːˈlɪn|bɜːrˈlɪn|n.|柏林|Berlin is a big city.|柏林是一座大城市。
Canada|ˈkænədə|ˈkænədə|n.|加拿大|Canada is a big country.|加拿大是个大国。
America|əˈmerɪkə|əˈmerɪkə|n.|美国；美洲|He is from America.|他来自美国。
`.trim()

export const ncej1bWords = RAW.split('\n').map(line => {
  const f = line.split('|')
  if (f.length !== 7) throw new Error(`ncej-1b 行格式错误: ${line}`)
  return f.map(s => s.trim())
})
