<template>
  <div class="modal-overlay">
    <div class="modal card crisis-modal">
      <div class="crisis-header">
        <span class="crisis-icon">{{ crisis.icon }}</span>
        <div>
          <h3>🚨 危机事件：{{ crisis.title }}</h3>
          <div class="severity-badge" :class="crisis.severity">
            {{ severityLabels[crisis.severity] }}
          </div>
        </div>
      </div>

      <p class="desc">{{ crisis.description }}</p>

      <div v-if="crisis.target" class="target-info">
        <span class="target-label">涉及成员：</span>
        <span class="target-name">{{ crisis.target.name }}</span>
      </div>

      <div class="impact-info">
        <div class="impact-item">
          <span class="impact-label">📊 初始口碑损失：</span>
          <span class="impact-value negative">-{{ crisis.reputationHit }}</span>
        </div>
        <div class="impact-item">
          <span class="impact-label">👥 初始粉丝损失：</span>
          <span class="impact-value negative">-{{ crisis.fansLoss.toLocaleString() }}</span>
        </div>
      </div>

      <div class="section-title">📋 选择处理策略</div>
      <div class="strategies">
        <div
          v-for="strategy in strategies"
          :key="strategy.id"
          class="strategy-card"
          :class="{ selected: selectedStrategy === strategy.id }"
          @click="selectedStrategy = strategy.id"
        >
          <div class="strategy-header">
            <span class="strategy-icon">{{ strategy.icon }}</span>
            <span class="strategy-name">{{ strategy.name }}</span>
          </div>
          <p class="strategy-desc">{{ strategy.description }}</p>
          <div class="strategy-stats">
            <div class="stat-row">
              <span>成功率：</span>
              <span class="success-chance">{{ Math.round(strategy.effects.successChance * 100) }}%</span>
            </div>
            <div class="stat-row">
              <span>基础费用：</span>
              <span class="cost">¥{{ strategy.cost.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section-title">💰 选择资源投入级别</div>
      <div class="resource-levels">
        <div
          v-for="(resource, key) in resourceLevels"
          :key="key"
          class="resource-card"
          :class="{ selected: selectedResource === key }"
          @click="selectedResource = key"
        >
          <div class="resource-name">{{ resource.label }}</div>
          <div class="resource-effects">
            <span>效果 ×{{ resource.multiplier.toFixed(1) }}</span>
            <span>费用 ×{{ (1 + resource.costPercent / 100).toFixed(1) }}</span>
          </div>
        </div>
      </div>

      <div v-if="selectedStrategy && selectedResource" class="preview">
        <div class="preview-title">📈 预期效果</div>
        <div class="preview-content">
          <div class="preview-item">
            <span>总费用：</span>
            <span class="cost">¥{{ totalCost.toLocaleString() }}</span>
          </div>
          <div class="preview-item">
            <span>调整后成功率：</span>
            <span class="success-chance">{{ Math.round(adjustedSuccessChance * 100) }}%</span>
          </div>
        </div>
      </div>

      <div class="actions">
        <button
          class="btn primary"
          :disabled="!canSubmit"
          @click="handleSubmit"
        >
          确认处理
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  crisis: Object,
  money: Number,
})

const emit = defineEmits(['resolve'])

const severityLabels = {
  low: '轻微',
  medium: '中等',
  high: '严重',
  critical: '极严重',
}

const selectedStrategy = ref(null)
const selectedResource = ref('medium')

const script = computed(() => {
  return GAME_CONFIG.crisis.scripts[props.crisis?.scriptId]
})

const strategies = computed(() => {
  return script.value?.strategies || []
})

const resourceLevels = computed(() => {
  return GAME_CONFIG.crisis.resourceLevels
})

const selectedStrategyData = computed(() => {
  if (!selectedStrategy.value) return null
  return strategies.value.find((s) => s.id === selectedStrategy.value)
})

const selectedResourceData = computed(() => {
  return resourceLevels.value[selectedResource.value]
})

const totalCost = computed(() => {
  if (!selectedStrategyData.value) return 0
  const baseCost = selectedStrategyData.value.cost
  return Math.round(baseCost * (1 + selectedResourceData.value.costPercent / 100))
})

const adjustedSuccessChance = computed(() => {
  if (!selectedStrategyData.value) return 0
  const baseChance = selectedStrategyData.value.effects.successChance
  const mult = selectedResourceData.value.multiplier
  return Math.min(0.95, baseChance * (0.8 + mult * 0.2))
})

const canSubmit = computed(() => {
  return (
    selectedStrategy.value &&
    selectedResource.value &&
    props.money >= totalCost.value
  )
})

function handleSubmit() {
  if (!canSubmit.value) return
  emit('resolve', selectedStrategy.value, selectedResource.value)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 150;
  padding: 1rem;
  overflow-y: auto;
}

.crisis-modal {
  max-width: 600px;
  width: 100%;
  padding: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
}

.crisis-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.crisis-icon {
  font-size: 2.5rem;
}

.crisis-header h3 {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.severity-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.severity-badge.low {
  background: #d1fae5;
  color: #065f46;
}

.severity-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.severity-badge.high {
  background: #fed7aa;
  color: #9a3412;
}

.severity-badge.critical {
  background: #fee2e2;
  color: #991b1b;
}

.desc {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0.75rem 0;
}

.target-info {
  background: var(--bg-hover);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.target-label {
  color: var(--text-secondary);
}

.target-name {
  font-weight: 600;
  color: var(--accent);
}

.impact-info {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--bg-hover);
  border-radius: 8px;
}

.impact-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.impact-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.impact-value.negative {
  color: var(--danger);
  font-weight: 600;
}

.section-title {
  font-weight: 600;
  margin: 1rem 0 0.75rem 0;
  color: var(--text-primary);
}

.strategies {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.strategy-card {
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bg-card);
}

.strategy-card:hover {
  border-color: var(--accent);
  background: var(--bg-hover);
}

.strategy-card.selected {
  border-color: var(--accent);
  background: rgba(99, 102, 241, 0.1);
}

.strategy-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.strategy-icon {
  font-size: 1.25rem;
}

.strategy-name {
  font-weight: 600;
  color: var(--text-primary);
}

.strategy-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0.5rem 0;
  line-height: 1.4;
}

.strategy-stats {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
}

.stat-row {
  display: flex;
  gap: 0.25rem;
  color: var(--text-secondary);
}

.success-chance {
  color: var(--accent);
  font-weight: 600;
}

.cost {
  color: #f59e0b;
  font-weight: 600;
}

.resource-levels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.resource-card {
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  background: var(--bg-card);
}

.resource-card:hover {
  border-color: var(--accent);
  background: var(--bg-hover);
}

.resource-card.selected {
  border-color: var(--accent);
  background: rgba(99, 102, 241, 0.1);
}

.resource-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.resource-effects {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  color: var(--text-secondary);
  gap: 0.15rem;
}

.preview {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
}

.preview-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--accent);
}

.preview-content {
  display: flex;
  gap: 2rem;
}

.preview-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.actions {
  margin-top: 1.25rem;
}

.btn {
  width: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
