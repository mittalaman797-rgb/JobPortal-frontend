import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/auth/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { Toaster } from './components/ui/sonner'
import Jobs from './components/auth/Jobs'
import Browse from './components/auth/Browse'
import Profile from './components/auth/Profile'
import JobsDescription from './components/auth/JobsDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


const App = () => {
  return (
    <div>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/description/:id' element={<JobsDescription />} />


        {/* for admin  */}


        {/* <Route path='/admin/companies' element={<Companies/>}/>
           <Route path='/admin/companies/create' element={<CompanyCreate/>}/>
      
          <Route path="/admin/companies/:companyId" element={<CompanySetup />} />
          <Route path="/admin/jobs" element={<AdminJobs/>} />
           <Route path="/admin/jobs/create" element={<PostJobs/>} />
           <Route path="/admin/jobs/:id/applicants" element={<Applicants/>} /> */}

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRoute>
              <CompanyCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies/:companyId"
          element={
            <ProtectedRoute>
              <CompanySetup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute>
              <PostJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          }
        />






      </Routes>

      <Toaster />

    </div>
  )
}

export default App
