import '../../assets/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import RegionalProvider from '../components/RegionalProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RegionalProvider>
        <Component {...pageProps} />
      </RegionalProvider>
    </SessionProvider>
  )
}

export default MyApp