import CompletedTimeCard from '../overview/CompletedTimeCard'
import NextScenarioCard from '../overview/NextScenarioCard'
// import ScenarioScoreCard from '../overview/ScenarioScoreCard'
import ScenarioSummaryCard from '../overview/ScenarioSummaryCard'
import SoftSkillsCard from '../overview/SoftSkillsCard'
import TipsCard from '../overview/TipsCard'

function ResultsTab() {
  return (
    <article className='grid gap-4'>
      <NextScenarioCard />

      {/* <ScenarioScoreCard /> */}
      <CompletedTimeCard />
      <SoftSkillsCard />
      <ScenarioSummaryCard />
      <TipsCard />
    </article>
  )
}

export default ResultsTab
