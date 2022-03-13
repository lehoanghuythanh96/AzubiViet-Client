import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-navigation',
  templateUrl: './shopping-navigation.component.html',
  styleUrls: ['./shopping-navigation.component.scss']
})
export class ShoppingNavigationComponent implements OnInit {

  navItems = [
    {
      name: "Question Market",
      img: "assets/img/landingpage/icons8-shop-80.png",
      url: "/questionmarket"
    },
    {
      name: "Learning",
      img: "assets/img/landingpage/icons8-e-learning-80.png",
      url: "/learning"
    },
    {
      name: "Item Shop",
      img: "assets/img/landingpage/icons8-shop-256.png",
      url: "/questionmarket/itemshop"
    },
    {
      name: "(Coming up)",
      img: "assets/img/questionmarket/icons8-blog-64.png",
      url: "/"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
