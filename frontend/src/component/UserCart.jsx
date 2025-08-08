import React from 'react'

const UserCart = ({ feed }) => {
 
    const user = feed[0 ];
    console.log(user)
    
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={user?.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user?.firstName + "  " + user?.lastName}</h2>
    <p>{user?.about}</p>
    <div className="card-actions justify-around mx-4">
      <button className="btn bg-secondary">Interested</button>
     <button className="btn bg-primary">Ignored</button>

    </div>
  </div>
</div>
    </div>
  )
}

export default UserCart
