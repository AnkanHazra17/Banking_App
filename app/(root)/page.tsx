import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/user.actions'
import React from 'react'

const Home = async() => {
    const loggedIn = await getLoggedInUser()
  return (
    <section className="home">
        <div className="home-content">
            <header className="home-header">
                <HeaderBox 
                    type="greeting" 
                    title="Welcome" 
                    subtext='Access and manage your account and transactions efficiently' 
                    user={loggedIn?.name || "Guest"}>
                </HeaderBox>

                <TotalBalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1356.35}
                ></TotalBalanceBox>
            </header>
            Recent Transactions
        </div>
        <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 1243.50}, {currentBalance: 1243.50}]}></RightSidebar>
    </section>
  )
}

export default Home