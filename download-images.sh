#!/bin/bash

mkdir -p public/images

# Download main images
curl "https://source.unsplash.com/1600x900/?fashion,clothing" -o "public/images/hero.jpg"
curl "https://source.unsplash.com/800x1200/?womens,fashion" -o "public/images/category-women.jpg"
curl "https://source.unsplash.com/800x1200/?mens,fashion" -o "public/images/category-men.jpg"
curl "https://source.unsplash.com/800x1200/?fashion,accessories" -o "public/images/category-accessories.jpg"
curl "https://source.unsplash.com/1200x800/?sustainable,fashion" -o "public/images/sustainability.jpg"

# Download product images
curl "https://source.unsplash.com/800x800/?tshirt,cotton" -o "public/images/tshirt.jpg"
curl "https://source.unsplash.com/800x800/?tshirt,fashion" -o "public/images/tshirt-2.jpg"
curl "https://source.unsplash.com/800x800/?tshirt,clothing" -o "public/images/tshirt-3.jpg"
curl "https://source.unsplash.com/800x800/?tshirt,style" -o "public/images/tshirt-4.jpg"
curl "https://source.unsplash.com/800x800/?jeans,denim" -o "public/images/jeans.jpg"
curl "https://source.unsplash.com/800x800/?sneakers,shoes" -o "public/images/sneakers.jpg"
curl "https://source.unsplash.com/800x800/?sweater,wool" -o "public/images/sweater.jpg" 