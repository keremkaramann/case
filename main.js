(() => {
  if (window.location.pathname !== "/") {
    console.log("wrong page");
    return;
  }
  const init = async () => {
    const fetchedProducts = await fetchProducts();
    buildHTML(fetchedProducts);
    buildCSS();
    setEvents();
    displayFavoriteItems(fetchedProducts);
  };

  const fetchProducts = async () => {
    let storedProducts = JSON.parse(
      localStorage.getItem("a-carousel-products")
    );

    if (!storedProducts) {
      try {
        const resp = await fetch(
          "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
        );
        const data = await resp.json();
        const updatedData = data.map((product) => ({
          ...product,
          isFav: false,
        }));
        localStorage.setItem(
          "a-carousel-products",
          JSON.stringify(updatedData)
        );
        storedProducts = data;
      } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
      }
    }
    return storedProducts;
  };

  const buildHTML = (fetchedProducts) => {
    const html = `
              <div class="main-container">
                    <div class="header-container">
                        <h2>Sizin için Seçtiklerimiz</h2>
                    </div>
              <div class="inner-container">
                    ${fetchedProducts
                      ?.map((product) => {
                        const discountPercentage = product.original_price
                          ? Math.round(
                              ((product.original_price - product.price) /
                                product.original_price) *
                                100
                            )
                          : 0;
                        return `
                        <div class="product-container" data-id="${product.id}">
                            <a href=${product.url}>
                                <div class="img-container">
                                    <img src=${product.img} alt=${product.name}>
                                </div>
                                <div class="price-container">
                                    <div class="prod-name">
                                        <p>${product.brand} - <span>${
                          product.name
                        }</span>
                                                          </p>   
                                    </div>
                                    <div class="rating">
                                        <span class="star">&#9733;</span>
                                        <span class="star">&#9733;</span>
                                        <span class="star">&#9733;</span>
                                        <span class="star">&#9733;</span>
                                        <span class="star">&#9733;</span>
                                    </div>
                                    <div class="inner-price-container">
                                        ${
                                          product.original_price &&
                                          product.original_price > product.price
                                            ? `
                                            <div class="discount-container">
                                                <p class="original-price"><del>${product.original_price} TL</del></p>
                                                <p class="discounted-price">${discountPercentage}%</p>
                                                <i class="icon icon-decrease"></i>
                                            </div>
                                              <p class="ds-product-price">${product.price} TL</p>
                                          `
                                            : `<p class="product-price">${product.price} TL</p>`
                                        }
                                    </div>
                                    <div class="btn-container">
                                        <button class="add-btn">Sepete Ekle</button>
                                    </div>
                                </div>
                            </a>
                            <div class="heart-icon-container">
                                <img class="heart-icon" src="https://www.e-bebek.com/assets/svg/default-favorite.svg" alt="heart-icon">
                            </div>
                        </div>`;
                      })
                      .join("")}
          </div>
          <button class="ins-car-prev-btn ins-btn">
              <img src="https://cdn06.e-bebek.com/assets/svg/prev.svg" alt="prev icon">
          </button>
          <button class="ins-car-next-btn ins-btn">
              <img src=https://cdn06.e-bebek.com/assets/svg/next.svg alt="next icon">
          </button>
      </div>
          `;

    document.querySelector(".Section1").insertAdjacentHTML("afterend", html);
  };

  const buildCSS = () => {
    const css = `
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .main-container {
    font-family: "Poppins", cursive;
    width: 100%;
    max-width: 1290px;
    background-color: #fff;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    position: relative;
    margin: 12px;
  }
  .main-container a {
    text-decoration: none;
    color: black;
  }
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fef6eb;
    padding: 25px 67px;
    font-family: Quicksand-Bold;
    font-weight: 700;
    margin: 10px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    margin-top: 15px;
  }
  .header-container h2 {
    font-family: Quicksand-Bold;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.11;
    color: #f28e00;
    margin: 0;
  }
  .inner-container {
    display: flex;
    overflow: hidden;
    gap: 18px;
    position: relative;
    width: 100%;
    box-shadow: 15px 15px 30px 0 #ebebeb80;
    background-color: #fff;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    scroll-snap-align: center;
    transition: transform 0.5s ease; 
  }
  .product-container {
    font-size: 12px;
    padding: 5px;
    color: #7d7d7d;
    margin: 0 0 20px 3px;
    border: 1px solid #ededed;
    border-radius: 10px;
    position: relative;
    text-decoration: none;
    background-color: #fff;
    box-sizing: border-box;
    flex: 0 0 auto;
    width: 100%;
    max-width: 237px;
    display: flex;
    align-items: end;
  }
  .product-container:hover {
    box-shadow: 0 0 0 0 #00000030,inset 0 0 0 3px #f28e00
  }
  .inner-container .product-container:first-child {
    margin-left: 10px;
  }
  .img-container img {
    width: 100%;
    max-width: 100%;
  }
  .price-container {
    padding: 8px;
    color: #7d7d7d;
  }
  .inner-price-container{
    margin-bottom: 57px;
  }
  .prod-name {
    display: flex;
  }
  .prod-name p {
    font-size: 11px;
    font-weight: bolder;
  }
  .rating {
    margin-top: 15px;
  }
  .star {
    font-size: 16px;
    color: #ccc;
  }
  .product-price {
    font-size: 21px;
    font-weight: 600;
  }
  .discount-container{
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .original-price{
    margin: 0;
  }
  .discounted-price,.icon-decrease {
    color: #00a365;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }
  .ds-product-price{
    color: #00a365;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }
  .icon-decrease{
    font-size: 22px;
    margin-top: 5px;
  }
  .btn-container {
    display: flex;
    justify-content: center;
  }
  .fav-item {
    top: 0px !important;
    right: -1px !important;
  }
  .add-btn {
    width: 100%;
    padding: 15px 20px;
    border-radius: 37.5px;
    background-color: #fff7ec;
    color: #f28e00;
    font-family: Poppins, "cursive";
    font-size: 13px;
    font-weight: 700;
    border: 1px solid #0000;
    cursor: pointer;
  }
  .heart-icon-container {
    position: absolute;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 #00000024;
    width: 50px;
    height: 50px;
    top: 9px;
    right: 15px;
  }
  .active{
    top: 0px !important;
    right: -1px !important;
  }
  .heart-icon-container img {
    position: absolute;
    top: 15px;
    right: 12px;
  }
  .ins-btn {
    background-color: #fef6eb;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  .ins-car-prev-btn {
    position: absolute;
    top: 50%;
    left: -5%;
  }
  .ins-car-next-btn {
    position: absolute;
    bottom: 42%;
    right: -5%;
  }
  @media screen and (max-width: 1388px) {
  .product-container {
    max-width: 298px;
    }
  .ins-car-next-btn {
    right: -8%;
    }
  .ins-car-prev-btn {
    left: -7%;
    }
}
  @media screen and (max-width: 960px) {
    .ins-car-next-btn {
      right: -10%;
    }
    .ins-car-prev-btn {
    l eft: -11%;
    }
    .product-container {
      max-width: 282px;
    }
    .inner-container {
      overflow-x: scroll;
    }
}
  @media screen and (max-width: 769px) {
    .inner-container {
    overflow-x: scroll;
    }
    .product-container {
      max-width: 245px;
    }
}
  @media screen and (max-width: 530px) {
    .ins-car-prev-btn, .ins-car-next-btn {
      display: none;
    }
    .product-container {
      max-width: 175px;
    }
    .inner-container {
      overflow-x: scroll;
      box-shadow: none;
    }
    .ins-car-prev-btn {
     left: 5%;
    }
    .ins-car-next-btn {
      right: 5%;
    }
    .header-container {
      padding: 0 22px 0 10px;
      background-color: #fff;
    }
    .header-container h2{
      font-size: 21px;
    }
  }
}
          `;

    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  };

  const setFavoriteStatus = (productId, isFav) => {
    const products =
      JSON.parse(localStorage.getItem("a-carousel-products")) || [];
    const product = products.find((product) => product.id === productId);

    if (product) {
      product.isFav = isFav;
      localStorage.setItem("a-carousel-products", JSON.stringify(products));
    }
  };

  const setEvents = () => {
    const mainContainer = document.querySelector(".main-container");
    const productContainer = document.querySelector(".inner-container");

    mainContainer.addEventListener("click", function (e) {
      if (e.target.closest(".heart-icon-container")) {
        const heartIcon = e.target
          .closest(".heart-icon-container")
          .querySelector(".heart-icon");

        const productId = Number(
          e.target.closest(".product-container")?.dataset.id
        );

        heartIcon.classList.toggle("active");
        const isFav = heartIcon.classList.contains("active");

        if (isFav) {
          heartIcon.src =
            "https://www.e-bebek.com/assets/svg/added-favorite.svg";
          setFavoriteStatus(productId, true); // fav ikonu
        } else {
          heartIcon.src =
            "https://www.e-bebek.com/assets/svg/default-favorite.svg";
          setFavoriteStatus(productId, false); // default ikon
        }
      }
    });

    //next and prev
    document
      .querySelector(".ins-car-next-btn")
      .addEventListener("click", () => {
        const firstCard = productContainer.firstElementChild;
        productContainer.appendChild(firstCard);
      });
    document
      .querySelector(".ins-car-prev-btn")
      .addEventListener("click", () => {
        const lastCard = productContainer.lastElementChild;
        productContainer.insertBefore(
          lastCard,
          productContainer.firstElementChild
        );
      });
  };
  const displayFavoriteItems = (fetchedProducts) => {
    fetchedProducts.forEach((product) => {
      const heartIcon = document.querySelector(
        `.product-container[data-id="${product.id}"] .heart-icon`
      );

      if (heartIcon) {
        if (product.isFav) {
          heartIcon.src =
            "https://www.e-bebek.com/assets/svg/added-favorite.svg";
          heartIcon.classList.toggle("active");
        } else {
          heartIcon.src =
            "https://www.e-bebek.com/assets/svg/default-favorite.svg";
        }
      }
    });
  };

  init();
})();
