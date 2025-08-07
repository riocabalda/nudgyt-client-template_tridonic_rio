import CompletedTimeCard from './overview/CompletedTimeCard'
import NextScenarioCard from './overview/NextScenarioCard'
// import ScenarioScoreCard from './overview/ScenarioScoreCard'
import SoftSkillsCard from './overview/SoftSkillsCard'
import TipsCard from './overview/TipsCard'
import ResultsHeading from './ResultsHeading'

function ResultsOverview() {
  return (
    <article className='max-w-[712px] mx-auto grid auto-rows-min gap-6'>
      <ResultsHeading />

      <NextScenarioCard />

      <div className='grid grid-cols-2 auto-rows-min gap-6'>
        <div className='grid auto-rows-min gap-6'>
          {/* <ScenarioScoreCard /> */}
          <CompletedTimeCard />
        </div>

        <div className='grid auto-rows-min gap-6'>
          <SoftSkillsCard />
        </div>
      </div>

      <TipsCard />
    </article>
  )
}

export default ResultsOverview
