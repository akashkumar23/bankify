import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'

import React from 'react'

const Home = () => {

  const loggedIn = { firstName: 'Akash', lastName: 'Kumar', email: 'sample@gmail.com' }

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          {/* Welcome, Akash */}
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access & manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />

        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 125.56}, {currentBalance:150.70}]}
      />
    </section>

  )
}

export default Home
