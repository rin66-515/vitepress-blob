---
title: "fragment slide show"
date: "2025-07-27"
tags: ["html","javascript","css"]
description: "欠片化するスライドショー"
---



javscript

```javascript
const carouselConfig = {
  images: [
    {
      src: "static/images/header.jpeg",
      alt: "aws",
    },
    {
      src: "static/images/cloud01.png",
      alt: "aws",
    },
    {
      src: "static/images/cloud02.png",
      alt: "aws",
    },
    {
      src: "static/images/cloud03.png",
      alt: "aws",
    },
    {
      src: "static/images/news02.png",
      alt: "aws",
    },
  ],
  fragmentConfig: {
    rows: 10, //かけら行数
    cols: 15, //欠片列数
    maxDisplacement: 400, //欠片最大移動距離
    maxRotation: 180, //欠片最大ローテーション角度
    minScale: 0.3, //欠片最小縮める割合
  },
  autoplay: true, //オートプレイ
  autoplaySpeed: 5000, //オートプレイスピード（ms）
  transitionDuration: 800, //持続可能な（ms）
};
//DOM
const carouselContainer = document.getElementById("carousel");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const indicators = document.getElementById("indicators");

//status 変数
let currentSlide = 0;
let autoplayInterval;
let isPlaying = carouselConfig.autoplay;
let autoplaySpeed = carouselConfig.autoplaySpeed;
let isTransitioning = false;

//init
function initCarousel() {
  //create pictrue
  carouselConfig.images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = `slide ${index === 0 ? "active" : ""}`;
    slide.dataset.index = index;

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;

    slide.appendChild(img);
    carouselContainer.appendChild(slide);

    //init prev next
    const dot = document.createElement("button");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    indicators.appendChild(dot);
  });

  //set autoplay
  if (isPlaying) {
    startAutoplay();
  }

  //event 紐づける
  prevBtn.addEventListener("click", () => {
    if (!isTransitioning) goToPrevSlide();
  });
  nextBtn.addEventListener("click", () => {
    if (!isTransitioning) goToNextSlide();
  });
}

//切り替え
function goToSlide(index) {
  if (index === currentSlide || isTransitioning) return;

  isTransitioning = true;

  const slides = document.querySelectorAll(".slide");
  const currentSlideEl = slides[currentSlide];
  const newSlideEl = slides[index];

  //欠片化
  fragmentImage(currentSlideEl.querySelector("img"), () => {
    //current 隠せる next表示
    currentSlideEl.classList.remove("active");
    newSlideEl.classList.add("active");
    currentSlide = index;

    //reset player
    if (isPlaying) resetAutoplay();

    //lock off
    isTransitioning = false;
  });
  setTimeout(() => {
    currentSlideEl.style.opacity = "0";
    newSlideEl.style.opacity = "1";
    currentSlide = index;
    //refresh
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }, 0);
}

//prev
function goToPrevSlide() {
  const newIndex =
    (currentSlide - 1 + carouselConfig.images.length) %
    carouselConfig.images.length;
  goToSlide(newIndex);
}
function goToNextSlide() {
  const newIndex = (currentSlide + 1) % carouselConfig.images.length;
  goToSlide(newIndex);
}

//欠片化関数
function fragmentImage(img, callback) {
  if (!img.complete) {
    if (callback) callback();
    return;
  }

  //remove prev fragment
  const existingFragment = carouselContainer.querySelectorAll(".fragment");
  existingFragment.forEach((frag) => frag.remove());

  //get size
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const containerWidth = carouselContainer.offsetWidth;
  const containerHeight = carouselContainer.offsetHeight;

  //計算
  const containerRatio = containerWidth / containerHeight;
  const imgRatio = imgWidth / imgHeight;

  let displayWidth, displayHeight;
  if (imgRatio > containerRatio) {
    displayHeight = containerHeight;
    displayWidth = displayHeight * imgRatio;
  } else {
    displayWidth = containerWidth;
    displayHeight = displayWidth / imgRatio;
  }

  const offsetX = (displayWidth - containerWidth) / 2;
  const offsetY = (displayHeight - containerHeight) / 2;

  //set parmars
  const { rows, cols, maxDisplacement, maxRotation, minScale } =
    carouselConfig.fragmentConfig;
  const fragmentWidth = displayWidth / cols;
  const fragmentHeight = displayHeight / rows;

  //fragment init
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const fragment = document.createElement("div");
      fragment.className = "fragment";

      fragment.style.left = `${j * fragmentWidth - offsetX}px`;
      fragment.style.top = `${i * fragmentHeight - offsetY}px`;
      fragment.style.width = `${fragmentWidth}px`;
      fragment.style.height = `${fragmentHeight}px`;

      fragment.style.backgroundImage = `url(${img.src})`;
      fragment.style.backgroundSize = `${displayWidth}px ${displayHeight}px`;
      fragment.style.backgroundPosition = `-${j * fragmentWidth}px -${
        i * fragmentHeight
      }px`;

      fragment.style.opacity = "1";
      fragment.style.transform = "translate(0, 0) rotate(0) scale(1)";

      carouselContainer.appendChild(fragment);

      setTimeout(() => {
        const angle = Math.random() * 2 * Math.PI; // 0~360度随机角度
        const distance = Math.random() * maxDisplacement; // 距离0~maxDisplacement随机
        const randomX = Math.cos(angle) * distance;
        const randomY = Math.sin(angle) * distance;
        const randomRotation = (Math.random() - 0.5) * maxRotation;
        const randomScale = minScale + Math.random() * (1 - minScale);

        fragment.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg) scale(${randomScale})`;
        fragment.style.opacity = "0";
      }, (i * cols + j) * 10);
    }
  }
  const totalDuration = carouselConfig.transitionDuration + rows * cols * 10;
  setTimeout(() => {
    const fragments = carouselContainer.querySelectorAll(".fragment");
    fragments.forEach((frag) => frag.remove());
    if (callback) callback();
  }, totalDuration);
}

