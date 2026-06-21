/**
 * 偶像养成事务所 — 全部数值规则集中配置
 * 调整平衡性时只需修改此文件
 */
export const GAME_CONFIG = {
  // ── 胜利 / 失败条件 ──
  victory: {
    targetGroups: 3,        // 需培养出道组合数
    totalDays: 1095,        // 3 年（天）
    requirePositiveProfit: true,
  },

  // ── 初始资源 ──
  initial: {
    money: 80000,
    fans: 200,
    traineeCount: 5,
    statMin: 18,
    statMax: 42,
    fatigue: 10,
    stress: 8,
  },

  // ── 五维属性键名 ──
  stats: ['vocal', 'dance', 'rap', 'looks', 'charm'],
  statLabels: {
    vocal: '唱功',
    dance: '舞蹈',
    rap: '说唱',
    looks: '颜值',
    charm: '魅力',
  },

  // ── 日程活动 ──
  activities: {
    vocal: {
      label: '声乐课',
      icon: '🎤',
      statGain: { vocal: [4, 7] },
      fatigue: [10, 14],
      stress: [2, 4],
      moneyCost: 400,
      requiresTraining: true,
    },
    dance: {
      label: '舞蹈课',
      icon: '💃',
      statGain: { dance: [4, 7] },
      fatigue: [12, 16],
      stress: [2, 4],
      moneyCost: 400,
      requiresTraining: true,
    },
    rap: {
      label: '说唱课',
      icon: '🎧',
      statGain: { rap: [4, 7] },
      fatigue: [10, 14],
      stress: [3, 5],
      moneyCost: 400,
      requiresTraining: true,
    },
    physical: {
      label: '体能训练',
      icon: '🏋️',
      statGain: { dance: [1, 3], looks: [0, 1] },
      fatigue: [6, 10],
      stress: [-2, 0],
      moneyCost: 250,
      requiresTraining: true,
    },
    rest: {
      label: '休息',
      icon: '😴',
      statGain: {},
      fatigue: [-28, -18],
      stress: [-10, -5],
      moneyCost: 0,
      requiresTraining: false,
    },
    pr: {
      label: '公关活动',
      icon: '📸',
      statGain: { charm: [2, 4], looks: [1, 3] },
      fatigue: [5, 8],
      stress: [6, 14],
      fansGain: [80, 250],
      moneyCost: 1200,
      requiresTraining: false,
    },
  },

  // ── 疲劳 / 压力阈值 ──
  thresholds: {
    fatigueExhausted: 75,   // 训练效果减半
    fatigueCollapse: 92,    // 强制休息
    stressHigh: 65,         // 训练效果 -20%
    stressBreakdown: 88,    // 当天无法训练
    statCap: 100,
  },

  // ── 每日运营成本 ──
  dailyCosts: {
    baseOperatingCost: 600,
    perTraineeCost: 250,
    perDebutedCost: 800,
    perGroupCost: 500,
  },

  // ── 周末内部评级 ──
  rating: {
    interval: 7,
    debutScoreThreshold: 58,  // 综合评分达标可出道
    minGroupSize: 2,
    maxGroupSize: 5,
    scoreWeights: {
      vocal: 0.22,
      dance: 0.22,
      rap: 0.16,
      looks: 0.2,
      charm: 0.2,
    },
  },

  // ── 单曲发行 ──
  single: {
    creationCost: 15000,
    baseSales: 800,
    statWeight: 0.45,
    fansWeight: 0.35,
    charmWeight: 0.2,
    revenuePerSale: 6,
    cooldownDays: 30,
  },

  // ── 练习生关系 ──
  relationships: {
    min: -100,
    max: 100,
    synergyThreshold: 55,       // 默契线
    competitionThreshold: -35,    // 竞争线
    synergyBonus: 0.25,           // 默契训练加成
    competitionStress: [12, 22],
    dailyDrift: [-3, 3],
    trainingTogether: [4, 9],
    statGapCompetition: 18,
    initialRange: [-15, 25],
  },

  // ── 随机事件 ──
  events: {
    dailyChance: 0.18,
    types: {
      negative_news: {
        label: '负面新闻',
        weight: 22,
        fansLoss: [150, 600],
        stressGain: [8, 18],
        description: '媒体曝出练习生训练期间发生冲突，粉丝舆论下滑。',
      },
      poaching: {
        label: '挖角危机',
        weight: 14,
        successChance: 0.28,
        description: '竞争对手试图挖走你旗下最有潜力的练习生！',
      },
      illness: {
        label: '生病',
        weight: 20,
        duration: [2, 4],
        statDecay: [1, 3],
        stressGain: [5, 10],
        description: '一名练习生身体不适，需要休养。',
      },
      inspiration: {
        label: '灵感爆发',
        weight: 22,
        statBoost: [6, 14],
        description: '一名练习生突然迸发出创作灵感，能力大幅提升！',
      },
      fan_surge: {
        label: '粉丝暴涨',
        weight: 22,
        fansGain: [300, 900],
        description: '一段练习室花絮意外走红，粉丝数激增！',
      },
    },
  },

  // ── 练习生名字池 ──
  names: [
    '林星遥', '苏晚晴', '陈予安', '顾念初', '沈知夏',
    '江月白', '陆清欢', '唐小满', '许未央', '韩鹿鸣',
    '方念慈', '宋时雨', '叶知秋', '周慕青', '赵星河',
  ],

  // ── 口碑系统 ──
  reputation: {
    initial: 50,
    min: 0,
    max: 100,
    excellentThreshold: 80,
    goodThreshold: 60,
    poorThreshold: 30,
    crisisThreshold: 15,
    dailyRecovery: 0.3,
  },

  // ── 危机公关剧本库 ──
  crisis: {
    dailyChance: 0.12,
    minReputationForCrisis: 40,
    followUpDays: [3, 7],

    scripts: {
      dating_scandal: {
        id: 'dating_scandal',
        title: '恋情曝光',
        icon: '💔',
        severity: 'high',
        description: '旗下练习生被拍到与异性深夜约会，粉丝议论纷纷，大量粉丝表示失望。',
        baseReputationHit: [15, 25],
        baseFansLoss: [300, 800],
        involveTarget: true,
        strategies: [
          {
            id: 'admit',
            name: '公开道歉',
            description: '承认恋情并向粉丝道歉，承诺专注事业',
            icon: '🙇',
            cost: 0,
            effects: {
              reputation: [-5, 5],
              fans: [-200, 100],
              targetStress: [10, 20],
              successChance: 0.6,
              successBonus: { reputation: [5, 10], fans: [100, 200] },
              failurePenalty: { reputation: [-10, -5], fans: [-300, -100] },
            },
            followUp: 'monitor_fans',
          },
          {
            id: 'deny',
            name: '坚决否认',
            description: '发布声明否认恋情，称是朋友聚会',
            icon: '❌',
            cost: 5000,
            effects: {
              reputation: [-10, 0],
              fans: [-400, -100],
              targetStress: [5, 15],
              successChance: 0.45,
              successBonus: { reputation: [10, 15], fans: [200, 400] },
              failurePenalty: { reputation: [-25, -15], fans: [-800, -400] },
            },
            followUp: 'legal_threat',
          },
          {
            id: 'silence',
            name: '冷处理',
            description: '暂时不回应，等待热度消退',
            icon: '🤫',
            cost: 0,
            effects: {
              reputation: [-15, -5],
              fans: [-500, -200],
              targetStress: [15, 25],
              successChance: 0.35,
              successBonus: { reputation: [3, 8], fans: [50, 150] },
              failurePenalty: { reputation: [-20, -10], fans: [-600, -300] },
            },
            followUp: 'charity_work',
          },
        ],
      },

      performance_mistake: {
        id: 'performance_mistake',
        title: '舞台失误',
        icon: '😱',
        severity: 'medium',
        description: '出道组合在重要直播舞台上出现明显失误，引发全网讨论。',
        baseReputationHit: [8, 15],
        baseFansLoss: [150, 400],
        involveTarget: true,
        strategies: [
          {
            id: 'apologize_immediately',
            name: '立刻道歉',
            description: '成员立刻发文道歉，承担全部责任',
            icon: '🙏',
            cost: 0,
            effects: {
              reputation: [-3, 5],
              fans: [-100, 50],
              targetStress: [8, 15],
              successChance: 0.7,
              successBonus: { reputation: [8, 12], fans: [150, 250] },
              failurePenalty: { reputation: [-8, -3], fans: [-200, -80] },
            },
            followUp: 'practice_hard',
          },
          {
            id: 'blame_equipment',
            name: '归咎设备',
            description: '暗示是舞台设备问题导致失误',
            icon: '🎛️',
            cost: 3000,
            effects: {
              reputation: [-8, 0],
              fans: [-200, -50],
              targetStress: [3, 8],
              successChance: 0.4,
              successBonus: { reputation: [5, 10], fans: [100, 200] },
              failurePenalty: { reputation: [-15, -8], fans: [-400, -200] },
            },
            followUp: 'none',
          },
          {
            id: 'highlight_effort',
            name: '强调努力',
            description: '放出幕后练习视频，展示成员付出',
            icon: '💪',
            cost: 8000,
            effects: {
              reputation: [0, 8],
              fans: [-50, 100],
              targetStress: [5, 10],
              successChance: 0.65,
              successBonus: { reputation: [12, 18], fans: [300, 500] },
              failurePenalty: { reputation: [-10, -3], fans: [-250, -100] },
            },
            followUp: 'variety_appearance',
          },
        ],
      },

      bullying_allegation: {
        id: 'bullying_allegation',
        title: '霸凌传闻',
        icon: '😡',
        severity: 'critical',
        description: '匿名爆料称练习生之间存在霸凌行为，舆论哗然，要求彻查。',
        baseReputationHit: [20, 35],
        baseFansLoss: [500, 1200],
        involveTarget: true,
        strategies: [
          {
            id: 'full_investigation',
            name: '全面调查',
            description: '成立调查组，公开透明处理',
            icon: '🔍',
            cost: 20000,
            effects: {
              reputation: [-10, 5],
              fans: [-400, -100],
              targetStress: [20, 30],
              successChance: 0.75,
              successBonus: { reputation: [15, 25], fans: [300, 600] },
              failurePenalty: { reputation: [-30, -20], fans: [-1000, -500] },
            },
            followUp: 'press_conference',
          },
          {
            id: 'suspend_member',
            name: '暂停活动',
            description: '暂停涉事成员活动，等待调查结果',
            icon: '⏸️',
            cost: 5000,
            effects: {
              reputation: [-15, -5],
              fans: [-600, -200],
              targetStress: [25, 35],
              successChance: 0.55,
              successBonus: { reputation: [10, 18], fans: [200, 400] },
              failurePenalty: { reputation: [-25, -15], fans: [-800, -400] },
            },
            followUp: 'counseling',
          },
          {
            id: 'deny_outright',
            name: '全面否认',
            description: '发律师函强烈否认，称是恶意造谣',
            icon: '⚖️',
            cost: 15000,
            effects: {
              reputation: [-20, -8],
              fans: [-800, -300],
              targetStress: [15, 25],
              successChance: 0.35,
              successBonus: { reputation: [20, 30], fans: [400, 700] },
              failurePenalty: { reputation: [-40, -25], fans: [-1500, -800] },
            },
            followUp: 'lawsuit',
          },
        ],
      },

      plagiarism_accusation: {
        id: 'plagiarism_accusation',
        title: '抄袭指控',
        icon: '📝',
        severity: 'high',
        description: '新歌被指旋律与某首老歌高度相似，原作者粉丝要求下架。',
        baseReputationHit: [12, 22],
        baseFansLoss: [250, 600],
        involveTarget: false,
        strategies: [
          {
            id: 'credit_original',
            name: '追加署名',
            description: '与原作者沟通，追加其为词曲作者',
            icon: '🤝',
            cost: 30000,
            effects: {
              reputation: [-5, 5],
              fans: [-150, 50],
              targetStress: [5, 12],
              successChance: 0.85,
              successBonus: { reputation: [15, 22], fans: [300, 500] },
              failurePenalty: { reputation: [-18, -10], fans: [-500, -250] },
            },
            followUp: 'collab_project',
          },
          {
            id: 'show_evidence',
            name: '出示证据',
            description: '公开创作过程和时间线证明原创',
            icon: '📁',
            cost: 8000,
            effects: {
              reputation: [-8, 2],
              fans: [-250, -50],
              targetStress: [8, 15],
              successChance: 0.5,
              successBonus: { reputation: [18, 25], fans: [400, 600] },
              failurePenalty: { reputation: [-25, -15], fans: [-700, -350] },
            },
            followUp: 'behind_scenes',
          },
          {
            id: 'remove_song',
            name: '下架歌曲',
            description: '立即下架争议歌曲，重新创作',
            icon: '🗑️',
            cost: 15000,
            effects: {
              reputation: [-3, 8],
              fans: [-300, -100],
              targetStress: [12, 20],
              successChance: 0.7,
              successBonus: { reputation: [12, 18], fans: [200, 350] },
              failurePenalty: { reputation: [-15, -8], fans: [-450, -200] },
            },
            followUp: 'new_release',
          },
        ],
      },

      staff_misconduct: {
        id: 'staff_misconduct',
        title: '工作人员不当言论',
        icon: '👔',
        severity: 'medium',
        description: '公司工作人员在社交媒体发表不当言论，引发网友不满。',
        baseReputationHit: [6, 12],
        baseFansLoss: [100, 300],
        involveTarget: false,
        strategies: [
          {
            id: 'fire_staff',
            name: '严肃处理',
            description: '立即解雇涉事员工并公开道歉',
            icon: '🚫',
            cost: 5000,
            effects: {
              reputation: [0, 8],
              fans: [-50, 100],
              targetStress: [3, 8],
              successChance: 0.8,
              successBonus: { reputation: [10, 15], fans: [150, 300] },
              failurePenalty: { reputation: [-10, -3], fans: [-250, -100] },
            },
            followUp: 'staff_training',
          },
          {
            id: 'apologize_only',
            name: '公开致歉',
            description: '公司发致歉信，但保留员工',
            icon: '✉️',
            cost: 0,
            effects: {
              reputation: [-8, 0],
              fans: [-200, -50],
              targetStress: [5, 10],
              successChance: 0.5,
              successBonus: { reputation: [5, 10], fans: [80, 150] },
              failurePenalty: { reputation: [-15, -8], fans: [-400, -150] },
            },
            followUp: 'internal_review',
          },
          {
            id: 'donation',
            name: '公益捐款',
            description: '以公司名义捐款，转移注意力',
            icon: '💝',
            cost: 25000,
            effects: {
              reputation: [5, 12],
              fans: [50, 150],
              targetStress: [2, 6],
              successChance: 0.75,
              successBonus: { reputation: [15, 22], fans: [250, 400] },
              failurePenalty: { reputation: [-12, -5], fans: [-300, -120] },
            },
            followUp: 'charity_work',
          },
        ],
      },

      health_concern: {
        id: 'health_concern',
        title: '健康担忧',
        icon: '🏥',
        severity: 'low',
        description: '粉丝发现练习生状态不佳，担心公司压榨艺人。',
        baseReputationHit: [4, 10],
        baseFansLoss: [80, 200],
        involveTarget: true,
        strategies: [
          {
            id: 'rest_schedule',
            name: '调整日程',
            description: '为成员安排充分休息，公开日程表',
            icon: '😴',
            cost: 3000,
            effects: {
              reputation: [5, 12],
              fans: [50, 150],
              targetFatigue: [-15, -8],
              targetStress: [-10, -5],
              successChance: 0.9,
              successBonus: { reputation: [8, 15], fans: [150, 250] },
              failurePenalty: { reputation: [-5, 0], fans: [-100, -30] },
            },
            followUp: 'health_check',
          },
          {
            id: 'deny_overwork',
            name: '否认压榨',
            description: '发声明称日程合理，是成员个人原因',
            icon: '💬',
            cost: 0,
            effects: {
              reputation: [-6, 0],
              fans: [-150, -30],
              targetStress: [5, 12],
              successChance: 0.35,
              successBonus: { reputation: [3, 8], fans: [50, 120] },
              failurePenalty: { reputation: [-12, -6], fans: [-300, -120] },
            },
            followUp: 'none',
          },
          {
            id: 'vacation',
            name: '安排休假',
            description: '给成员放短假，晒出度假照片',
            icon: '🌴',
            cost: 12000,
            effects: {
              reputation: [8, 15],
              fans: [100, 250],
              targetFatigue: [-25, -15],
              targetStress: [-18, -10],
              successChance: 0.85,
              successBonus: { reputation: [12, 20], fans: [250, 400] },
              failurePenalty: { reputation: [-3, 3], fans: [-50, 50] },
            },
            followUp: 'vlog_content',
          },
        ],
      },
    },

    resourceLevels: {
      low: { label: '低投入', multiplier: 0.7, costPercent: 0 },
      medium: { label: '中投入', multiplier: 1.0, costPercent: 50 },
      high: { label: '高投入', multiplier: 1.4, costPercent: 150 },
    },

    followUpActions: {
      none: { name: '无后续', description: '危机结束，不再采取行动' },
      monitor_fans: { name: '监控粉丝反馈', description: '密切关注粉丝社区，及时回应问题', cost: 2000, reputationBonus: [2, 5] },
      legal_threat: { name: '法律警告', description: '对恶意造谣者发出律师函', cost: 8000, reputationBonus: [3, 8] },
      charity_work: { name: '公益活动', description: '组织参与公益活动，改善形象', cost: 15000, reputationBonus: [8, 15] },
      practice_hard: { name: '加强训练', description: '增加练习时间，用实力证明', cost: 5000, reputationBonus: [5, 10] },
      variety_appearance: { name: '综艺出演', description: '出演综艺展现真实一面', cost: 10000, reputationBonus: [6, 12] },
      press_conference: { name: '记者发布会', description: '召开发布会说明情况', cost: 20000, reputationBonus: [10, 18] },
      counseling: { name: '心理辅导', description: '为成员提供专业心理辅导', cost: 8000, reputationBonus: [4, 9] },
      lawsuit: { name: '提起诉讼', description: '对造谣者提起法律诉讼', cost: 30000, reputationBonus: [15, 25] },
      collab_project: { name: '合作企划', description: '与原作者开展合作项目', cost: 25000, reputationBonus: [12, 20] },
      behind_scenes: { name: '幕后花絮', description: '放出创作幕后视频', cost: 5000, reputationBonus: [5, 10] },
      new_release: { name: '快速回归', description: '发行全新创作歌曲', cost: 20000, reputationBonus: [10, 18] },
      staff_training: { name: '员工培训', description: '加强员工职业素养培训', cost: 10000, reputationBonus: [6, 12] },
      internal_review: { name: '内部审查', description: '进行内部制度审查和改进', cost: 3000, reputationBonus: [3, 7] },
      health_check: { name: '定期体检', description: '为成员安排全面体检', cost: 5000, reputationBonus: [4, 9] },
      vlog_content: { name: '日常Vlog', description: '发布日常Vlog拉近与粉丝距离', cost: 3000, reputationBonus: [5, 10] },
    },
  },

  // ── 存档 ──
  storage: {
    savesKey: 'idol-agency-saves-v1',
    themeKey: 'idol-agency-theme',
    maxSlots: 5,
  },
}
