import CompletedTimeCard from '../overview/CompletedTimeCard'
import FeedbackChartCard from '../overview/FeedbackChartCard'
import LearnerCard from '../overview/LearnerCard'
// import ScenarioScoreCard from '../overview/ScenarioScoreCard'
import ScenarioSummaryCard from '../overview/ScenarioSummaryCard'
import SoftSkillsCard from '../overview/SoftSkillsCard'

function ResultsTab() {
  return (
    <article className='grid gap-4'>
      <LearnerCard />

      <FeedbackChartCard />

      {/* <ScenarioScoreCard /> */}
      <CompletedTimeCard />
      <SoftSkillsCard />
      <ScenarioSummaryCard />
    </article>
  )
}

export default ResultsTab
