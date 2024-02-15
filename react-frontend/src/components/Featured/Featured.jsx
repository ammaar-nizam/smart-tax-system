import React from 'react'
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import 'swiper/css'
import './Featured.css'
import data from '../../utils/slider.json'
import { sliderSettings } from '../../utils/common'

const Featured = () => {
  return (
    <section className="f-wrapper">
        <div className="paddings innerWidth f-container">
            <div className="flexColStart f-head">
                <span className="orangeText">Featured</span>
                <span className="primaryText">Find Out More</span>
            </div>
            <Swiper {...sliderSettings}>
                {
                    data.map((card, i) => (
                        <SwiperSlide key={i}>
                            <div className="flexColStart f-card">
                                <img src={card.image} alt=''/>
                                <span className="secondaryText f-lastUpdate">
                                    <span style={{color: "orange"}}>{card.lastUpdate}</span>
                                </span>
                                <span className="primaryText">{card.name}</span>
                                <span className="secondaryText">{card.detail}</span>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </section>
  )
}

export default Featured
