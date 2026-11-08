export type PhoneticFamily = 'vowel' | 'consonant'

export interface PhoneticCategory {
  id: string
  family: PhoneticFamily
  title: string
  description: string
}

export interface PhoneticExample {
  word: string
  phonetic: string
  meaning: string
}

export interface Phoneme {
  id: string
  symbol: string
  category: string
  audioSrc: string
  pronunciationTips: string[]
  confusionNote: string
  examples: PhoneticExample[]
}

export const PHONETIC_CATEGORIES: PhoneticCategory[] = [
  {
    "id": "monophthong",
    "family": "vowel",
    "title": "单元音",
    "description": "发音过程中口型和舌位基本保持不变"
  },
  {
    "id": "diphthong",
    "family": "vowel",
    "title": "双元音",
    "description": "从一个元音自然滑向另一个元音"
  },
  {
    "id": "plosive",
    "family": "consonant",
    "title": "爆破音",
    "description": "先阻断气流，再迅速释放"
  },
  {
    "id": "fricative",
    "family": "consonant",
    "title": "摩擦音",
    "description": "气流通过狭窄通道产生摩擦"
  },
  {
    "id": "affricate",
    "family": "consonant",
    "title": "破擦音",
    "description": "由爆破开始，以摩擦结束"
  },
  {
    "id": "sonorant",
    "family": "consonant",
    "title": "鼻音、舌边音与半元音",
    "description": "气流较通畅，声音连续而清晰"
  }
]

