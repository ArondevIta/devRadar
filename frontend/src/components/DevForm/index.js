import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit }){
  const[user_github, setUserGithub] = useState('')
  const[techs, setTechs] = useState('')
  const[latitude, setLatitude] = useState('')
  const[longitude, setLongitude] = useState('')

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
        console.log(position)
      },
      (err)=>{
        console.log(err)
      },
      {
        timeout: 30000,
      }
    )
  }, [])

  async function handleSubmit(e){
    e.preventDefault()
    await onSubmit({
      user_github,
      techs,
      latitude,
      longitude
    })
    setUserGithub('')
    setTechs('')
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="user_github">Usuário</label>
        <input 
          type="text" 
          name="user_github" 
          id="user_github"
          value={user_github}
          onChange={e => setUserGithub(e.target.value)} 
          required
        />
      </div>
      
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          type="text" 
          name="techs" 
          id="techs"
          value={techs}
          onChange={e => setTechs(e.target.value)} 
          required
        />
      </div>
      
      <div className="input-group">

        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="number" 
            value={latitude}
            onChange={e => setLatitude(e.target.value)} 
            name="latitude" 
            id="latitude"
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="number" 
            value={longitude}
            onChange={e => setLongitude(e.target.value)} 
            name="longitude" 
            id="longitude" 
            required
          />
        </div>

      </div>
      <button type="submit">Salvar</button>
    </form>
  )
}

export default DevForm
