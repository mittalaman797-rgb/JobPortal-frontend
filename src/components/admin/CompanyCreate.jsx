import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/API/api'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [companyName,setCompanyName]=useState()
    const registerNewCompany=async()=>{
     try{
          const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{withCredentials:true})
          console.log(res.data)
          if(res?.data?.message){
               console.log(res?.data?.message)
                dispatch(setSingleCompany(res?.data?.company))
            toast.success(res?.data?.message)
            const companyId=res?.data?.company?._id
               navigate(`/admin/companies/${companyId}`)

          }
     }catch(error){
        console.log(error?.response?.data?.message)
          toast.error(error?.response?.data?.message)
     }
    }
  return (
    <div>
    <Navbar/>
    <div className='max-w-3xl mx-auto'>
        <div className='my-10'>
                 <h1 className='font-bold text-2xl'>Your company name</h1>
       <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
        </div>
    


       <Label htmlFor="companyname">Company Name</Label>
       <Input
    
          id="companyname"
          type="text"
          placeholder="jobhunt,microsoft etc."
          className="my-2"
             onChange={(e)=>setCompanyName(e.target.value)}
             value={companyName}
       />

       <div className='flex items-center gap-2 my-10'>

        <Button variant='outline' onClick={()=>navigate("/admin/companies")}>Cancel</Button>
        
        <Button onClick={registerNewCompany}>Continue</Button>

       </div>
    </div>
    </div>
  )
}

export default CompanyCreate
