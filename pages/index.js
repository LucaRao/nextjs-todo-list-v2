import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'

export default function Home() {
  const [session, setSession] = useState(null)

   useEffect(() => {
    const handleAsync = async () => {
      const { data, error } = await supabase.auth.getSession()
      setSession(data?.user)
    }
    handleAsync()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}