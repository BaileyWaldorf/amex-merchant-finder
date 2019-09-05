import React from 'react';
import Card from './Card';
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';
import CardImage from './card.png';
 
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numMerchants: 0,
      shopping: 0,
      dining: 0,
      travel: 0,
      services: 0,
      entertainment: 0,
      businessServices: 0,
      selectedCard: "American Express Centurion Card"
    };
  }

  componentDidMount = () => {
    let numMerchants = this.props.merchants.length
    let numShopping = this.shopping(this.props.merchants);
    let numDining = this.dining(this.props.merchants);
    let numTravel = this.travel(this.props.merchants);
    let numServices = this.services(this.props.merchants);
    let numEntertainment = this.entertainment(this.props.merchants);
    let numBusinessServices = this.businessServices(this.props.merchants);

    this.setState({
      numMerchants: numMerchants,
      shopping: numShopping / numMerchants * 100,
      dining: numDining / numMerchants * 100,
      travel: numTravel / numMerchants * 100,
      services: numServices / numMerchants * 100,
      entertainment: numEntertainment / numMerchants * 100,
      businessServices: numBusinessServices / numMerchants * 100
    })
  }

  shopping = (merchants) => {
    let num  = 0;
    for(let i = 0; i < merchants.length; i++) {
      if(merchants[i].category_details.name === "Shopping") num++;
    }
    return num;
  }

  dining = (merchants) => {
    let num  = 0;
    for(let i = 0; i < merchants.length; i++) {
      if(merchants[i].category_details.name === "Dining") num++;
    }
    return num;
  }

  travel = (merchants) => {
    let num  = 0;
    for(let i = 0; i < merchants.length; i++) {
      if(merchants[i].category_details.name === "Travel") num++;
    }
    return num;
  }

  services = (merchants) => {
    let num  = 0;
    for(let i = 0; i < merchants.length; i++) {
      if(merchants[i].category_details.name === "Services") num++;
    }
    return num;
  }

  entertainment = (merchants) => {
    let num  = 0;
    for(let i = 0; i < merchants.length; i++) {
      if(merchants[i].category_details.name === "Entertainment") num++;
    }
    return num;
  }

  businessServices = (merchants) => {
    let num  = 0;
    for(let i = 0; i < merchants.length; i++) {
      if(merchants[i].category_details.name === "Business Services") num++;
    }
    return num;
  }
 
  render() {
    AOS.init({
      debounceDelay: 0,
      mirror: true,
      once: false,
    });

    const items = this.props.merchants.map((merchant, key) =>
      <Card key={merchant.indentifiers} name={merchant.name} contactInfo={merchant.contact_information} address={merchant.address} badge_details={merchant.badge_details}/>
    );

    const stats = (
      <div className="stats-container">
        <h2 data-aos="fade-up" data-aos-duration="500">Found <b>{this.state.numMerchants}</b> merchants around you.</h2>
        <h3 data-aos="fade-up" data-aos-duration="500">Here's the breakdown.</h3>
        <div data-aos="fade-up" data-aos-duration="500"><b>{this.state.shopping.toFixed(1)}%</b> shopping</div>
        <div data-aos="fade-up" data-aos-duration="500"><b>{this.state.dining.toFixed(1)}%</b> dining</div>
        <div data-aos="fade-up" data-aos-duration="500"><b>{this.state.travel.toFixed(1)}%</b> travel</div>
        <div data-aos="fade-up" data-aos-duration="500"><b>{this.state.services.toFixed(1)}%</b> services</div>
        <div data-aos="fade-up" data-aos-duration="500"><b>{this.state.businessServices.toFixed(1)}%</b> business services</div>
        <div data-aos="fade-up" data-aos-duration="500"><b>{this.state.entertainment.toFixed(1)}%</b> entertainment</div>
        <br />
        <h2 data-aos="fade-up" data-aos-duration="500">Woah there, our recommendation is the <b>{this.state.selectedCard}</b>!</h2>
        <a href="https://card.americanexpress.com/d/american-express/multi/?" target="_blank" rel="noopener noreferrer">
          <img
            className="center-image"
            src={CardImage}
            alt="Amex Card"
            data-aos="fade-up"
            data-aos-duration="500"
          />
        </a>
    
        {/* <div className="div">
          <span className="span"></span>
        </div> */}
      </div>

    )

    return (
      <div className="content-container">
        <h1 className="left-side">Nearby Amex merchants.</h1>
        <div className="merchant-container">
          {items}
        </div>
        <h1 className="right-side" data-aos="fade-up" data-aos-duration="500">Our recommendations.</h1>
        <div className="recommend-container">
          {stats}
        </div>
      </div>
    );
  }
}