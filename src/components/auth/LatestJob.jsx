import React from 'react'
import LatestJobCart from './LatestJobCart'
import { useSelector } from 'react-redux'




const LatestJob = () => {

  const {allJobs}=useSelector(store=>store.jobs)
  
  return (
    <div className='max-w-5xl mx-auto my-15 '>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
    <div className='grid grid-cols-3 gap-4 my-5'>
        {
         allJobs.length>0 ? allJobs?.slice(0,6).map((job,index)=><LatestJobCart  key={job._id} job={job}/>) : <span>Job not found</span>
        }
    </div>
    </div>
   
  )
}

export default LatestJob
