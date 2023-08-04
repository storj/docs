'use client'
import { useEffect, useState } from 'react'

export default function PartnerIntegration() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/v0/auth/account', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
      },
      referrer: 'http://localhost:8000/project-dashboard',
      referrerPolicy: 'same-origin',
      body: null,
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])
  return (
    <div>
      Hello world!
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
