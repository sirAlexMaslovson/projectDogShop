import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'

export function RaitingPrduct({ raitingProductValue }) {
  return (

    <div className="text-center" style={{ color: 'goldenrod' }}>
      <b>
        {raitingProductValue < 0
          ? <MdOutlineStarOutline />
          : <MdOutlineStarPurple500 />}
      </b>

      <b>
        {raitingProductValue < 2
          ? <MdOutlineStarOutline />
          : <MdOutlineStarPurple500 />}
      </b>

      <b>
        {raitingProductValue < 3
          ? <MdOutlineStarOutline />
          : <MdOutlineStarPurple500 />}
      </b>

      <b>
        {raitingProductValue < 4
          ? <MdOutlineStarOutline />
          : <MdOutlineStarPurple500 />}
      </b>

      <b>
        {raitingProductValue < 5
          ? <MdOutlineStarOutline />
          : <MdOutlineStarPurple500 />}
      </b>
    </div>
  )
}