function startAutoplay() {
  autoplayInterval = setInterval(goToNextSlide, autoplaySpeed);
}

function resetAutoplay() {
  if (isPlaying) {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
});

```

HTML

```html
 <!-- slide -->
   <div class="container">
	<div class="carousel-container" id="carousel-container">
	  <div class="carousel" id="carousel">
		<!-- js添加 -->
	  </div>
  
	  <!-- 导航按钮 -->
	  <button class="nav-btn prev" id="prev-btn">
		<span>&#10094;</span>
	  </button>
	  <button class="nav-btn next" id="next-btn">
		<span>&#10095;</span>
	  </button>
  
	  <!-- indicators -->
	  <div class="indicators" id="indicators">
		<!-- js动态加载 -->
	  </div>
	</div>
  </div>
```

CSS

```css
/* 幻灯片 */
.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.8s ease;
  z-index: 1;
}

.slide.active {
  opacity: 1;
  z-index: 2;
}

/* 碎片 */
#carousel .fragment {
  position: absolute;
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: 100% 100%; /* 填满容器 */
  will-change: transform, opacity;
  transition: transform 0.8s ease, opacity 0.8s ease;
  z-index: 10;
  opacity: 1;
}

/* 指示点容器，轮播下方居中 */
#indicators {
  text-align: center;
  margin-top: 12px;
  user-select: none;
}

/* 指示点按钮 */
#indicators .dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 6px;
  border-radius: 50%;
  border: none;
  background-color: #bbb;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  vertical-align: middle;
}

/* 激活的指示点高亮 */
#indicators .dot.active {
  background-color: #333;
  transform: scale(1.2);
}

/* 指示点聚焦状态，提高可访问性 */
#indicators .dot:focus {
  outline: 2px solid #555;
  outline-offset: 2px;
}

/* 上一张/下一张按钮，垂直居中 */
#prev-btn,
#next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  font-size: 18px;
  padding: 8px 14px;
  cursor: pointer;
  user-select: none;
  z-index: 20;
  border-radius: 4px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 鼠标悬停按钮背景和阴影加深 */
#prev-btn:hover,
#next-btn:hover {
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* 左右按钮位置 */
#prev-btn {
  left: 10px;
}
#next-btn {
  right: 10px;
}
```

