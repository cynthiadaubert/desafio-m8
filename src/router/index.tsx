import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "components/layout";
import { Home } from "pages/home/index";
import { HomePets } from "pages/homePets";
import { Login } from "pages/login/index";
import { Register } from "pages/register/index";
import { Profile } from "pages/profile/index";
import { ProfileAccount } from "pages/profile-account/index";
import { ProfilePassword } from "pages/profile-password/index";
import { SignUp } from "pages/signin/index";
import { Reports } from "pages/reports/index"
import { MyReports } from "pages/my-reports";
import { ReportEdit } from "pages/report-edit";
import { Empty } from "pages/empty";


export function AppRoutes() {
    return(
    <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pets" element={<HomePets />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignUp />} />
                <Route path="/empty" element={<Empty />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/account" element={<ProfileAccount />} />
                <Route path="/profile/password" element={<ProfilePassword />} />
                <Route path="/report" element={<Reports />} />
                <Route path="/my-reports" element={<MyReports />} />
                <Route path="/report/edit/:id" element={<ReportEdit />} />

            </Route>
      
    </Routes>
    )
}
