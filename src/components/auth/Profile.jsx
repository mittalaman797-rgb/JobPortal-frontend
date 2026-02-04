import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'




const Profile = () => {
      useGetAppliedJobs()
  const [open,setOpen]=useState(false)
  const {user}=useSelector(store=>store.auth)
  console.log(user)
  const isResume=true
  return (
    <div>
      <Navbar />
      <div className='max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 '>

        <div className='flex justify-between'>
          <div className='flex items-center gap-10'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2TsupP-aEOKYyRv52D1p9RA0wZnl1If5kg&s" />
              {/* <AvatarImage src={user?.profile?.avatar || "https://default-avatar-url.com"} /> */}


            </Avatar>
            <div>
            <h1 className='font-medium text-xl'>{user?.fullname || "Guest User"}</h1>

              <p>{user?.profile?.bio || "No bio added"}</p>

            </div>




          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant='outline'><Pen /></Button>

        </div>


        <div className='my-5 flex flex-col gap-3'>

          <div className='flex items-center gap-3'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
    

        </div>

        <div className='my-5 flex flex-col gap-2'>
          <h1>Skills</h1>
          <div className='flex gap-2'>
            {user?.profile?.skills?.length > 0 
  ? user.profile.skills.map((item, index) => (
      <Badge key={index}>{item}</Badge>
    )) 
  : <span>NA</span>
}

          </div>

        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
         {user?.profile?.resume ? (
  <a target="blank" href={user.profile.resume} className="text-blue-500 hover:underline">
    {user.profile.resumeOriginalName}
  </a>
) : (
  <span>NA</span>
)}


        </div>
      

      </div>
        <div className='max-w-3xl mx-auto bg-white rounded-2xl'>

          <h1 className='font-bold text-lg my-5'>All Applied Job</h1>
          <AppliedJobTable/>

        </div>

        <UpdateProfile open={open} setOpen={setOpen}/>

    </div>
  )
}

export default Profile
