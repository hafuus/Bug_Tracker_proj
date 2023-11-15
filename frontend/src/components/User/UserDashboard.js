import React from 'react'
import UserProject from './UserProject'
import Sidebar from '../Sidebar'

function UserDashboard({userId}) {
  return (
    <div className='flex'>
      {/* <Sidebar/> */}
      <UserProject  userId={userId}/>
    </div>
  )
}

export default UserDashboard
