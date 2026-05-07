import CountForm from '@/components/CountForm'

const CounterPage = () => {
  return (
    <main>
      <h1>Service Name</h1>
      <p>Service Date</p>
      <p>Live counting session</p>

      <h3>Submit Attendance</h3>
      <p>Enter the name and number of people in your section</p>

      <CountForm />
    </main>
  )
}

export default CounterPage
