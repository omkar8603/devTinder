import React from 'react'

const UserCart = ({user}) => {
 

  const { firstName, lastName, photoUrl, age, about } = user;


  return (
    <div>
      <div className="card bg-base-100 h-[560px] w-96 shadow-sm">
  <figure>
    {photoUrl && <img src={photoUrl} alt="Profile" />}

  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + "  " + lastName + "  " + age}</h2>
    <p>{about}</p>
    <div className="card-actions justify-around mt-4">
      <button className="btn bg-secondary">Interested</button>
     <button className="btn bg-primary">Ignored</button>

    </div>
  </div>
</div>
    </div>
  )
}

export default UserCart
