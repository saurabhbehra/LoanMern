import React,{useContext} from 'react'
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'

import CloanView from './CloanView'
import AllLoanView from './AllLoanView'


const Home =()=>{
    const auth = useContext(AuthContext)
   return(
       <div>
           {auth.isLoggedIn && auth.role=='customer' &&
                <CloanView />
            }
            {auth.isLoggedIn && auth.role=='agent' &&
                <AllLoanView />
            }
             {auth.isLoggedIn && auth.role=='admin' &&
                <AllLoanView />
            }
           
       </div>
   )
}

export default Home
