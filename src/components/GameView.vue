<template>
  <div class="game-view">
    <GameHeader
      :state="state"
      :days-left="daysLeft"
      :profit="profit"
      :reputation="reputation"
      :reputation-label="reputationLabel"
      :reputation-level="reputationLevel"
      :theme="theme"
      @back="$emit('back')"
      @toggle-theme="$emit('toggle-theme')"
    />

    <div class="game-body">
      <aside class="sidebar">
        <div class="trainee-grid">
          <TraineeCard
            v-for="t in activeTrainees"
            :key="t.id"
            :trainee="t"
            :score="calcScore(t)"
          />
        </div>
      </aside>

      <main class="main-panel">
        <SchedulePanel
          :trainees="activeTrainees"
          :schedule="state.schedule"
          :can-end="canEndDay"
          @set="(id, act) => $emit('set-schedule', id, act)"
          @clear="$emit('clear-schedule')"
          @end-day="$emit('end-day')"
        />
        <DayLog :logs="state.logs" />
      </main>

      <aside class="right-panel">
        <GroupsPanel
          :groups="state.groups"
          :trainees="state.trainees"
          :money="state.money"
          @release="(id) => $emit('release-single', id)"
        />
        <RelationshipPanel
          :trainees="state.trainees"
          :relationships="state.relationships"
        />
      </aside>
    </div>

    <RatingModal
      v-if="state.pendingRating && state.gameStatus === 'playing'"
      :results="ratingResults"
      @close="$emit('dismiss-rating')"
      @debut="showDebut = true"
    />

    <DebutModal
      v-if="showDebut"
      :candidates="ratingResults"
      @close="showDebut = false"
      @confirm="onDebut"
    />

    <EventModal
      v-if="state.pendingEvent"
      :event="state.pendingEvent"
      @resolve="(keep) => $emit('resolve-poaching', keep)"
    />

    <CrisisModal
      v-if="state.pendingCrisis && state.gameStatus === 'playing'"
      :crisis="state.pendingCrisis"
      :money="state.money"
      @resolve="onCrisisResolve"
    />

    <FollowUpModal
      v-if="showFollowUp && state.gameStatus === 'playing'"
      :follow-up="state.pendingFollowUp"
      :money="state.money"
      :current-day="state.day"
      @resolve="onFollowUpResolve"
    />

    <GameOverModal
      v-if="state.gameStatus !== 'playing'"
      :status="state.gameStatus"
      :state="state"
      :profit="profit"
      @back="$emit('back')"
    />

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GameHeader from './GameHeader.vue'
import TraineeCard from './TraineeCard.vue'
import SchedulePanel from './SchedulePanel.vue'
import DayLog from './DayLog.vue'
import GroupsPanel from './GroupsPanel.vue'
import RelationshipPanel from './RelationshipPanel.vue'
import RatingModal from './RatingModal.vue'
import DebutModal from './DebutModal.vue'
import EventModal from './EventModal.vue'
import CrisisModal from './CrisisModal.vue'
import FollowUpModal from './FollowUpModal.vue'
import GameOverModal from './GameOverModal.vue'

const props = defineProps({
  state: Object,
  activeTrainees: Array,
  daysLeft: Number,
  profit: Number,
  reputation: Number,
  reputationLabel: String,
  reputationLevel: String,
  showFollowUp: Boolean,
  theme: String,
  canEndDay: Boolean,
  ratingResults: Array,
  calcScore: Function,
})

const emit = defineEmits([
  'back',
  'toggle-theme',
  'set-schedule',
  'clear-schedule',
  'end-day',
  'dismiss-rating',
  'debut',
  'resolve-poaching',
  'release-single',
  'resolve-crisis',
  'resolve-followup',
])

const showDebut = ref(false)
const toast = ref('')

function onDebut(memberIds, groupName) {
  emit('debut', memberIds, groupName, (result) => {
    if (result?.success) {
      showDebut.value = false
      toast.value = '出道成功！'
      setTimeout(() => { toast.value = '' }, 2500)
    } else if (result?.message) {
      toast.value = result.message
      setTimeout(() => { toast.value = '' }, 3000)
    }
  })
}

function onCrisisResolve(strategyId, resourceLevel) {
  emit('resolve-crisis', strategyId, resourceLevel, (result) => {
    if (result?.success) {
      toast.value = result.state.pendingFollowUp ? '危机已处理，等待后续跟进时机...' : '危机已处理！'
      setTimeout(() => { toast.value = '' }, 3000)
    } else if (result?.message) {
      toast.value = result.message
      setTimeout(() => { toast.value = '' }, 3000)
    }
  })
}

function onFollowUpResolve(doFollowUp) {
  emit('resolve-followup', doFollowUp, (result) => {
    if (result?.success) {
      toast.value = doFollowUp ? '后续行动已执行！' : '已跳过后续行动'
      setTimeout(() => { toast.value = '' }, 2500)
    } else if (result?.message) {
      toast.value = result.message
      setTimeout(() => { toast.value = '' }, 3000)
    }
  })
}
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.game-body {
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.9fr;
  gap: 1rem;
  padding: 1rem;
  flex: 1;
}

@media (max-width: 1100px) {
  .game-body {
    grid-template-columns: 1fr;
  }
}

.sidebar .trainee-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.main-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  border: 1px solid var(--accent);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  z-index: 200;
  box-shadow: var(--shadow);
}
</style>
