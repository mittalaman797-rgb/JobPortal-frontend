import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import FilterCard from './FilterCard'
import Job from './job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import GetAllJobs from '@/hooks/GetAllJobs'




const Jobs = () => {
  
    const {allJobs,searchedQuery}=useSelector(store=>store.jobs)
    const [filterJobs,setFilterJobs]=useState(allJobs)
       
     const dispatch=useDispatch()
       GetAllJobs()
   



    
       useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [])



  useEffect(() => {
    if (!allJobs || allJobs.length === 0) {
        setFilterJobs([]);
        return;
    }

    let filtered = [...allJobs];

    if (searchedQuery && searchedQuery.trim() !== "") {
        const query = searchedQuery.toLowerCase();

        console.log("location",query)

        filtered = filtered.filter(job =>
            job?.title?.toLowerCase().includes(query) ||
            job?.location?.toLowerCase().includes(query) ||
            job?.jobType?.toLowerCase().includes(query) ||
            job?.salary?.toString().includes(query)
        );
    }

    setFilterJobs(filtered);
}, [allJobs, searchedQuery]);



    return (
        <div>
            <Navbar />

            <div className='max-w-5xl mx-auto mt-7  '>
                <div className='flex gap-20'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    
                    {
                        filterJobs.length<=0 ? <span>Job not found</span> :(
                            <div className='flex-1 h-[83vh] overflow-y-auto hide-scrollbar pb-5'>
                                <div className='grid grid-cols-3 gap-5'>
                                      { 
                                      filterJobs.map((job) =>(
                                        <motion.div
                                        initial={{opacity:0,x:100}}
                                        animate={{opacity:1,x:0}}
                                        exit={{opacity:0,x:-100}}
                                        transition={{duration:0.3}}  
                                         key={job?._id}>
                                              <Job job={job} />
                                        </motion.div>
                                       
                                         
                                         )
                                         )}
                                </div>
                           
                            </div>
                         
                        )
                    }
                </div>

            </div>


        </div>
    )
}

export default Jobs





