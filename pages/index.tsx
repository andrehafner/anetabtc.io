import Head from 'next/head'
import Header from '@components/Header'

export default function Home() {
  return (
    <div className="theme-dark next-container">
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
        <title>anetBTC Staking Platform</title>
      </Head>
      <Header></Header>
    </div>
  )
}
