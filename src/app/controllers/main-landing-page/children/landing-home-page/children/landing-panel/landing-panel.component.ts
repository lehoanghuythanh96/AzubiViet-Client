import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-landing-panel',
  templateUrl: './landing-panel.component.html',
  styleUrls: ['./landing-panel.component.scss']
})
export class LandingPanelComponent implements OnInit {

  panelText = {
    title: "AzubiViet in Deutschland",
    subtitle: "Info Portal für vietnamesische Azubis"
  }

  imgurls = [
    "assets/img/landingpage/anhbiaazubi123.webp",
    "assets/img/landingpage/pexels-andrea-piacquadio-935756.webp",
    "assets/img/landingpage/pexels-jopwell-2422290.webp"
  ]

  constructor() { }

  ngOnInit(): void {
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    scrollbar: { draggable: true },
    effect: 'coverflow',
    mousewheel: { forceToAxis: true },
    autoplay: true,
    loop: true
  };

}
