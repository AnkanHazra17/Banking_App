import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
    const loggedIn = {firstName: "Ankan", lastName: "Hazra", email: "ankan.hazra1710@gmail.com"}
  return (
    <section className="home">
        <div className="home-content">
            <header className="home-header">
                <HeaderBox 
                    type="greeting" 
                    title="Welcome" 
                    subtext='Access and manage your account and transactions efficiently' 
                    user={loggedIn.firstName || "Guest"}>
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