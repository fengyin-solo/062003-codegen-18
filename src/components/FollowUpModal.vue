<template>
  <div class="modal-overlay">
    <div class="modal card followup-modal">
      <h3>📋 危机后续跟进</h3>

      <div class="crisis-recap">
        <div class="recap-item">
          <span class="recap-label">相关危机：</span>
          <span class="recap-value">{{ followUp.crisisTitle }}</span>
        </div>
        <div class="recap-item">
          <span class="recap-label">处理结果：</span>
          <span class="recap-value" :class="{ success: followUp.success, failure: !followUp.success }">
            {{ followUp.success ? '处理成功' : '处理失败' }}
          </span>
        </div>
        <div class="recap-item">
          <span class="recap-label">距事件发生：</span>
          <span class="recap-value">{{ daysSince }} 天</span>
        </div>
      </div>

      <div v-if="followUpAction" class="followup-info">
        <div class="followup-header">
          <span class="followup-icon">📌</span>
          <span class="followup-name">建议后续：{{ followUpAction.name }}</span>
        </div>
        <p class="followup-desc">{{ followUpAction.description }}</p>
        <div class="followup-cost">
          <span>预计费用：</span>
          <span class="cost">¥{{ followUpAction.cost.toLocaleString() }}</span>
        </div>
        <div class="followup-benefit">
          <span>预计口碑提升：</span>
          <span class="positive">+{{ followUpAction.reputationBonus[0] }} ~ +{{ followUpAction.reputationBonus[1] }}</span>
        </div>
      </div>

      <div class="actions">
        <button
          class="btn primary"
          :disabled="!canAfford"
          @click="$emit('resolve', true)"
        >
          执行后续行动 (¥{{ followUpAction?.cost.toLocaleString() || 0 }})
        </button>
        <button class="btn" @click="$emit('resolve', false)">
          暂不采取行动
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  followUp: Object,
  money: Number,
  currentDay: Number,
})

defineEmits(['resolve'])

const followUpAction = computed(() => {
  if (!props.followUp) return null
  return GAME_CONFIG.crisis.followUpActions[props.followUp.followUpAction]
})

const daysSince = computed(() => {
  if (!props.followUp) return 0
  return props.currentDay - props.followUp.availableDay + 1
})

const canAfford = computed(() => {
  if (!followUpAction.value) return false
  return props.money >= followUpAction.value.cost
})
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
}

.followup-modal {
  max-width: 450px;
  width: 100%;
  padding: 1.5rem;
}

.followup-modal h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.crisis-recap {
  background: var(--bg-hover);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.recap-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.recap-item:last-child {
  margin-bottom: 0;
}

.recap-label {
  color: var(--text-secondary);
}

.recap-value {
  font-weight: 600;
}

.recap-value.success {
  color: #10b981;
}

.recap-value.failure {
  color: var(--danger);
}

.followup-info {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1));
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.followup-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.followup-icon {
  font-size: 1.25rem;
}

.followup-name {
  font-weight: 600;
  color: var(--text-primary);
}

.followup-desc {
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.followup-cost,
.followup-benefit {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.cost {
  color: #f59e0b;
  font-weight: 600;
}

.positive {
  color: #10b981;
  font-weight: 600;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  width: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
