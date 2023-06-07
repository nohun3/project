'use client'

import { AppContext } from "@/context/AppContext";
import React from "react";

export default function JoinLayout({ children }) {

  const [isAlert, setIsAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState();
  const [alertServerity, setAlertServerity] = React.useState("error");

  return (
    <AppContext.Provider value={{isAlert, setIsAlert, alertMessage, setAlertMessage,
      alertServerity, setAlertServerity}}>
      <div>
        {children}
      </div>
    </AppContext.Provider>
  )
}
