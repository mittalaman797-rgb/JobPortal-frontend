
import { COMPANY_API_END_POINT } from '@/API/api';
import { setSingleCompany } from '@/redux/companySlice';
import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    // const {searchedQuery} = useSelector(store=>store.job);
    // useEffect(()=>{
    //     const fetchSingleCompany = async () => {
    //         try {
    //             const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
    //             if(res.data.success){
    //                 dispatch(setSingleCompany(res.data.company));
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchSingleCompany();
    // },[companyId,dispatch])

    useEffect(() => {
  if (!companyId) return;

  const fetchSingleCompany = async () => {
    try {
      const res = await axios.get(
        `${COMPANY_API_END_POINT}/get/${companyId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchSingleCompany();
}, [companyId,dispatch]);

}

export default  useGetCompanyById
