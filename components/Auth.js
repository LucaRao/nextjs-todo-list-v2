import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email,password })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleLogup = async ()=>{
    try {
      loading.value = true;
      const { error } = await supabase.auth.signUp({ email,password });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      loading.value = false;
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">memfiredb + Next.js</h1>
        <p className="description">使用下面的电子邮件通过魔术链接登录</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogup(email,password)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : '注册'}</span>
          </button>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email,password)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : '登录'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}