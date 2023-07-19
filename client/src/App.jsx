import './App.css'
import PreNav from './components/NavUnsigned/PreNav'

export async function getServerSideProps({country}) {
    let data = await axios
    .get('https://api.ipregistry.co/?key=e8k7kc2jtqzi9nwe')
    console.log(country)
      .then((res) => {
        console.log(res)
        return res.data.location.country;
      }) .catch((err) => {
        console.log(err)
      })
      return {
        props: {
          country: { name: data.name, flag: data.flag.emojitwo, countryCode: data.code }
        }
      }
}

function App({country}) {
  return (
    <>
      <PreNav country={country} />
    </>
  )
}

export default App