export const PHONEMES: Phoneme[] = [
  {
    "id": "long-i",
    "symbol": "/iː/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/long-i.mp3",
    "pronunciationTips": [
      "嘴角向两侧展开，接近微笑。",
      "舌前部抬高，声音拉长且保持稳定。"
    ],
    "confusionNote": "不要读成短促的 /ɪ/，注意保持足够时长。",
    "examples": [
      {
        "word": "see",
        "phonetic": "/siː/",
        "meaning": "看见"
      },
      {
        "word": "green",
        "phonetic": "/ɡriːn/",
        "meaning": "绿色的"
      },
      {
        "word": "teacher",
        "phonetic": "/ˈtiːtʃə/",
        "meaning": "老师"
      }
    ]
  },
  {
    "id": "short-i",
    "symbol": "/ɪ/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/short-i.mp3",
    "pronunciationTips": [
      "嘴唇自然放松，微微张开。",
      "舌前部略抬，发音短促。"
    ],
    "confusionNote": "比 /iː/ 更短、更松，不要把嘴角过度拉开。",
    "examples": [
      {
        "word": "sit",
        "phonetic": "/sɪt/",
        "meaning": "坐"
      },
      {
        "word": "fish",
        "phonetic": "/fɪʃ/",
        "meaning": "鱼"
      },
      {
        "word": "city",
        "phonetic": "/ˈsɪti/",
        "meaning": "城市"
      }
    ]
  },
  {
    "id": "short-e",
    "symbol": "/e/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/short-e.mp3",
    "pronunciationTips": [
      "嘴巴半开，嘴角略向两侧。",
      "舌前部抬起，发音短而清晰。"
    ],
    "confusionNote": "口型比 /æ/ 小，舌位也更高。",
    "examples": [
      {
        "word": "bed",
        "phonetic": "/bed/",
        "meaning": "床"
      },
      {
        "word": "desk",
        "phonetic": "/desk/",
        "meaning": "书桌"
      },
      {
        "word": "head",
        "phonetic": "/hed/",
        "meaning": "头"
      }
    ]
  },
  {
    "id": "short-ae",
    "symbol": "/æ/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/short-ae.mp3",
    "pronunciationTips": [
      "嘴巴张大，嘴角向两侧展开。",
      "舌尖抵近下齿，舌前部位置较低。"
    ],
    "confusionNote": "不要读成汉语“啊”，声音应更靠前。",
    "examples": [
      {
        "word": "cat",
        "phonetic": "/kæt/",
        "meaning": "猫"
      },
      {
        "word": "map",
        "phonetic": "/mæp/",
        "meaning": "地图"
      },
      {
        "word": "happy",
        "phonetic": "/ˈhæpi/",
        "meaning": "快乐的"
      }
    ]
  },
  {
    "id": "long-er",
    "symbol": "/ɜː/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/long-er.mp3",
    "pronunciationTips": [
      "嘴唇放松并略微扁平。",
      "舌身居中，声音从口腔中央持续发出。"
    ],
    "confusionNote": "英式发音中不要额外卷舌或带出明显的 /r/。",
    "examples": [
      {
        "word": "bird",
        "phonetic": "/bɜːd/",
        "meaning": "鸟"
      },
      {
        "word": "word",
        "phonetic": "/wɜːd/",
        "meaning": "单词"
      },
      {
        "word": "learn",
        "phonetic": "/lɜːn/",
        "meaning": "学习"
      }
    ]
  },
  {
    "id": "schwa",
    "symbol": "/ə/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/schwa.mp3",
    "pronunciationTips": [
      "口腔和嘴唇完全放松。",
      "舌身居中，轻而短地带过。"
    ],
    "confusionNote": "常出现在非重读音节，不能发得过重或过长。",
    "examples": [
      {
        "word": "about",
        "phonetic": "/əˈbaʊt/",
        "meaning": "关于"
      },
      {
        "word": "teacher",
        "phonetic": "/ˈtiːtʃə/",
        "meaning": "老师"
      },
      {
        "word": "banana",
        "phonetic": "/bəˈnɑːnə/",
        "meaning": "香蕉"
      }
    ]
  },
  {
    "id": "short-uh",
    "symbol": "/ʌ/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/short-uh.mp3",
    "pronunciationTips": [
      "嘴巴自然半开，嘴唇放松。",
      "舌中部略抬，短促发音。"
    ],
    "confusionNote": "比 /ɑː/ 更短，口型也更小。",
    "examples": [
      {
        "word": "cup",
        "phonetic": "/kʌp/",
        "meaning": "杯子"
      },
      {
        "word": "bus",
        "phonetic": "/bʌs/",
        "meaning": "公共汽车"
      },
      {
        "word": "love",
        "phonetic": "/lʌv/",
        "meaning": "爱"
      }
    ]
  },
  {
    "id": "long-u",
    "symbol": "/uː/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/long-u.mp3",
    "pronunciationTips": [
      "双唇收圆并向前突出。",
      "舌后部抬高，声音持续。"
    ],
    "confusionNote": "不要读成短促的 /ʊ/，同时避免在开头加入 /j/。",
    "examples": [
      {
        "word": "food",
        "phonetic": "/fuːd/",
        "meaning": "食物"
      },
      {
        "word": "blue",
        "phonetic": "/bluː/",
        "meaning": "蓝色的"
      },
      {
        "word": "school",
        "phonetic": "/skuːl/",
        "meaning": "学校"
      }
    ]
  },
  {
    "id": "short-u",
    "symbol": "/ʊ/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/short-u.mp3",
    "pronunciationTips": [
      "双唇略微收圆，不必前突。",
      "舌后部抬起，发音短而放松。"
    ],
    "confusionNote": "比 /uː/ 更短、更松，嘴唇圆度更小。",
    "examples": [
      {
        "word": "book",
        "phonetic": "/bʊk/",
        "meaning": "书"
      },
      {
        "word": "good",
        "phonetic": "/ɡʊd/",
        "meaning": "好的"
      },
      {
        "word": "look",
        "phonetic": "/lʊk/",
        "meaning": "看"
      }
    ]
  },
  {
    "id": "long-aw",
    "symbol": "/ɔː/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/long-aw.mp3",
    "pronunciationTips": [
      "双唇收圆并略向前突出。",
      "舌后部抬起，发音饱满且持续。"
    ],
    "confusionNote": "与 /ɒ/ 相比时长更长，嘴唇也更圆。",
    "examples": [
      {
        "word": "door",
        "phonetic": "/dɔː/",
        "meaning": "门"
      },
      {
        "word": "talk",
        "phonetic": "/tɔːk/",
        "meaning": "谈话"
      },
      {
        "word": "small",
        "phonetic": "/smɔːl/",
        "meaning": "小的"
      }
    ]
  },
  {
    "id": "short-o",
    "symbol": "/ɒ/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/short-o.mp3",
    "pronunciationTips": [
      "嘴巴张开，双唇稍圆。",
      "舌后部位置较低，快速发音。"
    ],
    "confusionNote": "不要拉长成 /ɔː/，也不要读成汉语“奥”。",
    "examples": [
      {
        "word": "hot",
        "phonetic": "/hɒt/",
        "meaning": "热的"
      },
      {
        "word": "box",
        "phonetic": "/bɒks/",
        "meaning": "盒子"
      },
      {
        "word": "clock",
        "phonetic": "/klɒk/",
        "meaning": "时钟"
      }
    ]
  },
  {
    "id": "long-a",
    "symbol": "/ɑː/",
    "category": "monophthong",
    "audioSrc": "/sound/phonetics/long-a.mp3",
    "pronunciationTips": [
      "嘴巴充分张开，嘴唇自然。",
      "舌位低而靠后，声音拉长。"
    ],
    "confusionNote": "声音应从口腔后部发出，不要混成短音 /ʌ/。",
    "examples": [
      {
        "word": "car",
        "phonetic": "/kɑː/",
        "meaning": "汽车"
      },
      {
        "word": "park",
        "phonetic": "/pɑːk/",
        "meaning": "公园"
      },
      {
        "word": "father",
        "phonetic": "/ˈfɑːðə/",
        "meaning": "父亲"
      }
    ]
  },
  {
    "id": "diphthong-ei",
    "symbol": "/eɪ/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-ei.mp3",
    "pronunciationTips": [
      "从 /e/ 开始，嘴巴半开。",
      "舌位向 /ɪ/ 滑动，前重后轻。"
    ],
    "confusionNote": "必须有连续滑动，不要拆成两个独立音节。",
    "examples": [
      {
        "word": "day",
        "phonetic": "/deɪ/",
        "meaning": "一天"
      },
      {
        "word": "name",
        "phonetic": "/neɪm/",
        "meaning": "名字"
      },
      {
        "word": "eight",
        "phonetic": "/eɪt/",
        "meaning": "八"
      }
    ]
  },
  {
    "id": "diphthong-ai",
    "symbol": "/aɪ/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-ai.mp3",
    "pronunciationTips": [
      "从开口较大的 /a/ 开始。",
      "嘴角逐渐展开，滑向 /ɪ/。"
    ],
    "confusionNote": "起始音要饱满，结尾短而轻。",
    "examples": [
      {
        "word": "time",
        "phonetic": "/taɪm/",
        "meaning": "时间"
      },
      {
        "word": "five",
        "phonetic": "/faɪv/",
        "meaning": "五"
      },
      {
        "word": "light",
        "phonetic": "/laɪt/",
        "meaning": "光"
      }
    ]
  },
  {
    "id": "diphthong-oi",
    "symbol": "/ɔɪ/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-oi.mp3",
    "pronunciationTips": [
      "从圆唇的 /ɔ/ 开始。",
      "嘴角向两侧展开并滑向 /ɪ/。"
    ],
    "confusionNote": "保持一个音节，避免把两个部分割裂。",
    "examples": [
      {
        "word": "boy",
        "phonetic": "/bɔɪ/",
        "meaning": "男孩"
      },
      {
        "word": "voice",
        "phonetic": "/vɔɪs/",
        "meaning": "声音"
      },
      {
        "word": "toy",
        "phonetic": "/tɔɪ/",
        "meaning": "玩具"
      }
    ]
  },
  {
    "id": "diphthong-oh",
    "symbol": "/əʊ/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-oh.mp3",
    "pronunciationTips": [
      "从放松的 /ə/ 开始。",
      "双唇逐渐收圆，滑向 /ʊ/。"
    ],
    "confusionNote": "英式起点较轻，不要直接发成一个长 /o/。",
    "examples": [
      {
        "word": "go",
        "phonetic": "/ɡəʊ/",
        "meaning": "去"
      },
      {
        "word": "home",
        "phonetic": "/həʊm/",
        "meaning": "家"
      },
      {
        "word": "road",
        "phonetic": "/rəʊd/",
        "meaning": "道路"
      }
    ]
  },
  {
    "id": "diphthong-au",
    "symbol": "/aʊ/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-au.mp3",
    "pronunciationTips": [
      "从开口较大的 /a/ 开始。",
      "双唇逐渐收圆，滑向 /ʊ/。"
    ],
    "confusionNote": "结尾不要额外加辅音 /w/。",
    "examples": [
      {
        "word": "now",
        "phonetic": "/naʊ/",
        "meaning": "现在"
      },
      {
        "word": "house",
        "phonetic": "/haʊs/",
        "meaning": "房子"
      },
      {
        "word": "out",
        "phonetic": "/aʊt/",
        "meaning": "向外"
      }
    ]
  },
  {
    "id": "diphthong-ia",
    "symbol": "/ɪə/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-ia.mp3",
    "pronunciationTips": [
      "从短促的 /ɪ/ 开始。",
      "口型逐渐放松，滑向 /ə/。"
    ],
    "confusionNote": "英式发音结尾不卷舌，不要加出明显的 /r/。",
    "examples": [
      {
        "word": "ear",
        "phonetic": "/ɪə/",
        "meaning": "耳朵"
      },
      {
        "word": "near",
        "phonetic": "/nɪə/",
        "meaning": "附近"
      },
      {
        "word": "here",
        "phonetic": "/hɪə/",
        "meaning": "这里"
      }
    ]
  },
  {
    "id": "diphthong-ea",
    "symbol": "/eə/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-ea.mp3",
    "pronunciationTips": [
      "从 /e/ 开始，嘴巴半开。",
      "口型放松并滑向 /ə/。"
    ],
    "confusionNote": "与 /ɪə/ 的起始舌位不同，结尾同样不要卷舌。",
    "examples": [
      {
        "word": "air",
        "phonetic": "/eə/",
        "meaning": "空气"
      },
      {
        "word": "care",
        "phonetic": "/keə/",
        "meaning": "关心"
      },
      {
        "word": "chair",
        "phonetic": "/tʃeə/",
        "meaning": "椅子"
      }
    ]
  },
  {
    "id": "diphthong-ua",
    "symbol": "/ʊə/",
    "category": "diphthong",
    "audioSrc": "/sound/phonetics/diphthong-ua.mp3",
    "pronunciationTips": [
      "从略圆唇的 /ʊ/ 开始。",
      "双唇逐渐放松，滑向 /ə/。"
    ],
    "confusionNote": "现代英式口语中部分词会并入 /ɔː/，这里保留传统教学读法。",
    "examples": [
      {
        "word": "tour",
        "phonetic": "/tʊə/",
        "meaning": "旅行"
      },
      {
        "word": "pure",
        "phonetic": "/pjʊə/",
        "meaning": "纯净的"
      },
      {
        "word": "cure",
        "phonetic": "/kjʊə/",
        "meaning": "治愈"
      }
    ]
  },
  {
    "id": "p",
    "symbol": "/p/",
    "category": "plosive",
    "audioSrc": "/sound/phonetics/p.mp3",
    "pronunciationTips": [
      "双唇闭合阻断气流，再突然张开。",
      "声带不振动，词首通常有明显送气。"
    ],
    "confusionNote": "与 /b/ 的关键区别是 /p/ 不振动声带。",
    "examples": [
      {
        "word": "pen",
        "phonetic": "/pen/",
        "meaning": "钢笔"
      },
      {
        "word": "map",
        "phonetic": "/mæp/",
        "meaning": "地图"
      },
      {
        "word": "happy",
        "phonetic": "/ˈhæpi/",
        "meaning": "快乐的"
      }
    ]
  },
  {
    "id": "b",
    "symbol": "/b/",
    "category": "plosive",
    "audioSrc": "/sound/phonetics/b.mp3",
    "pronunciationTips": [
      "双唇闭合后快速释放气流。",
      "发音时声带振动，送气较弱。"
    ],
    "confusionNote": "用手触摸喉部，可感受与 /p/ 不同的振动。",
    "examples": [
      {
        "word": "book",
        "phonetic": "/bʊk/",
        "meaning": "书"
      },
      {
        "word": "baby",
        "phonetic": "/ˈbeɪbi/",
        "meaning": "婴儿"
      },
      {
        "word": "job",
        "phonetic": "/dʒɒb/",
        "meaning": "工作"
      }
    ]
  },
  {
    "id": "t",
    "symbol": "/t/",
    "category": "plosive",
    "audioSrc": "/sound/phonetics/t.mp3",
    "pronunciationTips": [
      "舌尖抵住上齿龈，阻断后释放气流。",
      "声带不振动，词首通常送气。"
    ],
    "confusionNote": "不要把舌尖抵在牙齿背面发成汉语式的“特”。",
    "examples": [
      {
        "word": "tea",
        "phonetic": "/tiː/",
        "meaning": "茶"
      },
      {
        "word": "table",
        "phonetic": "/ˈteɪbl/",
        "meaning": "桌子"
      },
      {
        "word": "cat",
        "phonetic": "/kæt/",
        "meaning": "猫"
      }
    ]
  },
  {
    "id": "d",
    "symbol": "/d/",
    "category": "plosive",
    "audioSrc": "/sound/phonetics/d.mp3",
    "pronunciationTips": [
      "舌尖抵住上齿龈后迅速放开。",
      "发音时声带振动，送气较弱。"
    ],
    "confusionNote": "发音位置与 /t/ 相同，区别主要在声带振动。",
    "examples": [
      {
        "word": "dog",
        "phonetic": "/dɒɡ/",
        "meaning": "狗"
      },
      {
        "word": "day",
        "phonetic": "/deɪ/",
        "meaning": "一天"
      },
      {
        "word": "red",
        "phonetic": "/red/",
        "meaning": "红色的"
      }
    ]
  },
  {
    "id": "k",
    "symbol": "/k/",
    "category": "plosive",
    "audioSrc": "/sound/phonetics/k.mp3",
    "pronunciationTips": [
      "舌后部抵住软腭，再突然释放。",
      "声带不振动，词首通常送气。"
    ],
    "confusionNote": "不要在音尾额外加入元音，避免读成“克”。",
    "examples": [
      {
        "word": "key",
        "phonetic": "/kiː/",
        "meaning": "钥匙"
      },
      {
        "word": "cat",
        "phonetic": "/kæt/",
        "meaning": "猫"
      },
      {
        "word": "back",
        "phonetic": "/bæk/",
        "meaning": "后面"
      }
    ]
  },
  {
    "id": "g",
    "symbol": "/ɡ/",
    "category": "plosive",
    "audioSrc": "/sound/phonetics/g.mp3",
    "pronunciationTips": [
      "舌后部抵住软腭后释放气流。",
      "发音时声带振动。"
    ],
    "confusionNote": "位置与 /k/ 相同，但 /ɡ/ 有声且送气更弱。",
    "examples": [
      {
        "word": "go",
        "phonetic": "/ɡəʊ/",
        "meaning": "去"
      },
      {
        "word": "game",
        "phonetic": "/ɡeɪm/",
        "meaning": "游戏"
      },
      {
        "word": "big",
        "phonetic": "/bɪɡ/",
        "meaning": "大的"
      }
    ]
  },
  {
    "id": "f",
    "symbol": "/f/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/f.mp3",
    "pronunciationTips": [
      "上齿轻触下唇。",
      "气流从缝隙摩擦而出，声带不振动。"
    ],
    "confusionNote": "不要用双唇相碰，避免发成 /p/。",
    "examples": [
      {
        "word": "fish",
        "phonetic": "/fɪʃ/",
        "meaning": "鱼"
      },
      {
        "word": "five",
        "phonetic": "/faɪv/",
        "meaning": "五"
      },
      {
        "word": "leaf",
        "phonetic": "/liːf/",
        "meaning": "叶子"
      }
    ]
  },
  {
    "id": "v",
    "symbol": "/v/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/v.mp3",
    "pronunciationTips": [
      "上齿轻触下唇。",
      "保持摩擦并让声带振动。"
    ],
    "confusionNote": "不要读成 /w/；/v/ 必须有齿唇接触和摩擦。",
    "examples": [
      {
        "word": "very",
        "phonetic": "/ˈveri/",
        "meaning": "非常"
      },
      {
        "word": "voice",
        "phonetic": "/vɔɪs/",
        "meaning": "声音"
      },
      {
        "word": "love",
        "phonetic": "/lʌv/",
        "meaning": "爱"
      }
    ]
  },
  {
    "id": "voiceless-th",
    "symbol": "/θ/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/voiceless-th.mp3",
    "pronunciationTips": [
      "舌尖轻放在上下齿之间。",
      "让气流从舌齿间摩擦而出，声带不振动。"
    ],
    "confusionNote": "不要替换成 /s/ 或 /f/，要能看见少量舌尖。",
    "examples": [
      {
        "word": "think",
        "phonetic": "/θɪŋk/",
        "meaning": "思考"
      },
      {
        "word": "three",
        "phonetic": "/θriː/",
        "meaning": "三"
      },
      {
        "word": "mouth",
        "phonetic": "/maʊθ/",
        "meaning": "嘴"
      }
    ]
  },
  {
    "id": "voiced-th",
    "symbol": "/ð/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/voiced-th.mp3",
    "pronunciationTips": [
      "舌尖轻放在上下齿之间。",
      "保持轻微摩擦，同时振动声带。"
    ],
    "confusionNote": "位置与 /θ/ 相同，但 /ð/ 有声；不要读成 /z/。",
    "examples": [
      {
        "word": "this",
        "phonetic": "/ðɪs/",
        "meaning": "这个"
      },
      {
        "word": "they",
        "phonetic": "/ðeɪ/",
        "meaning": "他们"
      },
      {
        "word": "mother",
        "phonetic": "/ˈmʌðə/",
        "meaning": "母亲"
      }
    ]
  },
  {
    "id": "s",
    "symbol": "/s/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/s.mp3",
    "pronunciationTips": [
      "舌尖靠近上齿龈但不接触。",
      "气流从舌面中央摩擦而出，声带不振动。"
    ],
    "confusionNote": "与 /z/ 的口型相同，区别在于声带是否振动。",
    "examples": [
      {
        "word": "sun",
        "phonetic": "/sʌn/",
        "meaning": "太阳"
      },
      {
        "word": "city",
        "phonetic": "/ˈsɪti/",
        "meaning": "城市"
      },
      {
        "word": "bus",
        "phonetic": "/bʌs/",
        "meaning": "公共汽车"
      }
    ]
  },
  {
    "id": "z",
    "symbol": "/z/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/z.mp3",
    "pronunciationTips": [
      "舌尖靠近上齿龈。",
      "保持气流摩擦，同时振动声带。"
    ],
    "confusionNote": "不要读成汉语拼音 z；这是连续的有声摩擦音。",
    "examples": [
      {
        "word": "zoo",
        "phonetic": "/zuː/",
        "meaning": "动物园"
      },
      {
        "word": "zero",
        "phonetic": "/ˈzɪərəʊ/",
        "meaning": "零"
      },
      {
        "word": "nose",
        "phonetic": "/nəʊz/",
        "meaning": "鼻子"
      }
    ]
  },
  {
    "id": "sh",
    "symbol": "/ʃ/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/sh.mp3",
    "pronunciationTips": [
      "舌前部抬向硬腭，舌尖稍后缩。",
      "双唇略向前，声带不振动。"
    ],
    "confusionNote": "发音位置比 /s/ 更靠后，气流声音更厚。",
    "examples": [
      {
        "word": "she",
        "phonetic": "/ʃiː/",
        "meaning": "她"
      },
      {
        "word": "shop",
        "phonetic": "/ʃɒp/",
        "meaning": "商店"
      },
      {
        "word": "fish",
        "phonetic": "/fɪʃ/",
        "meaning": "鱼"
      }
    ]
  },
  {
    "id": "zh",
    "symbol": "/ʒ/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/zh.mp3",
    "pronunciationTips": [
      "舌位与 /ʃ/ 相同。",
      "保持摩擦并振动声带。"
    ],
    "confusionNote": "不要发成破擦音 /dʒ/，气流应连续。",
    "examples": [
      {
        "word": "vision",
        "phonetic": "/ˈvɪʒn/",
        "meaning": "视力"
      },
      {
        "word": "usual",
        "phonetic": "/ˈjuːʒuəl/",
        "meaning": "通常的"
      },
      {
        "word": "measure",
        "phonetic": "/ˈmeʒə/",
        "meaning": "测量"
      }
    ]
  },
  {
    "id": "h",
    "symbol": "/h/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/h.mp3",
    "pronunciationTips": [
      "口型随后的元音自然变化。",
      "声门打开，让气流轻轻呼出，声带不振动。"
    ],
    "confusionNote": "不要把声音压在喉咙里，也不要完全省略气流。",
    "examples": [
      {
        "word": "hat",
        "phonetic": "/hæt/",
        "meaning": "帽子"
      },
      {
        "word": "home",
        "phonetic": "/həʊm/",
        "meaning": "家"
      },
      {
        "word": "behind",
        "phonetic": "/bɪˈhaɪnd/",
        "meaning": "在后面"
      }
    ]
  },
  {
    "id": "r",
    "symbol": "/r/",
    "category": "fricative",
    "audioSrc": "/sound/phonetics/r.mp3",
    "pronunciationTips": [
      "舌尖向后抬起，但不要碰到上颚。",
      "双唇略圆，声带振动。"
    ],
    "confusionNote": "英式非卷舌口音中，词尾无后接元音时通常不发 /r/。",
    "examples": [
      {
        "word": "red",
        "phonetic": "/red/",
        "meaning": "红色的"
      },
      {
        "word": "right",
        "phonetic": "/raɪt/",
        "meaning": "正确的"
      },
      {
        "word": "around",
        "phonetic": "/əˈraʊnd/",
        "meaning": "围绕"
      }
    ]
  },
  {
    "id": "ch",
    "symbol": "/tʃ/",
    "category": "affricate",
    "audioSrc": "/sound/phonetics/ch.mp3",
    "pronunciationTips": [
      "舌前部先抵住上齿龈后方。",
      "先阻断再摩擦释放，声带不振动。"
    ],
    "confusionNote": "要保持一个完整辅音，不要拆成 /t/ 和 /ʃ/ 两拍。",
    "examples": [
      {
        "word": "chair",
        "phonetic": "/tʃeə/",
        "meaning": "椅子"
      },
      {
        "word": "child",
        "phonetic": "/tʃaɪld/",
        "meaning": "孩子"
      },
      {
        "word": "watch",
        "phonetic": "/wɒtʃ/",
        "meaning": "观看"
      }
    ]
  },
  {
    "id": "j",
    "symbol": "/dʒ/",
    "category": "affricate",
    "audioSrc": "/sound/phonetics/j.mp3",
    "pronunciationTips": [
      "舌位与 /tʃ/ 相同。",
      "先阻断再摩擦释放，同时振动声带。"
    ],
    "confusionNote": "不要读成单纯的 /ʒ/，开头应有短暂阻塞。",
    "examples": [
      {
        "word": "job",
        "phonetic": "/dʒɒb/",
        "meaning": "工作"
      },
      {
        "word": "June",
        "phonetic": "/dʒuːn/",
        "meaning": "六月"
      },
      {
        "word": "bridge",
        "phonetic": "/brɪdʒ/",
        "meaning": "桥"
      }
    ]
  },
  {
    "id": "tr",
    "symbol": "/tr/",
    "category": "affricate",
    "audioSrc": "/sound/phonetics/tr.mp3",
    "pronunciationTips": [
      "舌尖先接近上齿龈后方。",
      "释放时迅速过渡到 /r/，声带不振动。"
    ],
    "confusionNote": "国内 48 音标教学将其作为组合音学习，实际拼读仍要保持连贯。",
    "examples": [
      {
        "word": "tree",
        "phonetic": "/triː/",
        "meaning": "树"
      },
      {
        "word": "train",
        "phonetic": "/treɪn/",
        "meaning": "火车"
      },
      {
        "word": "try",
        "phonetic": "/traɪ/",
        "meaning": "尝试"
      }
    ]
  },
  {
    "id": "dr",
    "symbol": "/dr/",
    "category": "affricate",
    "audioSrc": "/sound/phonetics/dr.mp3",
    "pronunciationTips": [
      "舌尖先形成短暂阻塞。",
      "释放后立即过渡到有声的 /r/。"
    ],
    "confusionNote": "与 /tr/ 相比声带振动，两个部分不要分开。",
    "examples": [
      {
        "word": "draw",
        "phonetic": "/drɔː/",
        "meaning": "画"
      },
      {
        "word": "dream",
        "phonetic": "/driːm/",
        "meaning": "梦想"
      },
      {
        "word": "drink",
        "phonetic": "/drɪŋk/",
        "meaning": "喝"
      }
    ]
  },
  {
    "id": "ts",
    "symbol": "/ts/",
    "category": "affricate",
    "audioSrc": "/sound/phonetics/ts.mp3",
    "pronunciationTips": [
      "舌尖先完成 /t/ 的阻塞。",
      "释放时直接进入 /s/ 的摩擦。"
    ],
    "confusionNote": "常出现在词尾，要连贯发出且不要额外加元音。",
    "examples": [
      {
        "word": "cats",
        "phonetic": "/kæts/",
        "meaning": "猫（复数）"
      },
      {
        "word": "hats",
        "phonetic": "/hæts/",
        "meaning": "帽子（复数）"
      },
      {
        "word": "sports",
        "phonetic": "/spɔːts/",
        "meaning": "体育运动"
      }
    ]
  },
  {
    "id": "dz",
    "symbol": "/dz/",
    "category": "affricate",
    "audioSrc": "/sound/phonetics/dz.mp3",
    "pronunciationTips": [
      "舌尖先完成 /d/ 的阻塞。",
      "释放时直接进入有声的 /z/。"
    ],
    "confusionNote": "常见于词尾复数或第三人称形式，声带应持续振动。",
    "examples": [
      {
        "word": "beds",
        "phonetic": "/bedz/",
        "meaning": "床（复数）"
      },
      {
        "word": "hands",
        "phonetic": "/hændz/",
        "meaning": "手（复数）"
      },
      {
        "word": "roads",
        "phonetic": "/rəʊdz/",
        "meaning": "道路（复数）"
      }
    ]
  },
  {
    "id": "m",
    "symbol": "/m/",
    "category": "sonorant",
    "audioSrc": "/sound/phonetics/m.mp3",
    "pronunciationTips": [
      "双唇闭合，软腭下降。",
      "气流从鼻腔通过，声带振动。"
    ],
    "confusionNote": "发音可持续，词尾不要额外加元音。",
    "examples": [
      {
        "word": "man",
        "phonetic": "/mæn/",
        "meaning": "男人"
      },
      {
        "word": "milk",
        "phonetic": "/mɪlk/",
        "meaning": "牛奶"
      },
      {
        "word": "room",
        "phonetic": "/ruːm/",
        "meaning": "房间"
      }
    ]
  },
  {
    "id": "n",
    "symbol": "/n/",
    "category": "sonorant",
    "audioSrc": "/sound/phonetics/n.mp3",
    "pronunciationTips": [
      "舌尖抵住上齿龈，软腭下降。",
      "气流从鼻腔通过，声带振动。"
    ],
    "confusionNote": "与 /ŋ/ 相比发音位置更靠前。",
    "examples": [
      {
        "word": "name",
        "phonetic": "/neɪm/",
        "meaning": "名字"
      },
      {
        "word": "nine",
        "phonetic": "/naɪn/",
        "meaning": "九"
      },
      {
        "word": "sun",
        "phonetic": "/sʌn/",
        "meaning": "太阳"
      }
    ]
  },
  {
    "id": "ng",
    "symbol": "/ŋ/",
    "category": "sonorant",
    "audioSrc": "/sound/phonetics/ng.mp3",
    "pronunciationTips": [
      "舌后部抵住软腭，舌尖放松。",
      "气流从鼻腔通过，声带振动。"
    ],
    "confusionNote": "不要先发 /n/ 再额外加 /ɡ/；在 sing 中没有独立 /ɡ/。",
    "examples": [
      {
        "word": "sing",
        "phonetic": "/sɪŋ/",
        "meaning": "唱歌"
      },
      {
        "word": "long",
        "phonetic": "/lɒŋ/",
        "meaning": "长的"
      },
      {
        "word": "English",
        "phonetic": "/ˈɪŋɡlɪʃ/",
        "meaning": "英语"
      }
    ]
  },
  {
    "id": "l",
    "symbol": "/l/",
    "category": "sonorant",
    "audioSrc": "/sound/phonetics/l.mp3",
    "pronunciationTips": [
      "舌尖抵住上齿龈。",
      "气流从舌头两侧通过，声带振动。"
    ],
    "confusionNote": "词首通常较清晰；词尾的“暗 l”舌后部还会抬起。",
    "examples": [
      {
        "word": "light",
        "phonetic": "/laɪt/",
        "meaning": "光"
      },
      {
        "word": "look",
        "phonetic": "/lʊk/",
        "meaning": "看"
      },
      {
        "word": "feel",
        "phonetic": "/fiːl/",
        "meaning": "感觉"
      }
    ]
  },
  {
    "id": "w",
    "symbol": "/w/",
    "category": "sonorant",
    "audioSrc": "/sound/phonetics/w.mp3",
    "pronunciationTips": [
      "双唇收圆并向前突出。",
      "舌后部抬起，迅速滑向后面的元音。"
    ],
    "confusionNote": "不要读成 /v/；发 /w/ 时上齿不接触下唇。",
    "examples": [
      {
        "word": "we",
        "phonetic": "/wiː/",
        "meaning": "我们"
      },
      {
        "word": "water",
        "phonetic": "/ˈwɔːtə/",
        "meaning": "水"
      },
      {
        "word": "away",
        "phonetic": "/əˈweɪ/",
        "meaning": "离开"
      }
    ]
  },
  {
    "id": "y",
    "symbol": "/j/",
    "category": "sonorant",
    "audioSrc": "/sound/phonetics/y.mp3",
    "pronunciationTips": [
      "舌前部抬向硬腭但不接触。",
      "迅速滑向后面的元音，声带振动。"
    ],
    "confusionNote": "它是辅音滑音，不是字母 j 常对应的 /dʒ/。",
    "examples": [
      {
        "word": "yes",
        "phonetic": "/jes/",
        "meaning": "是"
      },
      {
        "word": "year",
        "phonetic": "/jɪə/",
        "meaning": "年"
      },
      {
        "word": "use",
        "phonetic": "/juːz/",
        "meaning": "使用"
      }
    ]
  }
]