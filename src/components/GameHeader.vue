<template>
  <header class="game-header">
    <div class="header-left">
      <button class="btn ghost" @click="$emit('back')">← 存档</button>
      <h2>第 {{ state.day }} 天</h2>
      <span class="days-left">剩余 {{ daysLeft }} 天</span>
    </div>
    <div class="header-stats">
      <div class="stat-item">
        <span class="label">资金</span>
        <span class="value" :class="{ danger: state.money < 10000 }">
          ¥{{ state.money.toLocaleString() }}
        </span>
      </div>
      <div class="stat-item">
        <span class="label">粉丝</span>
        <span class="value">{{ state.fans.toLocaleString() }}</span>
      </div>
      <div class="stat-item">
        <span class="label">盈利</span>
        <span class="value" :class="profit >= 0 ? 'success' : 'danger'">
          ¥{{ profit.toLocaleString() }}
        </span>
      </div>
      <div class="stat-item">
        <span class="label">出道</span>
        <span class="value">{{ state.groups.length }}/{{ targetGroups }}</span>
      </div>
      <div class="stat-item reputation-item">
        <span class="label">口碑</span>
        <div class="reputation-display">
          <div class="reputation-bar">
            <div class="reputation-fill" :class="safeReputationLevel" :style="{ width: reputationWidth }"></div>
          </div>
          <span class="value reputation-value" :class="safeReputationLevel">
            {{ safeReputation }} ({{ safeReputationLabel }})
          </span>
        </div>
      </div>
    </div>
    <button class="theme-btn" @click="$emit('toggle-theme')">
      {{ theme === 'light' ? '🌙' : '☀️' }}
    </button>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  state: Object,
  daysLeft: Number,
  profit: Number,
  reputation: Number,
  reputationLabel: String,
  reputationLevel: String,
  theme: String,
})
defineEmits(['back', 'toggle-theme'])

const targetGroups = GAME_CONFIG.victory.targetGroups

const safeReputation = computed(() => {
  const rep = props.reputation
  return typeof rep === 'number' && !isNaN(rep) ? Math.round(rep) : 50
})

const safeReputationLabel = computed(() => {
  return props.reputationLabel || '一般'
})

const safeReputationLevel = computed(() => {
  return props.reputationLevel || 'normal'
})

const reputationWidth = computed(() => {
  return `${Math.max(0, Math.min(100, safeReputation.value))}%`
})
</script>

<style scoped>
.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-left h2 {
  font-size: 1.25rem;
}

.days-left {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.header-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.stat-item .value {
  font-weight: 700;
  font-size: 1rem;
}

.stat-item .value.success { color: var(--success); }
.stat-item .value.danger { color: var(--danger); }

.reputation-item {
  min-width: 160px;
}

.reputation-display {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  width: 100%;
}

.reputation-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.reputation-fill {
  height: 100%;
  transition: width 0.3s ease, background 0.3s ease;
  border-radius: 3px;
}

.reputation-fill.excellent {
  background: linear-gradient(90deg, #10b981, #06b6d4);
}

.reputation-fill.good {
  background: linear-gradient(90deg, #84cc16, #10b981);
}

.reputation-fill.normal {
  background: linear-gradient(90deg, #f59e0b, #84cc16);
}

.reputation-fill.poor {
  background: linear-gradient(90deg, #f97316, #f59e0b);
}

.reputation-fill.critical {
  background: linear-gradient(90deg, #ef4444, #f97316);
}

.reputation-value {
  font-size: 0.85rem;
}

.reputation-value.excellent { color: #06b6d4; }
.reputation-value.good { color: #10b981; }
.reputation-value.normal { color: #f59e0b; }
.reputation-value.poor { color: #f97316; }
.reputation-value.critical { color: #ef4444; }

.theme-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.1rem;
}
</style>
