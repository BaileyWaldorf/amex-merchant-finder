import React from 'react';

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

let openPlaceInMaps = (name, lat, long) => {
  let encodedName = encodeURIComponent(name.trim())
  let URL = `https://www.google.com/maps/search/${encodedName}/@${lat},${long},17z`

  window.open(URL, '_blank')
}

const Card = props => (
  <div
    onClick={() => {openPlaceInMaps(titleCase(props.name), props.address.latitude, props.address.longitude)}}
    className="card"
    data-aos="fade-up" 
    data-aos-duration="500"
    key={props.key}
  >
    <div className="first-line">
      <span className="name">{titleCase(props.name)}</span>
      <span className="distance">{props.address.distance.toFixed(3)} mi</span>
    </div>
    <br />
    <span className="address">{titleCase(props.address.address_lines[0])}, </span>
    <span className="address">{titleCase(props.address.city)} </span>
    <span className="address">{titleCase(props.address.postal_code.substring(0,5))} </span>
    <div className="last-line">
      <span className="phone">{props.contactInfo.phone_number != null ? "Phone: " : "No phone info"}{props.contactInfo.phone_number}</span>
      {props.badge_details[0] === "MEMBER_FAVORITE" ? <span className="distance" style={{fontSize: 14, fontWeight: "bold"}}>Member Favorite</span> : null}
    </div>
  </div>
);

export default Card;