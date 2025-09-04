import '../../assets/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { DefaultSeo } from 'next-seo'
import RegionalProvider from '../components/RegionalProvider'
import { defaultSEO } from '../lib/seo-config'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <SessionProvider session={session}>
        <RegionalProvider>
          <Component {...pageProps} />
        </RegionalProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp