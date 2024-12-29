import { About, Contact, Footer, Hero, MyApplications, Projects, Skills, Timeline } from '../../components'

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Timeline/>
      <Skills/>
      <Projects/>
      <MyApplications/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home