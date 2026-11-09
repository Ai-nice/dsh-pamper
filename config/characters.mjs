/**
 * 形象清单与选材规则。
 *
 * 一项 = 一个装进 DSH-pet 的「形象」（pet pack）。
 *  - kind：pet pack 前缀。安装后是 $DSH_HOME/dsh-pet/pet/<kind>-config.json
 *    与 <kind>-animation/*.webm。
 *  - sources：素材来源（aboutme-pets 商店里的动作包）。按顺序找「必需动作」；
 *    essential=false 的包只用来补充随机小动作（例如白龙娘的大动作包 gpt 缺
 *    余额/点击/工作状态，就用 gpt1 的必需动作 + gpt 的丰富小动作）。
 *  - random.categories：优先从这些分类里挑随机小动作（写在前面的优先），
 *    没列到的分类按动作数量从多到少补。
 *  - random.max：随机小动作总数上限（控制项目体积与转换时间）。
 *
 * 想加动作：把动作名写进 random.pick（固定挑选），或把分类名写进
 * random.categories，再跑 node scripts/build.mjs 重新生成。
 */
export const CHARACTERS = [
  {
    kind: 'aboutme-dragon',
    name: '白龙娘',
    // 商店封面；预览页使用
    coverStorePack: 'gpt',
    size: 420,
    display: 'none',
    position: { corner: 'top-left', marginX: 24, marginY: 100 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: true,
    fixedEnabled: true,
    whisperPrompt:
      '你是主人桌面上的Q版白龙娘，白色长发、龙角与龙尾，安静又有点慢热。说话自然随意、短短一句（20字以内），偶尔冒出龙族相关的可爱比喻，说人话不啰嗦，不要解释你自己，不要提你是AI。',
    workStatusTexts: [
      ['正在慢慢想呢……', '让龙龙整理一下思路'],
      ['在动手了哦', '这一步交给我吧'],
      ['这一步处理好了，接着来'],
      ['需要你看一下呢', '等你确认一下~'],
      ['这轮完成啦，尾巴摇摇'],
      ['好像卡住了，再试一次']
    ],
    sources: [
      { pack: 'gpt1', label: '白龙娘·标准动作包（含余额/点击/工作状态）', essential: true },
      { pack: 'gpt', label: '白龙娘·大动作包（丰富小动作）', essential: false }
    ],
    random: {
      max: 18,
      perCategory: 2,
      categories: [
        '情绪反应',
        '龙族特性',
        '手势互动',
        '模仿动物',
        '武术格斗',
        '运动健身',
        '才艺表演',
        '魔法特效',
        '待机',
        '日常起居',
        '吃喝',
        '娱乐休闲',
        '礼仪致意',
        '换装造型',
        '手工节日',
        '时节'
      ]
    }
  },
  {
    kind: 'aboutme-claude',
    name: '橙发书娘',
    coverStorePack: 'claude',
    size: 420,
    display: 'none',
    position: { corner: 'bottom-left', marginX: 24, marginY: 100 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: true,
    fixedEnabled: true,
    whisperPrompt:
      '你是主人桌面上的Q版橙发书娘，喜欢读书、做手工，说话温柔有条理。每次只说短短一句（20字以内），说人话不啰嗦，不要解释你自己，不要提你是AI。',
    workStatusTexts: [
      ['让我先翻翻资料……', '正在理清思路'],
      ['正在做呢，很快好', '这一步在进行了'],
      ['这一页处理完啦', '继续下一步'],
      ['这里想请你确认一下'],
      ['完成啦，可以喝口茶了'],
      ['这里好像出了点问题']
    ],
    sources: [{ pack: 'claude', label: '橙发书娘·标准动作包', essential: true }],
    random: {
      max: 18,
      perCategory: 2,
      categories: [
        '才艺表演',
        '手工节日',
        '玩耍',
        '吃喝',
        '小动作',
        '时节',
        '娱乐休闲',
        '日常起居',
        '模仿动物',
        '魔法特效',
        '换装造型',
        '礼仪致意',
        '情绪反应'
      ]
    }
  },
  {
    kind: 'aboutme-gemini',
    name: '紫发猫耳娘',
    coverStorePack: 'gemini',
    size: 420,
    display: 'none',
    position: { corner: 'bottom-right', marginX: 24, marginY: 100 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: true,
    fixedEnabled: true,
    whisperPrompt:
      '你是主人桌面上的Q版紫发猫耳娘，猫耳和蓬松尾巴，活泼黏人。每次只说短短一句（20字以内），会带一点猫猫语气，说人话不啰嗦，不要解释你自己，不要提你是AI。',
    workStatusTexts: [
      ['让猫猫想想喵……', '正在开动小脑筋'],
      ['爪爪已经在忙啦', '这一步正在做喵'],
      ['这一步搞定，喵！'],
      ['要你确认一下喵~'],
      ['完成啦，伸个懒腰喵'],
      ['呜，这里卡住了喵']
    ],
    sources: [{ pack: 'gemini', label: '紫发猫耳娘·标准动作包', essential: true }],
    random: {
      max: 18,
      perCategory: 2,
      categories: [
        '玩耍',
        '吃喝',
        '才艺表演',
        '娱乐休闲',
        '日常起居',
        '小动作',
        '手工节日',
        '时节',
        '模仿动物',
        '魔法特效',
        '换装造型',
        '礼仪致意',
        '情绪反应'
      ]
    }
  }
];

/**
 * 仅用于预览页的「已有形象」：DSH-pet 自带的蓝毛小女仆（main），
 * 不作为 pet pack 安装（用户本来就有），只在预览页里一起同屏展示。
 */
export const PREVIEW_ONLY_CHARACTERS = [
  {
    kind: 'dsh-pet-main',
    name: '蓝毛小女仆',
    coverStorePack: 'dsh',
    previewOnly: true,
    size: 462,
    whisperPrompt: '你是主人桌面上的Q版蓝发小女仆，温柔乖巧带点俏皮。每次只说一句（20字以内），不要解释你自己。',
    sources: [{ pack: 'dsh', label: 'DSH-pet 内置蓝毛小女仆（101 动作）', essential: true }],
    random: {
      max: 16,
      perCategory: 2,
      categories: [
        '玩耍',
        '吃什么',
        '时节',
        '小动作',
        '文字',
        '工作状态',
        '点击回应',
        '待机',
        '碎碎念'
      ]
    }
  }
];
